function aiming() {

    var nbPlans = 5
    var position = { x: 0, y: 0 }
    var targetPosition = { x: 0, y: 0 }
    var moveSpeed = { x: 0, y: 0 }

    var plansSpeed = [1.333, 1.143, 1, 0.889, 0.800]

    const MAX_POSITION = { x: 340, y: 340 }
    var canvas = document.getElementById("main")
    var canvasHeight = canvas.offsetHeight
    var canvasWidth = canvas.offsetWidth

    function updatePlans() {

        for (var i = nbPlans; i > 0; i--) {

            var planId = "plan" + i
            var planNode = document.getElementById(planId)

            var left = (1920 / 2 - 2880 / 2 + position.x * plansSpeed[i - 1]) / 1920 * 100
            planNode.style.left = left + "%"
        }
    }

    function updateAnimal() {

        var animal = document.getElementById("animal")

        var left = (currentAnimal.position.x + position.x * plansSpeed[currentAnimal.position.z - 1]) / 1920 * 100
        var top = (currentAnimal.position.y) / 1080 * 100
        animal.style.left = left + "%"
        animal.style.top = top + "%"

        var width = animal.naturalWidth / 1920 * 100
        var height = animal.naturalHeight / 1080 * 100
        animal.style.height = height + "%"
        animal.style.   width = width + "%"

        animal.style.zIndex = planIndexToZIndex(currentAnimal.position.z)
    }

    function planIndexToZIndex(n) {
        return (110 - 10 * n)
    }

    function updatePosition() {

        if (position.x != targetPosition.x) {
            position.x = position.x * 0.95 + targetPosition.x * 0.05
        }
        if (position.y != targetPosition.y) {
            position.y = position.y * 0.95 + targetPosition.y * 0.05
        }

    }

    function updateBow() {

        if (position.x != targetPosition.x) {
            position.x = position.x * 0.98 + targetPosition.x * 0.02
        }
        if (position.y != targetPosition.y) {
            position.y = position.y * 0.98 + targetPosition.y * 0.02
        }

        var bottom = position.y / 1080 * 100
        var left = -position.x / 1920 * 100 - 50
        
        var bowNode = document.getElementById("bow")
        bowNode.style.bottom = bottom + "%"
        bowNode.style.left = left + "%"

        var arrowNode = document.getElementById("arrow")
        arrowNode.style.bottom = bottom + "%"
        arrowNode.style.left = left + "%"
    }

    function updateScreen() {
        updateAnimal()
        updatePosition()
        updatePlans()
        updateBow()
    }

    function mouseMoved(coordinates) {
        targetPosition = {
            x: (1 - coordinates.x / canvasWidth * 2) * 400
            , y: (1 - coordinates.y / canvasHeight * 2) * 400
        }

        targetPosition.x = Math.min(targetPosition.x, MAX_POSITION.x)
        targetPosition.x = Math.max(targetPosition.x, -MAX_POSITION.x)

        targetPosition.y = Math.min(targetPosition.y, 0)
        targetPosition.y = Math.max(targetPosition.y, -MAX_POSITION.y)
    }

    document.getElementById("animal").src = currentAnimal.picture

    return {
        updateScreen: updateScreen
        , mouseMoved: mouseMoved
        , clicked: function () { return "shooting"}
        , start: function() {}
    }
}