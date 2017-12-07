$(function(){
    // $('button[type=submit]').click(function(event){
    //     event.preventDefault();
    //     $.ajax({
    //         url:"/employee/employeeLogin",
    //         data:$("form").serialize(),
    //         type:'post',
    //         success:function(backData){
    //             console.log(backData);
    //         }
    //     });
    // });

    $("form").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            username:{
                validators:{
                    notEmpty:{
                        message:'用户名不能为空'
                    },
                    // 长度校验
                    stringLength: {
                        min: 3,
                        max: 12,
                        message: '用户名长度必须在3到12之间'
                    },
                    callback:{
                        message:'用户名不存在'
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:'密码不能为空'
                    },
                    // 长度校验
                    stringLength: {
                        min: 6,
                        max: 16,
                        message: '用户名长度必须在3到16之间'
                    },
                    callback:{
                        message:'密码错误'
                    }
                }
            },
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑

        NProgress.start();
        // ajax提交数据
        $.ajax({
            url:'/employee/employeeLogin',
            data:$("form").serialize(),
            type:'post',
            success:function(backData){
                console.log(backData);

                if(backData.success == true){
                    window.location.href = './index.html';
                }else{
                    var validator = $("form").data('bootstrapValidator');
                    if(backData.error == 1000){
                        validator.updateStatus('username', 'INVALID', 'callback');
                    }else if(backData.error == 1001){
                        validator.updateStatus('password', 'INVALID', 'callback');
                    }
                }
                setTimeout(function(){
                    NProgress.done();
                },2000)                
            }
        })
    });

    $('button[type=reset]').click(function(){
        var validator = $("form").data('bootstrapValidator');
        validator.resetForm();
    })
});