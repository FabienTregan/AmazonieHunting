function shooting() {
    const ARROW_FRAME_DURATION = 100
    var arrow = document.getElementById("arrow")
    var bow = document.getElementById("bow")
    var startTimeMs

    function updateScreen() {

        var animationProgress = 1 + (Date.now() - startTimeMs) / ARROW_FRAME_DURATION

        if (targetHit) {
            if (animationProgress > 5.5) {
                var impact = document.getElementById("impact")
                if (animationProgress < 6.25) {
                    impact.classList.add("shown")
                } else {
                    impact.classList.remove("shown")
                }
            }
        }

        var animationFrameNumber = Math.floor(animationProgress)
        if (animationFrameNumber > 8) {
            if (!targetHit) {
                animationFrameNumber = 0
                activity("aiming")
            }
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

        if (targetHit) {
            var state = jsonParameter.read("state")

            if (!state.hunted) {
                state.hunted = []
            }
            state.hunted.push(state.animal)
            delete state.animal

            window.setTimeout(function () { window.location.href = "../congratulation?state=" + jsonParameter.encode(state) }, 1250)
        }
    }

    return {
        updateScreen: updateScreen
        , mouseMoved: function () { }
        , clicked: function () { }
        , start: start
    }
}