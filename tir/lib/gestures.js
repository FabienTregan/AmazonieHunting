/*
  Supported methods on callBacks :

   - mouseMoved(mouseCoordinates: {x, y}) where x and y are in canvas' coordinate space
   - mouseClicked()

*/

function addGesturesEventListeners(elementId, callBacks) {

    var element = document.getElementById(elementId)
    element.addEventListener('dragstart', preventDefault, true)
    element.addEventListener('touchstart', touchStart, true)
    element.addEventListener('touchend', touchEnd, true)
    element.addEventListener('touchmove', touchMove, true)
    element.addEventListener('mousedown', mouseButtonDown, true)
    element.addEventListener('mouseup', mouseButtonUp, true)
    element.addEventListener('mouseleave', mouseButtonUp, true)
    element.addEventListener('mousemove', mouseMoved, true)

    function mouseMoved(e) {
        var target = e.currentTarget
        var targetClientRect = target.getClientRects()[0]

        mouseCoordinates = {
            x: (e.clientX - targetClientRect.left) 
            , y: (e.clientY - targetClientRect.top)
        }

        callBacks.mouseMoved(mouseCoordinates)
    }

    function preventDefault(e) {
        e.preventDefault()
    }

    function touchStart(e) {
        e.preventDefault()
        mouseMoved(e.touches[0])
    }

    function touchEnd(e) {
        e.preventDefault()
        callBacks.mouseClicked()
    }

    function touchMove(e) {
        e.preventDefault()
        var translatedEvent = e.touches[0]
        translatedEvent.currentTarget = e.currentTarget
    
        mouseMoved(e.touches[0])
    }

    function mouseButtonDown(e) {
    }

    function mouseButtonUp(e) {
        callBacks.mouseClicked()
    }
}
