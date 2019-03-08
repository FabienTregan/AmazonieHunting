function appearing(element, nextState) {
    var opacity = 0

    function updateScreen() {
        opacity += 0.01
        element.style.opacity = opacity

        if (opacity >= 1) {
            return nextState
        }
    }

    function getParameter(paramName) {
        var url = window.location.href;
        var paramWithEgal = paramName + "="
        var paramStart = url.search(paramWithEgal) + paramWithEgal.length
        url = url.substring(paramStart)
        var paramEnd = url.search("&")

        var param = paramEnd > 0 ?
            url.substring(0, paramEnd)
            : url

        return decodeURIComponent(param)
    }    

    return {
        updateScreen: updateScreen
        , mouseMoved: function() {}
        , clicked: function () {}
        , start: function() {}
    }
}