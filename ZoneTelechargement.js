(function() {
    'use strict';
    [HTMLBodyElement].forEach(el => [
        'addEventListener',
        'appendChild',
        'insertBefore',
        'before',
        'after',
    ].forEach(fct => el.prototype[fct] = null));

    // Array.from(document.all)
    [window, document, document.body].forEach(el => [
        'onselectstart',
        'oncontextmenu',
        'onclick',
        'onmousedown',
        'onscroll',
        'onmousemove',
        'onmouseenter',
        'onmouseleave',
        'onmouseout',
        'onmouseover',
    ].forEach(fct => el.prototype[fct] = null));

    document.querySelectorAll('body > div:not([class])').forEach(div => div.remove())
})();