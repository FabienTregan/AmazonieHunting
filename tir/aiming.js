function aiming() {

    var nbPlans = 5
    var position = { x: 0, y: 0 }
    var targetPosition = { x: 0, y: 0 }
    var moveSpeed = { x: 0, y: 0 }

    var plansSpeed = [1.333, 1.143, 1, 0.889, 0.800]

    const MAX_POSITION = { x: 340, y: 340 }
    var canvas = document.getElementById("main")

    function updatePlans() {
        var main = document.getElementById("main")

        for (var i = nbPlans; i > 0; i--) {

            var planId = "plan" + i
            var planNode = document.getElementById(planId)

            var left = ( (1920 - 2880) / 2 - position.x * plansSpeed[i-1]) / 1920 * main.offsetWidth
            planNode.style.left = left + "px"
        }
    }

    function updateAnimal() {

        var animal = document.getElementById("animal")
        var main = document.getElementById("main")

        var left = (currentAnimal.position.x - position.x * plansSpeed[currentAnimal.position.z - 1]) / 1920 * main.offsetWidth
        var top = (currentAnimal.position.y) / 1080 * 100
        animal.style.left = left + "px"
        animal.style.top = top + "%"

        var width = animal.naturalWidth / 1920 * 100
        var height = animal.naturalHeight / 1080 * 100
        animal.style.height = height + "%"
        animal.style.width = width + "%"

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
        var main = document.getElementById("main")

        var bottom = - position.y / 1080 * 100
        var left = position.x / 1920 * main.offsetWidth

        var bowNode = document.getElementById("bow")
        bowNode.style.bottom = bottom + "%"
        bowNode.style.left = left + "px"

        var arrowNode = document.getElementById("arrow")
        arrowNode.style.bottom = bottom + "%"
        arrowNode.style.left = left + "px"

        // REMOVE
        viseur.style.left = (1920/2 + position.x) / 1920 * main.offsetWidth
        viseur.style.top = position.y / 1080 * main.offsetHeight
    }

    function updateScreen() {
        updateAnimal()
        updatePosition()
        updatePlans()
        updateBow()
    }

    function mouseMoved(coordinates) {
        var canvasHeight = canvas.offsetHeight
        var canvasWidth = canvas.offsetWidth
    
        targetPosition = {
            x: (coordinates.x / canvasWidth * 2 - 1) * 400
            , y: (coordinates.y / canvasHeight * 2 - 1) * 400
        }

        show.innerHTML = JSON.stringify(targetPosition)
        
        targetPosition.x = Math.min(targetPosition.x, MAX_POSITION.x)
        targetPosition.x = Math.max(targetPosition.x, -MAX_POSITION.x)
        
        targetPosition.y = Math.min(targetPosition.y, MAX_POSITION.y)
        targetPosition.y = Math.max(targetPosition.y, 0)

    }

    document.getElementById("animal").src = currentAnimal.picture

    return {
        updateScreen: updateScreen
        , mouseMoved: mouseMoved
        , clicked: function () { return "shooting" }
        , start: function () { }
    }
}