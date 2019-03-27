"use strict";

var jsonParameter = {
    encode: function(s) {
        return encodeURI(JSON.stringify(s))
    }
    , read: function(p) {
        var url = window.location.href;
        var match = url.match('[?&]' + p + '=([^&]+)')
        
        var result = {}
        if(match) {
            result = JSON.parse(decodeURI(match[1]))
        } 

        return result
    }
}