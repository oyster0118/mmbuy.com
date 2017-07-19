$(function() {
    /*goTop*/
    $(window).scroll(function() {
        if ($(window).scrollTop() >= 300) {
            $("#goTop").stop().fadeIn(500);
        } else {
            $("#goTop").stop().fadeOut(500);
        }
    });

    $("#goTop").on("click", function() {
        $("html,body").animate({ scrollTop: 0 }, 1000)
    })
})