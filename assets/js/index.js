$(function(){
    // 调用 getUserInfo 获取用户基本信息
    getUserInfo()

    // 点击按钮，实现退出功能
    $('#btnTuichu').click(function(){
        // 提示用户是否退出
        layer.confirm('您确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 1、清除本地存储的 token
            localStorage.removeItem('token')
            // 2、重新跳转到登录页面
            location.href = "./login.html"
            layer.close(index);
          });
    })
})

function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo', //我把根路径写在baseAPI.js文档
        
        // headers就是请求头配置对象
        // headers:{
        //     Authorization:localStorage.getItem('token')||''
        // },
        success:function(res){
            if(res.status !== 0){
                return layui.layer.msg('获取用户基本信息失败')
            }
            //调用 renderAvatar 渲染用户头像
            renderAvatar(res.data)
        }
        // 在$.ajax中不论成功与否都会调用 complete 回调函数
        // 这个的作用就是不能直接访问index.html页面，只有先登入账号，才有身份认证
        // 在 complete 回调函数中， 可以使用 res.responseJSON 拿到服务器响应回来的数据
        // complete:function(res){
        //     if(res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！'){
        //     // 1、清除本地存储的 token
        //         localStorage.removeItem('token')
        //     // 2、重新跳转到登录页面
        //         location.href = './login.html'
        //     }
        // }
        // (我把这个写在baseAPI.js中)
    })
}

function renderAvatar(user){
    // 1、获取用户名称
    var name = user.nickname || user.username
    // 2、设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3、按需渲染用户的头像
    if(user.user_pic !== null){
        $('.layui-nav-img').attr('src','user.user_pic').show()
        $('.text-avatar').hide()
    }else{
        // 渲染文字头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
    
}