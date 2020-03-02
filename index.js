const parentObj = {leakEdge: []};

class Test {
  pobj = {leakEdge: []}
  grow() {
    this.pobj.leakEdge.push(new Array(1000000).join('x'));
  }
}

const t = new Test()

function grow() {
  parentObj.leakEdge.push(new Array(1000000).join('x'));
}

document.getElementById('create').addEventListener('click', () => {
  t.grow();
});
