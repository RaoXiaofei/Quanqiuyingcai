var listID = window.document.location.href;
//console.log(listID)
//console.log(listID.split("id=")[1])
var id = listID.split("id=")[1];

var d1 = '';
var d2 = '';
var d3 = '';
var d4 = '';
var d5 = '';
var detaP1 = '';
var detaP2 = '';
var compInfor = '';
var Token = getCookie("token");

var city = unescape(getCookie("city"));
var changeC = getCookie("change");
if(getCookie("change") == null){
	atCity.innerHTML = unescape(getCookie("city"));
	this.city = unescape(city);
}
else{
	atCity.innerHTML = unescape(getCookie("change"));
	this.city = unescape(changeC);
}

$(document).ready(function(){

	$.ajax({
		type:"get",
		url:urlf+"api/Company/PositionDetail?id="+id+"&lng=0&lat=0",
		async:true,
		success:function(data){
			console.log(data.Result)
			var re = data.Result;
			
			d1 += '<span class="work-text02">'+re.Name+'</span><span class="work-text03">'+re.Salary+'</span>'
			
			if(re.WelfareTag.length != 0){
				$("#index-detail002").show();
				for(var i in re.WelfareTag){
					d2 += '<span class="work-text04">'+re.WelfareTag[i].Name+'&nbsp;&nbsp;&nbsp;</span>'
				}
			}
			
			if(re.IsUrgent == true){
				d3 +=   '<img src="assets/坐标.png" class="img"/>'
				d3 += 	'<span class="work-text05">'+re.CompanyAddress+'</span>'
				d3 += 	'<img src="img/jiaji.png" class="img"/>'
				d3 += 	'<span class="work-text005">加急</span>'
				$("#timer").attr("timer", re.CountDown);
				$("#index-detail-daojishi").show();
			}
			else{
				d3 +=   '<img src="assets/坐标.png" class="img"/>'
				d3 += 	'<span class="work-text05">'+re.CompanyAddress+'</span>'
			}
			
			d4 += '<div class="btn-group" role="group" style="margin-right:30px;">'
			d4 +=	  '<button type="button" class="btn btn-default dropdown-toggle btn-danger phone-contact" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">电话联系</button>'
			d4 +=	  '<ul class="dropdown-menu">'
			d4 +=		 '<li>'+re.Phone+'</li>'
			d4 +=	  '</ul>'
			d4 +=	'</div>'
			d4 +=	 '<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin='+re.QQNumber+'&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:1352197441:51" alt="点击这里给我发消息" title="点击这里给我发消息"/></a>'
			
			detaP1 += '<p class="work-section01">'+re.JobDescription+'</p>'
			detaP2 += '<p class="work-section01">'+re.Requirement+'</p>'
			
			compInfor += '<h1 class="work-text08">'+re.CompanyName+'</h1>'
			compInfor += '<h1 class="work-text04">'+re.CompanyIndustry+'&nbsp;&nbsp;'+re.CompanyScale+'</h1>'
			compInfor += '<p class="work-section02">'+re.CompanyIntroduce+'</p>'
			
			
			$("#index-detail001").html(d1);
			$("#index-detail002").html(d2);
			$("#index-detail003").html(d3);
			$("#index-detail004").html(d4);
			$("#para01").html(detaP1);
			$("#para02").html(detaP2);
			$("#compIn").html(compInfor);	
		}
		
	});

})

//console.log(id)
//举报
function ReportThis(){
	$.ajax({
		type:"get",
		url:urlf+"api/Report/UserReport?id="+id+"&type=6",
		async:true,
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", getCookie('token'));
		},	
		error:function(){
	    	layer.open({
				content: "请先登录",
				title: '温馨提示',
				area: ['320px', '180px'],
				success: function(layer) {
					layer[0].childNodes[3].childNodes[0].attributes[0].value = 'layui-layer-btn1';
				},
			});
	    },
		success:function(data){
			if(data.Status == 1){
				layer.open({
					content: data.Result,
					title: '温馨提示',
					area: ['320px', '180px'],
					success: function(layer) {
						layer[0].childNodes[3].childNodes[0].attributes[0].value = 'layui-layer-btn1';
					},
				});
			}
			else{
				layer.open({
					content: data.Result,
					title: '温馨提示',
					area: ['320px', '180px'],
					success: function(layer) {
						layer[0].childNodes[3].childNodes[0].attributes[0].value = 'layui-layer-btn1';
					},
				});
			}
		}
	});
}
