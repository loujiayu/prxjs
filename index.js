const Observable = require('./observable');

function create(subscriber) {
  return {
    subscribe: function(observerOrNext) {
      const observer = new Observer(observerOrNext)
      subscriber(observer)
      return observer;
    }
  }
}

const observable = new Observable(function(observer) {
  observer.next(1)
  observer.next(2)
  observer.next(3)
  observer.complete()
  observer.next(00)
})

var observer = {
  next: function(value) {
    console.log(value)
  },
  complete: function() {
    console.log('complete!');
  }
}

observable.subscribe(observer)