// ==UserScript==
// @name         1Fichier automate download
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automate files download
// @author       Toka
// @match        *1fichier.com/?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=1fichier.com
// @run-at       document-end
// @grant        window.close
// ==/UserScript==

function getTimeout() {
	return Number(Array.from(document.querySelectorAll('.clock .flip-clock-active .up')).reduce((acc, el) => {
		return acc + el.innerText;
	}, '')) * 1000;
}

function asyncQuerySelector(selector) {
	return new Promise(res => {
		let element;
		const interval = setInterval(() => {
			element = document.querySelector(selector);
			if (element) {
				clearInterval(interval);
				res(element);
			}
		}, 100);
	});
}

function download() {
	document.querySelector('input[type="submit"]').click();
}

(function() {
	'use strict';
	const originalTitle = document.title;
	document.title = '⏳️' + originalTitle;
	asyncQuerySelector('.btn-general.btn-orange')
		.then(button => {
			const warnSpan = document.querySelector('.ct_warn span');

			if (warnSpan) {
				if (document.querySelector('.clock')) {
					console.log('Clock waiting');
					setTimeout(download, getTimeout());
				} else {
					console.log('Timeout waiting');
					setTimeout(download, 10000);
				}

			} else if (button.tagName === 'A') {
				console.log('Download');
				document.title = '✔️' + document.title;
				button.click();
				setTimeout(window.close, 3000);

			} else {
				console.log('Download next');
				if (warnSpan) document.title = '⛔' + originalTitle;
				else {
					const button = document.querySelector('.ok.btn-general.btn-orange');
					if (button) button.click();
					else document.title = '⛔' + originalTitle;
				}
			}
		});
})();
