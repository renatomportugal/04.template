/* for demo only */
$(document).on("pagebeforecreate", "#home", function (e, ui) {
    var items = '';
    for (var i = 0; i < 100; i++) {
        items += "<li>" + i + "</li>";
    }
    $("#list").append(items);
});

/* load more fucntion */
function addMore(page) {
    $.mobile.loading("show", {
        text: "loading more..",
        textVisible: true,
        theme: "b"
    });
    setTimeout(function () {
        var items = '';
        for (var i = 0; i < 5; i++) {
            items += "<li>" + i + "</li>";
        }
        $("#list", page).append(items).listview("refresh");
        $.mobile.loading("hide");
    }, 500);
}

/* scroll event */
$(document).on("scrollstop", function (e) {
    var activePage = $.mobile.pageContainer.pagecontainer("getActivePage"),
        screenHeight = $.mobile.getScreenHeight(),
        contentHeight = $(".ui-content", activePage).outerHeight(),
        header = $(".ui-header", activePage).outerHeight() - 1,
        scrolled = $(window).scrollTop(),
        footer = $(".ui-footer", activePage).outerHeight() - 1,
        scrollEnd = contentHeight - screenHeight + header + footer;
    $(".ui-btn-left", activePage).text("Scrolled: " + scrolled);
    $(".ui-btn-right", activePage).text("ScrollEnd: " + scrollEnd);
    if (activePage[0].id == "home" && scrolled >= scrollEnd) {
        console.log("adding...");
        addMore(activePage);
    }
});