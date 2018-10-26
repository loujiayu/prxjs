const Observer = require('./observer');
const MapObserver = require('./observer').MapObserver

module.exports = class Observable {
  constructor(subscribe) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }

  subscribe(observerOrNext) {
    const observer = new Observer(observerOrNext)
    if (this.operator) {
      this.operator.call(observer, this.source)
    } else {
      this._subscribe(observer)
    }
    return observer
  }

  map(callback) {
    const observable = new Observable()
    observable.source = this
    observable.operator = {
      call: function(observer, source) {
        const newObserver = new MapObserver(observer, callback)
        return source.subscribe(newObserver)
      }
    }

    return observable;
  }
}

