const parentObj = {leakEdge: []};

function grow() {
  parentObj.leakEdge.push(1);
}

document.getElementById('create').addEventListener('click', grow);
