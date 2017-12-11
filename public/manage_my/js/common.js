$(function () {
    // 判断是否登陆
    $.ajax({
        url: '/employee/checkRootLogin',
        success: function (backData) {
            console.log(backData);
            if (backData.error == 400) {
                window.location.href = 'login.html';
            }
        }
    })

    $('.header span.glyphicon-align-justify').first().click(function () {
        $('.lt_aside').toggle();
        $('.lt_main').toggleClass('fullScreen');
    });

    $('.lt_main span.glyphicon-log-out').click(function () {
        $('.modal-sure').modal('show');
    });

    $('modal-sure .btn-primary').click(function () {
        $('.modal-sure').modal('hide');
        $.ajax({
            url: '/employee/employeeLogout',
            success: function (backData) {
                window.location.href = 'login.html';
            }
        });
    });
})