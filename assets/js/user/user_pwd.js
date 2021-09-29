 $(function(){
     var form = layui.form
     form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
          samepwd:function(value){
              if(value === $('.layui-form [name=oldPwd]').val()){
                  return ('新旧密码不能相同!')
              }
          },
          rePwd:function(value){
              if(value !== $('.layui-form [name=newPwd]').val()){
                  return ('两次密码不一致！')
              }
          }
     })

     $('.layui-form').submit(function(e){
         e.preventDefault()
         $.ajax({
             method:'POST',
             url:'/my/updatepwd',
             data:$(this).serialize(),
             success:function(res){
                 if(res.status !== 0){
                     return layui.layer.msg('更新密码失败！')
                 }
                 layui.layer.msg('更新密码成功！')
                //  重置表单 原生js里面有reset方法 下面先把jq变成js
                $('.layui-form')[0].reset()
             }
         })
     })
 })