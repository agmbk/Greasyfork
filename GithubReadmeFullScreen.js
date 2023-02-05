// ==UserScript==
// @name         GitHub readme full screen
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Display readme.md in full screen
// @author       Toka
// @match        https://github.com/*/*/blob/*/*.md
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @run-at       document-end
// @grant        none
// ==/UserScript==


(() => {
	'use strict';
	const readme = document.querySelector('readme-toc');
	readme.children.item(0).style.setProperty('margin-top', '0', 'important');
	const toolBar = readme.querySelector('div > div.Box-header.js-blob-header.blob-header.js-sticky.js-position-sticky.top-0.p-2.d-flex.flex-shrink-0.flex-md-row.flex-items-center');
	const toolBarBtnContainer = readme.querySelector('div.d-flex.py-1.py-md-0.flex-auto.flex-order-1.flex-md-order-2.flex-sm-grow-0.flex-justify-between.hide-sm.hide-md > div:nth-child(1)');
	const buttons = toolBarBtnContainer.children;
	const fullScreenBtn = document.createElement('button');
	fullScreenBtn.className = 'tooltipped tooltipped tooltipped-n  js-permalink-replaceable-link btn-sm btn BtnGroup-item';
	fullScreenBtn.ariaLabel = 'Display in full screen';

	const fullScreenBtnStyle = {
		width: '41px',
		height: '28px',
		'padding-left': '10px',
	};

	Object.entries(fullScreenBtnStyle).forEach(([key, value]) => {
		fullScreenBtn.style.setProperty(key, value, 'important');
	});

	fullScreenBtn.innerHTML = `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><path class='octicon octicon-file' fill-rule='evenodd' d='M1 1v6h2V3h4V1H1zm2 12H1v6h6v-2H3v-4zm14 4h-4v2h6v-6h-2v4zm0-16h-4v2h4v4h2V1h-2z'/></svg>`;

	const readmeFullScreenStyle = {
		display: 'block',
		position: 'absolute',
		margin: '0',
		left: '0',
		top: '0',
		padding: '0',
		width: '100%',
		height: '100%',
		'z-index': '1',
	};

	const toolBarHeight = toolBar.offsetHeight;
	const fullScreenBtnOldStyle = {};

	let isFullScreen = false;
	let btnSelected = 0;

	function hideToolBar() {
		toolBar.style.setProperty('top', `-${toolBarHeight}px`, 'important');
		toolBar.style.setProperty('margin-top', `-${toolBarHeight}px`, 'important');
	}

	function showToolBar() {
		toolBar.style.top = '';
		toolBar.style.marginTop = '';
	}

	document.onmousemove = (event) => {
		if (isFullScreen && event.clientY > toolBarHeight) hideToolBar();
		else showToolBar();
	};

	fullScreenBtn.onclick = () => {
		fullScreenBtn.blur();
		if (isFullScreen) {
			Object.entries(fullScreenBtnOldStyle).forEach(([key, value]) => {
				readme.style[key] = value;
				delete fullScreenBtnOldStyle[key];
			});
			fullScreenBtn.classList.remove('selected');
			buttons.item(btnSelected).classList.add('selected');
			showToolBar();
			isFullScreen = false;

		} else {
			console.log(toolBar);
			Object.entries(readmeFullScreenStyle).forEach(([key, value]) => {
				fullScreenBtnOldStyle[key] = readme.style[key];
				readme.style.setProperty(key, value, 'important');
			});
			btnSelected = 0;
			for (const button of buttons) {
				if (button.classList.contains('selected')) {
					button.classList.remove('selected');
					break;
				}
				++btnSelected;
			}
			fullScreenBtn.classList.add('selected');
			hideToolBar();
			isFullScreen = true;
		}
	};

	toolBarBtnContainer.appendChild(fullScreenBtn);
})();