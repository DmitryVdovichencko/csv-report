import '../css/app.css';
import * as trend from './trend'
const hi = "Hi people";
console.log(hi);
const content= document.querySelector('#content');
trend.createSVG('new',content);
// var a;