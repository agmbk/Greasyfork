// ==UserScript==
// @name         Dl-Protect automate
// @namespace    https://dl-protect.net
// @version      0.1
// @description  Automate captcha
// @author       Toka
// @match        https://dl-protect.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dl-protect.net
// @grant        none
// ==/UserScript==

function asyncGetElementById(id) {
    return new Promise(res => {
        let element;
        const interval = setInterval(() => {
            element = document.getElementById(id)
            if (element) {
                clearInterval(interval);
                res(element);
            }
        }, 100);
    })
}

function asyncElementProp(el, prop) {
    return new Promise(res => {
        const interval = setInterval(() => {
            if (!el[prop]) {
                clearInterval(interval);
                res(el);
            }
        }, 100);
    })
}

(function() {
    'use strict';
    asyncGetElementById('subButton')
        .then(el => asyncElementProp(el, 'disabled'))
        .then(el => {
            console.log('AAAAAAAAAAA', new Date().toISOString());
            el.click();

            asyncGetElementById('protected-container')
                .then(el => asyncElementProp(el, 'href'))
                .then(el => {
                    window.location.href = el.querySelector('div > div > ul > li > a').href
            })
    })
})();