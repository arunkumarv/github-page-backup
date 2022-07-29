
function detach(node) {
  return node.parentElement.removeChild(node);
}

function calcPosition() {
  let subjectPosition = subject.getBoundingClientRect();

  if(subjectPosition.top >subject.parentElement.getBoundingClientRect().top) {
    popup.style.top = subjectPosition.top;
  }
  popup.style.left = subjectPosition.right;

  console.log("parentTop:",subject.parentElement.getBoundingClientRect().top)
}

let subject = document.getElementById('subject');
let popup = document.getElementById('popup');

document.body.appendChild(detach(popup));

calcPosition();

let scrollListener = document.addEventListener ( 'scroll', (event) => { 
    calcPosition(); 
}, true );

subject.addEventListener ('mouseover', (event) => { 
    popup.style.display = "block"; 
});

subject.addEventListener ('mouseleave', (event) => { 
    popup.style.display = "none"; 
});
