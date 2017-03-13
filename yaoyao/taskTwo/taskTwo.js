window.onload=function(){
	var username=document.getElementById("username"),
	password=document.getElementById("password"),
	confirm=document.getElementById("confirm"),
	email=document.getElementById("email"),
	phone=document.getElementById("phone"),
	btn=document.getElementById("btn"),
	span=document.getElementsByTagName("span");

	username.onfocus=username_onfocus;
	username.onblur=username_onblur;
	password.onfocus=password_onfocus;
	password.onblur=password_onblur;
	confirm.onfocus=confirm_onfocus;
	confirm.onblur=confirm_onblur;
	email.onfocus=email_onfocus;
	email.onblur=email_onblur;
	phone.onfocus=phone_onfocus;
	phone.onblur=phone_onblur;

	// 提交按钮
	btn.onclick=function(){
		var a1=username_onblur(),
			b1=password_onblur(),
			c1=confirm_onblur(),
			d1=email_onblur(),
			e1=phone_onblur();

		if(a1&&b1&&c1&&d1&&e1){
			alert("提交成功");
			window.location.reload();//页面重新载入
		}else{
			alert("提交失败,请您按照要求核对");				
		}

	}

		// 计算长度函数
		function countLength(str){
			var inputLength=0;
			for(var i=0;i<str.length;i++){
				var countCode=str.charCodeAt();
				if(countCode>=0&&countCode<128){
					inputLength++;
				}else{
					inputLength+=2;
				}
			}
			return inputLength;
		}

		// 名称框聚焦失焦
		function username_onfocus(){
			this.className="";
			span[0].style.color="#ccc";
			span[0].innerHTML="必填，长度为4-16个字符";
		}

		function username_onblur(){
			var inputValue=username.value.trim();
			if(countLength(inputValue)==0){
				span[0].innerHTML="名称不能为空";
				span[0].style.color="red";
				this.className="warn";
				return false;
			}else if(countLength(inputValue)>=4&&countLength(inputValue)<=16){
				span[0].innerHTML="格式正确";
				span[0].style.color="green";
				this.className="col";
				return true;
			}else{
				span[0].innerHTML="格式错误";
				span[0].style.color="red";
				this.className="warn";
				return false;
			}
		}
		// 密码框聚焦失焦
		function password_onfocus(){
			this.className="";
			span[1].style.color="#ccc";
			span[1].innerHTML="请输入至少6位字符";
		}
		function password_onblur(){
			var inputValue=password.value.trim();
			//trim方法作为字符串的方法,会删除字符串两端的空格,
			//相关的还有trimRight()和trimLeft()方法
			//用正则实现的对应方法为 /(^\s*)|(\s*$)/g,/(^\s*)/g,/(\s$)/g
			if(inputValue.length<6){
				span[1].innerHTML="密码长度不够";
				span[1].style.color="red";
				this.className="warn";
				return false;
			}else{
				span[1].innerHTML="密码可用";
				span[1].style.color="green";
				this.className="col";
				return true;
			}
		}
		// 密码确认框聚焦失焦
		function confirm_onfocus(){
			this.className="";
			span[2].style.color="#ccc";
			span[2].innerHTML="请确认密码";
		}
		function confirm_onblur(){
			if(confirm.value==""||confirm.value==null){
				span[2].innerHTML="请确认密码";
				span[2].style.color="red";
				this.className="warn";
				return false;
			}else if(confirm.value==password.value){
				span[2].innerHTML="密码输入一致";
				span[2].style.color="green";
				this.className="col";
				return true;
			}else{
				span[2].innerHTML="密码不一致，请重新输入";
				span[2].style.color="red";
				this.className="warn";
				return false;
			}
		}
		// 邮箱输入框聚焦失焦
		function email_onfocus(){
			span[3].innerHTML="如:1041579493@qq.com";
			this.className="";
			span[3].style.color="#ccc";
		}
		function email_onblur(){
			inputValue=email.value;
			var reg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-]{2,3}){1,2}$/;
			if(email.value==""||email.value==null){
				span[3].innerHTML="请输入邮箱";
				span[3].style.color="red";
				this.className="warn";
				return false;
			}else if(reg.test(inputValue)){
				span[3].innerHTML="邮箱格式正确";
				span[3].style.color="green";
				this.className="col";
				return true;
			}else {
				span[3].innerHTML="邮箱格式错误";
				span[3].style.color="red";
				this.className="warn";
				return false;
			}
		}
		// 手机输入框聚焦失焦
		function phone_onfocus(){
			span[4].innerHTML="";
			this.className="";
			span[4].style.color="#ccc";
		}
		function phone_onblur(){
			var inputValue=phone.value;
			var reg=/^1[34578]\d{9}$/;
			if(reg.test(inputValue)){
				span[4].innerHTML="手机格式正确";
				span[4].style.color="green";
				this.className="col";
				return true;
			}else{
				span[4].innerHTML="手机格式错误";
				span[4].style.color="red";
				this.className="warn";
				return false;
			}
		}
}