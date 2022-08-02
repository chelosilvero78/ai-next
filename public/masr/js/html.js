// html.js
//export function tag (tag, text) {
//  var el = document.createElement(tag);
//  el.textContent = text;
//  return el;
//}

export function setTextContent (elementFind, text) {
  var el = document.querySelector(elementFind);
  el.textContent = text;
  return el.textContent;
}

//var target=document.getElementById('formularios')
//target.appendChild(el)
//el.textContent='NEW TEXT'


