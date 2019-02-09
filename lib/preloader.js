"use strict";

function loadImages(images, callback) {

    var numberImagesLeftToLoad = Object.keys(images).length
    var loadedImages = {}

    for (var imageName in images) {
        var image = document.createElement('img')
        var loadImageHandler = imageLoadedHandler(imageName, image)
        var url = images[imageName]

        image.addEventListener('load', loadImageHandler)
        image.src = url
    }

    function imageLoadedHandler(imageName, image) {

        function imageLoaded (e) {
            numberImagesLeftToLoad--
            console.log({Event: e, ImageName: imageName, Image: image, numberImagesLeftToLoad: numberImagesLeftToLoad })
            loadedImages[imageName] = image

            if (numberImagesLeftToLoad == 0) {
                callback(loadedImages)
            }
        }

        return imageLoaded
    
    }
}