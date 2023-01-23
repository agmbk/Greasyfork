// ==UserScript==
// @name         Youtube gradient fix
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Youtube gradient fix
// @author       Toka
// @match        https://www.youtube.com/watch?v=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @run-at       document-start
// @grant        none
// ==/UserScript==


(function () {
    'use strict';
    setInterval(() => {
        const gradient = document.querySelector('.ytp-gradient-bottom');
        gradient?.remove()
        const actionbar = document.querySelector('.ytp-chrome-bottom')
        actionbar.style.background = 'rgba(0, 0, 0, 0.5)';
        actionbar.style.boxShadow = 'rgb(0 0 0 / 40%) 0 0 30px 30px';
    }, 100)
})();