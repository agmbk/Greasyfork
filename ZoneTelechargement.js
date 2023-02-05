// ==UserScript==
// @name         Zone telechargement fix
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Zone telechargement fix
// @author       Toka
// @match        *.zone-telechargement.?*/*
// @match        *.zone-telechargement.?*/?*
// @match        *.zone-telechargement.bond/**
// @match        *.zone-telechargement.tech/**
// @icon         https://www.google.com/s2/favicons?sz=64domain=zone-telechargement.tech
// @run-at        document-start
// @grant        none
// ==/UserScript==

function asyncGetElementById(id) {
	return new Promise(res => {
		let element;
		const interval = setInterval(() => {
			element = document.getElementById(id);
			if (element) {
				clearInterval(interval);
				res(element);
			}
		}, 100);
	});
}

(function() {
	'use strict';
	(() => {
		[HTMLBodyElement, HTMLElement].forEach(e => ['addEventListener', 'appendChild', 'insertBefore', 'before', 'after', ...Object.keys(e.prototype)].forEach(fct => {
			try {
				typeof e.prototype[fct] === 'function' && (e.prototype[fct] = () => {
				});
			} catch (e) {
			}
		}));
		Array.from(document.all).forEach(e => Object.keys(e).forEach(fct => typeof e[fct] === 'function' && (e[fct] = () => {
		})));
		document.querySelectorAll('body > div:not([class])').forEach(div => div.remove());
	})();

	asyncGetElementById('story').then(el => {
		el.style.backgroundColor = '#6b6b6b';
		el.style.color = '#fff';
	});
})();