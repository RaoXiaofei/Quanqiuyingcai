var ListID = window.document.location.href;
//console.log(ListID);
var liID = ListID.split("id=")[1];
//console.log(liID)

var w = '';
var o = '';
var r = '';
var k = '';

var intro = '';
var tImg = '';
var img = '';
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

$.ajax({
	type:"get",
	url:urlf+"api/Company/SummerJobDetail?id="+liID,
	async:true,
	
	success:function(data){
		if(data.Status == 1){
			console.log(data.Result);
			var re = data.Result;
			/*
			 * 公司介绍图片详情
			 */
			for(var i = 0; i < re.ImageList.length; i++){
					tImg += '<div class="swiper-slide"><img src="'+re.ImageList[i].Image+'"  style="width: 400px;height: 280px;"/></div>'
				}
				$("#detailBanner").html(tImg);
				
			var swiper = new Swiper('.swiper-container', {
				pagination: '.swiper-pagination',
				nextButton: '.swiper-button-next',
				prevButton: '.swiper-button-prev',
				slidesPerView: 1,
				paginationClickable: true,
				spaceBetween: 30,
				loop: true,
				autoplay: 3000
			});
			
			w += '<span class="work-text09">'+re.Name+'</span>'
			
			if(re.IsUrgent == true){
				o += '<img src="assets/坐标.png" class="img"/>'
				o += '<span class="work-text05">'+re.Address+'</span>'
				o += '<img src="img/jiaji.png" class="img"/>'
				o += '<span class="work-text005">加急</span>'
				$("#timer").attr("timer",re.CountDown);
				$("#departWork-jiaji").show();
			}
			else{
				o += '<img src="assets/坐标.png" class="img"/>'
				o += '<span class="work-text05">'+re.Address+'</span>'
			}
			
			r += '<div class="btn-group bu" role="group">'
			r +=	  '<button type="button" class="btn btn-default dropdown-toggle btn-danger phone-contact" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">电话联系</button>'
			r +=	  '<ul class="dropdown-menu dropMenu">'
			r +=		 '<li>'+re.Phone+'</li>'
			r +=	  '</ul>'
			r +=	'</div>'			
			r+= 		'<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin='+re.QQNumber+'&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:1352197441:51" alt="点击这里给我发消息" title="点击这里给我发消息"/></a>'
			
			
			intro += '<p class="work-section01">'+re.Introduce+'</p>'
			
			img += '<img src="'+re.PriceImage+'" class="work-section03" alt="图片加载出错" style="width: 600px;height: 400px;"/>'
			
			$("#departWork001").html(w);
			$("#departWork002").html(o);
			$("#departWork003").html(r);
			$("#wr").html(intro);
			$("#wrimg").html(img);
			$("#partJob-Banner").html(tImg);
			
			if(getCookie("token") == null){
				$(".phone-contact").attr("disabled", true);
			}
		}
		else{
			alert(data.Result);
		}
	}
});