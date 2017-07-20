$(function() {
    var productid = GetQueryString("productid");
    console.log(productid);
    getProductTitle(productid);
    getproductComment(productid);
})



//得到地址栏中的参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}


// 我想要发送请求获取数据(已完成)

function getProductTitle(productid) {
    $.ajax({
        type: "get",
        url: url + "api/getproduct?productid=" + productid,
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
            console.log(data)
            var productTitle = data.result[0].productName;
            var subTitle = "<p>" + productTitle + "</p>";
            $(".active").html(subTitle);
            var mytpl = Handlebars.compile($("#productTpl").html());
            $(".detail-head").html(mytpl(data));
            $(".sup").html(data.result[0].bjShop);
        }
    })

}

//获取评论
function getproductComment(productid) {
    $.ajax({
        type: "get",
        url: url + "api/getproductcom?productid=" + productid,
        success: function(data) {
            var mytpl = Handlebars.compile($("#commentTpl").html());
            $(".des-wrap").html(mytpl(data));
        }
    })

}