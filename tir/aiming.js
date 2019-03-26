function aiming() {

    var nbPlans = 5
    var position = { x: 0, y: 0 }
    var targetPosition = { x: 0, y: 0 }

    var arrowHittingPoint = { x: 924, y: 320 }

    var plansSpeed = [1.333, 1.143, 1, 0.889, 0.800]

    const MAX_POSITION = { x: 340, y: 340 }
    var canvas = document.getElementById("main")

    function updatePlans() {
        var main = document.getElementById("main")

        for (var i = nbPlans; i > 0; i--) {

            var planId = "plan" + i
            var planNode = document.getElementById(planId)

            var left = ((1920 - 2880) / 2 - position.x * plansSpeed[i - 1]) / 1920 * main.offsetWidth
            planNode.style.left = left + "px"
        }
    }

    function updateAnimal() {

        var animal = document.getElementById("animal")
        var main = document.getElementById("main")

        var animalCoords = scaleToActualScreenSize(animalFHDCoordinates())

        animal.style.left = animalCoords.x + "px"
        animal.style.top = animalCoords.y + "px"

        var animalSize = scaleToActualScreenSize({ x: animal.naturalWidth, y: animal.naturalHeight })
        animal.style.width = animalSize.x + "px"
        animal.style.height = animalSize.y + "px"

        animal.style.zIndex = planIndexToZIndex(currentAnimal.position.z)
    }

    function scaleToActualScreenSize(coords) {
        var main = document.getElementById("main")
        return {
            x: coords.x / 1920 * main.offsetWidth
            , y: coords.y / 1080 * main.offsetHeight
        }
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
        var bowNode = document.getElementById("bow")
        var bow0ImageNode = document.querySelector("#bow .bow0")

        var top = (position.y + 1080 - bow0ImageNode.naturalHeight) / 1080 * main.offsetHeight
        var left = (position.x - (bow0ImageNode.naturalWidth - 1920) / 2) / 1920 * main.offsetWidth

        bowNode.style.top = top + "px"
        bowNode.style.left = left + "px"

        var arrowNode = document.getElementById("arrow")
        arrowNode.style.top = top + "px"
        arrowNode.style.left = left + "px"
    }

    function updateVisee() {

        var bow0ImageNode = document.querySelector("#bow .bow0")

        var impact = {
            x: (position.x - (bow0ImageNode.naturalWidth - 1920) / 2 + arrowHittingPoint.x)
            , y: (position.y + arrowHittingPoint.y)
        }

        var animalCoords = animalFHDCoordinates()
        var animalImg = document.getElementById("animal")
        var isImpactInAnimalRectangle =
            (impact.x > animalCoords.x)
            && (impact.x < animalCoords.x + animalImg.naturalWidth)
            && (impact.y > animalCoords.y)
            && (impact.y < animalCoords.y + animalImg.naturalHeight)

        // REMOVE
        if (isImpactInAnimalRectangle) {
            var impactInAnimalImage = {
                x: impact.x - animalCoords.x
                , y: impact.y - animalCoords.y
            }
            if (isPixelOpac(animalImg, impactInAnimalImage)) {
                viseur.style.borderColor = "red"
            } else {
                viseur.style.borderColor = "orange"
            }
        } else {
            viseur.style.borderColor = "lime"
        }

        var impactScreenCoords = scaleToActualScreenSize(impact)
        viseur.style.left = impactScreenCoords.x
        viseur.style.top = impactScreenCoords.y
    }

    function isPixelOpac(img, coords) {
        var canvas = document.createElement('canvas');
        canvas.width = 1
        canvas.height = 1
        var context2d = canvas.getContext('2d')
        context2d.drawImage(img, coords.x, coords.y, 1, 1, 0, 0, 1, 1)

        var pixelData = context2d.getImageData(0, 0, 1, 1).data
        var transparency = pixelData[3]

        show.innerHTML = JSON.stringify(transparency)

        return transparency > 196
    }

    function animalFHDCoordinates() {
        return {
            x: (currentAnimal.position.x - position.x * plansSpeed[currentAnimal.position.z - 1])
            , y: (currentAnimal.position.y)

        }
    }

    function updateScreen() {
        updateAnimal()
        updatePosition()
        updatePlans()
        updateBow()
        updateVisee()
    }

    function mouseMoved(coordinates) {
        var canvasHeight = canvas.offsetHeight
        var canvasWidth = canvas.offsetWidth

        targetPosition = {
            x: (coordinates.x / canvasWidth * 2 - 1) * 400
            , y: (coordinates.y / canvasHeight * 2 - 1) * 400
        }

        targetPosition.x = Math.min(targetPosition.x, MAX_POSITION.x)
        targetPosition.x = Math.max(targetPosition.x, -MAX_POSITION.x)

        targetPosition.y = Math.min(targetPosition.y, MAX_POSITION.y)
        targetPosition.y = Math.max(targetPosition.y, 97)

    }

    document.getElementById("animal").src = currentAnimal.picture

    return {
        updateScreen: updateScreen
        , mouseMoved: mouseMoved
        , clicked: function () { return "shooting" }
        , start: function () { }
    }
}