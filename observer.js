const emptyObserver = {
  next: () => {},
  error: (err) => { throw err; },
  complete: () => {}
}

class Observer {
  constructor(next, error, complete) {
    this.isStopped = false;
    switch(arguments.length) {
      case 0:
        this.destination = this.safeObserver(emptyObserver)
        break;
      case 1:
        if (next instanceof Observer) {
          this.destination = next;
        } else {
          this.destination = this.safeObserver(next)
        }
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
        throw error;
      }

      this.unsubscribe()
    }
  }

  unsubscribe() {
    this.isStopped = true;
  }
}

module.exports = Observer;

module.exports.MapObserver = class MapObserver extends Observer {
  constructor(observer, callback) {
    super(observer)
    this.callback = callback
    this.next = this.next.bind(this);
  }

  next(value) {
    try {
      this.destination.next(this.callback(value))
    } catch (error) {
      this.destination.error(error)
      return;
    }
  }
}