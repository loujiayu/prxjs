var parentObj = {leakEdge: []};

function grow(arg1, arg2) {
  parentObj.leakEdge.push(1);
  console.log(arg1)
  console.log(arg2)
  // const aa = [];
  const obj = []
  subGrow(obj);
  // aa.push(1);
}

// class Agent {
//   constructor(params) {
//     this.foo = params;
//     this.aa = []
//   }

//   grow() {
//     parentObj.leakEdge.push(1);
//     this.aa.push(1);
//   }
// }

function subGrow(obj) {
  obj.push(2)
  parentObj.leakEdge.push(2);
}
// const agent = new Agent({aa: 32})

document.getElementById('create').addEventListener('click', grow.bind(this, 1,2));
