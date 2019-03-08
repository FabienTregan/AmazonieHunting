function shooting() {
    var arrow = document.getElementById("arrow")

    function updateScreen() {
    }

    function start() {
        //restart the animation
        var src = arrow.src
        arrow.src = src

        arrow.style.opacity = 1

        document.getElementById("bow").style.opacity = 0

        var animalId = getParameter("animal")
        window.setTimeout(function() {window.location.href = "../congratulation?animal=" + animalId}, 1500)
    }

    return {
        updateScreen: updateScreen
        , mouseMoved: function() {}
        , clicked: function () {}
        , start: start
    }
}