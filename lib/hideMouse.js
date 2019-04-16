if(config.hideMouse) {
    var styleEl = document.createElement('style');
    styleEl.innerText = "body, body * {cursor: none !important;}"
    document.head.appendChild(styleEl)
}