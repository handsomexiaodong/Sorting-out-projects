(function () {
    var pt = null;
    var srcopp = 0;
    $("input,textarea,select").on("focus", function () {
        clearTimeout(pt);
        srcopp = $("html").scrollTop() || $("body").scrollTop();
    }).on("blur", function () {
        pt = setTimeout(function () {
            $("html").scrollTop(srcopp);
            $("body").scrollTop(srcopp);
        }, 50);
    })
}());