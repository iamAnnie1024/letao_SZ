$(function () {

    var myPageNum = 1;
    var myPageSize = 5;

    function getData() {
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: {
                page: myPageNum,
                pageSize: myPageSize
            },
            success: function (backData) {
                console.log(backData);
                $('tbody').html(template('first', backData));

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

    // 验证表单
    $('form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        // excluded: [':disabled', ':hidden', ':not(:visible)'],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '分类名不能为空'
                    }                   
                }
            },
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            url:'/category/addTopCategory',
            type:'post',
            data:$('form').serialize(),
            success:function(backData){
                console.log(backData);
                $('.modal-add').modal('hide');
                getData();
            }
        })
    });

})