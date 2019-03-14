function shooting() {
    var arrow = document.getElementById("arrow")
    var bow = document.getElementById("bow")

    function updateScreen() {
    }

    function start() {
        //restart the animation
        var src = arrow.src
        arrow.src = src

        arrow.style.opacity = 1
        bow.style.opacity = 0
        
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