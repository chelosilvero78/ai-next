// app.js
//anime.min.js
//import { anime } from '../components/animate/js/anime.min.js';
//import * as anime from '../components/animate/js/anime.es.js';
import anime from '../components/animate/js/anime.es.js';

import { setTextContent } from './html.js';

import utilDateTime from './utilFechaHora.js';

console.log(utilDateTime.validarTest());
//debugger;
//import Hello from 'react-sin-jsx'

let hello=Hello;
hello.render();


//import * as orequire from '../components/require/require.js';

/*const h1 = tag('h1', ' Hello Modules!');
document.body.appendChild(h1);*/
window.anime=anime;
window.setTextContent=setTextContent;
window.utilDateTime=utilDateTime;
//window.require=orequire;