// 入口函数
$(function() {
        var current = 1; //记录当前页码
        window.myFlag = true; //控制重复Ajax提交
        var categoryid = GetQueryString("categoryid");
        getProductTitle(categoryid);
        getProductList(categoryid, 1);
        //select刷新列表
        $("#pages").on("change", function() {
            current = $("#pages option:selected").val();
            getProductList(categoryid, current);
        });
        //上一页刷新
        $("#prev").on("click", function() {
            var _prev = current - 1;
            if ((_prev > 0) && window.myFlag) {
                window.myFlag = false;
                current--;
                getProductList(categoryid, current);
            }
        });
        //下一页刷新
        $("#next").on("click", function() {
            var _next = current + 1;
            if ((_next <= window.pagesNum) && window.myFlag) {
                window.myFlag = false;
                current++;
                getProductList(categoryid, current);
            }
        });
    })
    // title的动态数据生成
    // 我想得到地址栏中的参数

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
// 我想要发送请求获取数据(已完成)

function getProductTitle(categoryid) {
    $.ajax({
        type: "get",
        url: url + "api/getcategorybyid?categoryid=" + categoryid,
        success: function(data) {
            console.log(data)
            $(".active").html(data.result[0].category)
        }
    })

}


//创建页码
function createPages(pages) {
    var str = "";
    for (var i = 1; i <= pages; i++) {
        str += "<option value='" + i + "'>" + i + "/" + pages + "</option>";
    }
    $("#pages").html(str);
}
//生成产品列表
function getProductList(categoryid, pageid) {
    $.ajax({
        type: "get",
        url: url + "api/getproductlist",
        data: {
            categoryid: categoryid,
            pageid: pageid
        },
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
        success: function(info) {
            console.log(info)
            var mytpl = Handlebars.compile($("#productListTpl").html())
            $(".product-list ul").html(mytpl(info))
                //获取一共多少页
            window.pagesNum = Math.ceil(info.totalCount / info.pagesize);

        },
        complete: function() {
            createPages(window.pagesNum)
            $.each($("#pages option"), function() {
                $(this).removeAttr("selected");
                if ($(this).index() + 1 == pageid) {
                    $(this).attr("selected", "");
                }
                console.log(this);
            })
            window.myFlag = true;
            window.scrollTo(0, 0);
        }

    })

}