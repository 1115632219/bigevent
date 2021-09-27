$(function(){
    $("#link-reg").click(function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $("#link-login").click(function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // layui的表单验证
    var form = layui.form
    // 提示框layer
    var layer = layui.layer
    // 通过form.verify()函数自定义校验
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        repwd:function(value){
            // 通过形参拿到确认的密码框的内容
            // 进行判断
            var pwd = $('.reg-box [name=password]').val()
            if(pwd !== value){
                return '两次密码不一致！'
            }
        },
        username: function(value){ //value：表单的值、item：表单的DOM对象
            if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
              return '用户名不能有特殊字符';
            }
        }

    })

    // 监听注册表单提交事件
    $('#form_reg').submit(function(e){
        e.preventDefault()
        var data = {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=username]').val()}
        $.post('http://api-breakingnews-web.itheima.net/api/reguser',data,
        function(res){
            if(res.status!==0){
                return layer.msg(res.message)
            }
            layer.msg('注册成功!')
            setInterval(function(){
                $('#link-login').click()
            },1000)
        })
    })

    // 监听登录表单提交事件
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('登录失败!')
                }
                layer.msg('登录成功！')
                // 将登录成功得到的 token 字符串,保存到localStorage 中
                localStorage.setItem('token',res.token)
                // 跳转到后台主页
                setInterval(function(){
                    location.href ='/index.html'
                },1000)
                
            }
        })
    })
})

