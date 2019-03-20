
function correctAspectRatio() {
    var ratio = window.innerWidth / window.innerHeight
    var classList = document.body.classList

    if (ratio > 16 / 9) {
        classList.add('screenTooWide')
    } else {
        document.body.classList.remove('screenTooWide')
    }
}

function init16_9() {
    correctAspectRatio()
    window.addEventListener('resize', correctAspectRatio)

    document.body.addEventListener('dragstart', preventDefault)
    function preventDefault(e) {
        e.preventDefault()
    }
}

window.addEventListener('load', init16_9)
