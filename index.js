const Observable = require('./observable');

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

observable.map(d => d + 1).subscribe(observer)