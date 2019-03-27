function appearing(element, nextActivity) {
    var opacity = 0

    function updateScreen() {
        opacity += 0.01
        element.style.opacity = opacity

        if (opacity >= 1) {
            return nextActivity
        }
    }

    return {
        updateScreen: updateScreen
        , mouseMoved: function() {}
        , clicked: function () {}
        , start: function() {}
    }
}