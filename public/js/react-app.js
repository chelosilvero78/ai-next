import React from '../components/react/react.development.js';
import ReactDOM from '../components/react/react-dom.development.js';
//import { CalendarApp } from './CalendarApp';

//import './styles.css';

//ReactDOM.render(
//    <CalendarApp />,
//  document.getElementById('react-app')
//);
const   divRoot=document.getElementById('react-app');
const myName=document.getElementById('s_usuario_usuario').textContent;
const myTag=<div className="alert alert-success">Hola {myName}, Mundo desde React...!</div>

ReactDOM.render(myTag,divRoot);