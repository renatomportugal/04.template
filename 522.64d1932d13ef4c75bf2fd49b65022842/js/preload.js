function unFold() {

    setTimeout(function() {
        var preloader = document.getElementById("preloader");
        if ( !preloader.classList.contains("loaded")) {
            preloader.classList.add("loaded"); }

    }, 3000)
}
