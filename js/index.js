$(function() {
    /*生成menu*/
    function getMENU() {
        $.ajax({
            type: 'get',
            url: url + 'api/getindexmenu',
            data: null,
            success: function(data) {
                var menu = Handlebars.compile($("#indexMenuTpl").html());
                $(".row").html(menu(data));
            },
            complete: function() {
                $(".row div:nth-child(n+9)").toggle();
            }
        })
    }
    getMENU();
    /*more menu*/
    $(".row").on("click", $(".row div:nth-child(8) a"), function() {
            $(".row div:nth-child(n+9)").toggle();
        })
        /*media*/
    function getMedia() {
        $.ajax({
            type: 'get',
            url: url + 'api/getmoneyctrl',
            data: null,
            xhr: function() {
                var xhr = $.ajaxSettings.xhr();
                xhr.onprogress = function(ev) {
                    var percent = Math.round(100 * ev.loaded / ev.total) + "%";
                    console.log(percent);
                    $(".progress-bar").css("width", percent);
                    if (percent == "100%") {
                        $(".progress").delay(1000).slideUp();

                    }
                }
                return xhr;
            },
            success: function(data) {
                var media = Handlebars.compile($("#indexRecommendTpl").html());
                $(".recommend_product").html(media(data));
            }
        })
    }
    getMedia();

})