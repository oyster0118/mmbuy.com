$(function() {
    window.sessionStorage.clear(); //刷新后先清除之前的缓存

    function categoryTitle() {
        $.ajax({
            type: 'get',
            url: url + "api/getcategorytitle",
            data: null,
            success: function(info) {
                var mytpl = Handlebars.compile($("#categoryTitleTpl").html())
                $(".category-ul").html(mytpl(info))
            }
        })
    }

    $(".category-ul").on("click", "li a", function() {
        if ($(this).hasClass("disabled")) { //阻止ajax请求没有完成时重复点击
            return false;
        }
        var $titleid = $(this).attr("data-list-id")
        var $that = $(this);
        if (!window.sessionStorage.getItem("jsonKey" + $titleid)) { //请求过Ajax就使用浏览器sessionStroge的数据
            $(this).addClass("disabled");
            categorylist($titleid, $that)
        } else {
            $(this).parent().find("ul").stop().slideToggle("slow");
            $(this).parent().siblings().find("ul").hide()
                // var _info = JSON.parse(window.sessionStorage.getItem("jsonKey" + $titleid));
                // var mytpl = Handlebars.compile($("#categoryListTpl").html())
                // var $ul = $that.siblings("ul")
                // $ul.html(mytpl(_info))
                // var $lis = $ul.children().length
                // var lastli = $lis % 3 || 3
                // $ul.children("li:nth-last-child(-n+" + lastli + ")").css("border-bottom", "none")
        }

    })
    categoryTitle();
    // categorylist 渲染
    function categorylist($titleid, $that) {
        $.ajax({
            type: "get",
            url: url + "api/getcategory",
            data: {
                titleid: $titleid,
            },
            success: function(info) {
                window.sessionStorage.setItem("jsonKey" + $titleid, JSON.stringify(info)); //缓存在本地
                var mytpl = Handlebars.compile($("#categoryListTpl").html())
                var $ul = $that.siblings("ul")
                $ul.html(mytpl(info))
                console.log(info);
                var $lis = $ul.children().length
                var lastli = $lis % 3 || 3
                $ul.children("li:nth-last-child(-n+" + lastli + ")").css("border-bottom", "none")

            },
            complete: function() {
                $that.removeClass("disabled");
                console.log("???")
                $that.parent().find("ul").stop().slideToggle("slow");
                $that.parent().siblings().find("ul").hide()
            }
        })
    }
})