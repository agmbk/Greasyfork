// ==UserScript==
// @name         Dl-Protect automate
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automate captcha
// @author       Toka
// @match        *dl-protect.net/?*
// @icon         https://www.google.com/s2/favicons?domain=dl-protect.net
// @run-at       document-end
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

(function () {
    'use strict';
    const originalTitle = document.title;
    document.title = "⏳️" + originalTitle
    asyncGetElementById('subButton')
        .then(el => asyncElementProp(el, 'disabled'))
        .then(el => {
            document.title = "✔️" + originalTitle
            el.click();
        })

    asyncGetElementById('protected-container')
        .then(el => asyncElementProp(el, 'href'))
        .then(el => {
            document.title = "✔️" + originalTitle
            window.location.href = el.querySelector('div > div > ul > li > a').href
        })
})();
