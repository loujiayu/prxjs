const Observer = require('./observer');

module.exports = class Observable {
  constructor(subscribe) {
    this._subscribe = subscribe;
  }

  subscribe(observerOrNext) {
    const observer = new Observer(observerOrNext)
    this._subscribe(observer)
    return observer
  }
}