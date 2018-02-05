/**
 * Retrun the string from specified range.
 * e.g<p><% course.description | subString : 0 :75 %> </p>
 */
as.filter('subString', function() {
    return function(str, start, end) {
        if (str != undefined && str.length > end) {
            return str.substr(start, end)+ "...";
        }
        else
        {
            if(str != undefined)
            {
                return str.substr(start, end);
            }
        }
    }
})

as.filter('customLimit', function () {	
    return function (text, length) {
        if (text && text.length > length) {
            return text.substr(0, length) + "...";
        }
        return text;
    }
});

as.filter('unsafe', function($sce){
    return function(val){
        return $sce.trustAsHtml(val);
    }
});

as.filter('capitalize', function() {
    return function(input, all) {
        var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
        return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    }
});
