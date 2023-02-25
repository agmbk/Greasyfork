// ==UserScript==
// @name         Zippyshare auto download
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Auto download
// @author       Toka
// @match        https://*.zippyshare.com/v/*/file.html
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zippyshare.com
// @run-at       document-end
// @grant        window.close
// ==/UserScript==

(function() {
	'use strict';

	const link = document.getElementById('dlbutton').getAttribute('href');
	if (!link) {
		document.title = `⛔${document.title}`;
		return;
	}

	fetch(`${window.location.origin}${link}`).then(res => {

		if (res.ok) {
			document.title = `✔️${document.title}`;
		} else {
			document.title = `⛔${document.title}`;
			throw new Error('Failed to download');
		}

		const parts = res.headers.get('content-disposition').split(';');
		const filename = decodeURIComponent(parts[1].split('=')[1]);

		return { response: res.blob(), filename: filename };
	})
		.then(async ({ response, filename, type }) => {
			console.log(`Downloading ${filename} ${type}`);

			const url = window.URL.createObjectURL(await response);
			const a = document.createElement('a');
			a.href = url;
			a.download = filename;
			document.body.appendChild(a);
			a.click();
			a.remove();
			console.log('close');
			window.close();
		});
})();