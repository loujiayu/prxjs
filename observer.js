const emptyObserver = {
  next: () => {},
  error: (err) => { throw err; },
  complete: () => {}
}

module.exports = class Observer {
  constructor(next, error, complete) {
    this.isStopped = false;
    switch(arguments.length) {
      case 0:
        this.destination = this.safeObserver(emptyObserver)
        break;
      case 1:
        this.destination = this.safeObserver(next)
        break;
      default:
        this.destination = this.safeObserver(next, error, complete)
        break;
    }
  }

  safeObserver(destOrNext, error, complete) {
    let next;
    if (typeof destOrNext === 'function') {
      next = destOrNext;
    } else if (destOrNext) {
      next = destOrNext.next || function() {};
      error = destOrNext.error || function(err) { 
        throw err 
      };
      complete = destOrNext.complete || function() {};
    }

    return {
      next,
      error,
      complete
    }
  }

  next(value) {
    if (!this.isStopped) {
      try {
        this.destination.next(value)
      } catch (err) {
        this.unsubscribe()
        throw err;
      }
    };
  }

  error (err) {
    if (!this.isStopped) {
      try {
        this.destination.error(err)
      } catch (anotherError) {
        this.unsubscribe()
        throw anotherError
      }
      this.unsubscribe()
    }
  }

  complete() {
    if (!this.isStopped) {
      try {
        this.destination.complete()
      } catch (error) {
        this.unsubscribe()
        throw err;
      }

      this.unsubscribe()
    }
  }

  unsubscribe() {
    this.isStopped = true;
  }
}
