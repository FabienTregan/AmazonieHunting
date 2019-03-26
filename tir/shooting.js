function shooting() {
    const ARROW_FRAME_DURATION = 100
    var arrow = document.getElementById("arrow")
    var bow = document.getElementById("bow")
    var startTimeMs

    function updateScreen() {
        var animationFrameNumber = Math.floor(1 + (Date.now() - startTimeMs) / ARROW_FRAME_DURATION)

        if (animationFrameNumber > 8) {
            animationFrameNumber = 0
            state("aiming")
        }

        showAnimationFrame(animationFrameNumber)
    }

    function showAnimationFrame(n) {
        arrow.classList.remove("arrow0")
        arrow.classList.remove("arrow1")
        arrow.classList.remove("arrow2")
        arrow.classList.remove("arrow3")
        arrow.classList.remove("arrow4")
        arrow.classList.remove("arrow5")
        arrow.classList.remove("arrow6")
        arrow.classList.add(arrowAnimationFrameClass(n))

        bow.classList.remove("bow0")
        bow.classList.remove("bow1")
        bow.classList.remove("bow2")
        bow.classList.remove("bow3")
        bow.classList.add(bowAnimationFrameClass(n))
    }

    function arrowAnimationFrameClass(frameNumber) {
        return "arrow" + frameNumber
    }

    function bowAnimationFrameClass(frameNumber) {
        var conversion = {
            0: 0
            , 1: 1
            , 2: 1
            , 3: 2
        }

        var n = (frameNumber > 3) ? 3 : conversion[frameNumber]

        return "bow" + n
    }

    function start() {
        startTimeMs = Date.now()

        // var animalId = getParameter("animal")
        // window.setTimeout(function() {window.location.href = "../congratulation?animal=" + animalId}, 1500)
    }

    return {
        updateScreen: updateScreen
        , mouseMoved: function () { }
        , clicked: function () { }
        , start: start
    }
}