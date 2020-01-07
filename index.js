const parentObj = {leakEdge: []};

// function grow() {
//   parentObj.leakEdge.push(1);
//   const aa = [];
//   aa.push(1);
// }

class Agent {
  constructor(params) {
    this.foo = params;
    this.aa = []
  }

  grow() {
    parentObj.leakEdge.push(1);
    this.aa.push(1);
  }
}

const agent = new Agent({aa: 32})

document.getElementById('create').addEventListener('click', agent.grow.bind(agent));
