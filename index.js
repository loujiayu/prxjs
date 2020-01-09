var obj = {};
var i = 0;
var power = 2;

function grow() {
  var top = Math.pow(2, power);
  power++;
  for (var j = 0; j < top; j++) {
    obj[Math.random()] = Math.random();
  }
  // Adds more properties, but properly deletes them.
  // Not a leak.
  var second = Math.random();
  obj[second] = second;

}

document.getElementById('create').addEventListener('click', grow.bind(this, 1,2));
