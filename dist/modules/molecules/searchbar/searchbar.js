var searchbar=function(){"use strict";return document.addEventListener("DOMContentLoaded",function(){searchbar()}),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:".searchbar",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=document.querySelector(e);t&&Object.keys(n).forEach(function(e){t.addEventListener(e,n[e])});var r=document.querySelector(".searchbar .button");r&&r.addEventListener("click",function(){console.log("searchbar:","you clicked my button")});var c=document.querySelector(".searchbar input");return c&&c.addEventListener("change",function(){console.log("searchbar:","you changed my input")}),this}}();
