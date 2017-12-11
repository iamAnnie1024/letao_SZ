$(function () {
    myPageNum = 1;
    myPageSize = 5;

    function getData() {
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            data: {
                page: myPageNum,
                pageSize: myPageSize
            },
            success: function (backData) {
                console.log(backData);
                $('tbody').html(template('second', backData));

                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: myPageNum, //当前页
                    totalPages: Math.ceil(backData.total / backData.size), //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        console.log(page);
                        myPageNum = page;
                        getData();
                    }
                });
            }
        })
    }

    getData();

    // 文件上传
    $("#fileUpload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            console.log(data.result.picAddr);
            $('form img').attr('src',data.result.picAddr);
        }
    });

    // 获取分类数据 渲染到页面
    $.ajax({
        url:'/category/queryTopCategoryPaging',
        data:{
            page:1,
            pageSize:266
        },
        success:function(backData){
            console.log(backData);
            $('.dropdown-menu').html('');
            // 循环数组
            $.each(backData.rows,function(i,n){
                console.log(n);
                // 生成li>a
                var $li = $("<li><a href='javascript:void(0)'>"+n.categoryName+"</a></li>");
                $('.dropdown-menu').append($li);
            })
        }
    })
})