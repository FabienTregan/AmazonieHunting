function shooting() {
    var arrow = document.getElementById("arrow")

    function updateScreen() {
        arrow.style.opacity = 1
    }

    return {
        updateScreen: updateScreen
        , mouseMoved: function() {}
        , clicked: function () {}
    }
}