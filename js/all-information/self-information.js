/*
 * 改变当前城市修改全局city
 */
var city = unescape(getCookie("city"));
var changeC = getCookie("change");
if(getCookie("change") == null) {
	atCity.innerHTML = unescape(getCookie("city"));
	this.city = unescape(city);
} else {
	atCity.innerHTML = unescape(getCookie("change"));
	this.city = unescape(changeC);
}
/*
 * 下拉菜单手风琴效果
 */
//function initMenu() {
//$('#infor-menu ul').hide();
//$('#infor-menu ul:first').show();
//$('#infor-menu li a').click(
//  function() {
//    var checkElement = $(this).next();
//    if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
//      return false;
//      }
//    if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
//      $('#infor-menu ul:visible').slideUp('normal');
//      checkElement.slideDown('normal');
//      return false;
//      }
//    }
//  );
//}
//$(document).ready(function() {initMenu();});
/**
 * 获取公司福利标签
 */
//var tagg = '';
//var taggID = '';
//$.ajax({
//	type: "get",
//	url: urlf + "api/Sys/GetWelfareTagList",
//	async: true,
//	success: function(data) {
//		//		console.log(data.Result);
//		if(data.Status == 1) {
//			for(var i = 0; i < data.Result.length; i++) {
//				var welName = data.Result[i].Name;
//				var welID = data.Result[i].ID;
//				tagg += '<span class="recWelfare-text" id=' + welID + '>' + welName + '</span>';
//			}
//			$("#recuit-wel").html(tagg);
//		} else {
//			alert(data.Result);
//		}
//		$(".recWelfare-text").each(function() {
//			$(this).click(function() {
//				$(this).toggleClass("recWelfare-text");
//				taggID += "" + $(this).attr("id") + ",";
//			})
//		})
//	}
//});
/*
 * 获取职位名称和职位类名
 */
var position = '';
var deposition = '';
$(document).ready(function() {
	$.ajax({
		url: urlf + "api/Sys/GetPositionListToRe",
		success: function(data) {
			if(data.Status == 1) {
				for(var i = 0; i < data.Result.length; i++) {
					var re = data.Result;
					//职位类名
					position += '<option><span class="issuetop-text03">' + re[i].ClassName + '</span></option>';
				}

				$(".recruit-select01").html(position);
//				$(".recruit-select02").html(deposition);
			} else {
				alert(data.Status);
			}

		}
	});
});

/*
 * 职位二级联动
 */
function Jobs(e) {
	var deposition1 = '';
	$.ajax({
		url: urlf + "api/Sys/GetPositionListToRe",
		success: function(data) {
			if(data.Status == 1) {
				var abc = data.Result;
				for(var i = 0; i < abc.length; i++) {
					if(abc[i].ClassName == e) {
						for(var j = 0; j < abc[i].PositionList.length; j++) {
							deposition1 += '<option value="' + abc[i].PositionList[j].ID + '">' + abc[i].PositionList[j].Name + '</option>';
						}
					}
				}
				$(".recruit-select02").html(deposition1);
			} else {
				alert(data.Result)
			}
		}
	});
}
Jobs('销售')

/*
 * 实名认证
 */
$("#cerfication-button").click(function() {
	var Name = $("#self-name").val();
	var Number = $("#self-number").val();
	var Token = getCookie("token");
	if(Name == "" || Number == ""){
		layer.open({ 
			content: "请输入姓名",
			title: '温馨提示',
			area: ['320px', '180px'],
			success: function(layer) {
				layer[0].childNodes[3].childNodes[0].attributes[0].value = 'layui-layer-btn1';
			},
		});
	}
	else{
		$.ajax({
			type: "POST",
			url: urlf + "api/User/PCAuthentication",
			async: true,
			data: {
				"Name": Name,
				"IDCard": Number,
				"Token": Token
			},
			success: function(data) {
				if(data.Status == 1) {
					layer.open({
						content: data.Result,
						title: '温馨提示',
						area: ['320px', '180px'],
						success: function(layer) {
							layer[0].childNodes[3].childNodes[0].attributes[0].value = 'layui-layer-btn1';
						},
					});
				} else {
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
})

/*
 * 上传企业营业执照
 */
UploadLicenceImg("loadCompanyImage", "loadCompanyImga", "loadCompanyImge");
UploadLabourLicenceImg("loadCompanyLabourImage", "loadCompanyLabourImga", "loadCompanyLabourImge");
/*
 * 企业认证
 */
$("#company-comfirm").click(function() {
	$(this).css("background-color", "#FF6146");
	var CompanyName = $("#company-name").val();
	var Province = $("#companycmbProvince").val();
	var City = $("#companycmbCity").val();
	var Area = $("#companycmbArea").val();
	var Address = $("#company-address").val();
	var CompanySize = $("#company-size").val();
	var CompanyNature = $("#company-nature").val();
	var CompanyTrade = $("#company-trade").val();
	var CompanyIntro = $("#company-intro").val();
	var CompanyQQ = $("#companyQQ").val();
	var Longitude = 0;
	var Latitude = 0;
	var LicenseImage = img_value;
	var DispatchImage = image_val;
	var Token = getCookie("token");
	
	if(CompanyName == '' || Address == '' || CompanySize == '' || CompanyNature == '' || CompanyTrade == '' || CompanyIntro == '' || CompanyQQ == ''){
		layer.open({
			content: "请确定是否输入完整？",
			title: '温馨提示',
			area: ['320px', '180px'],
			success: function(layer) {
				layer[0].childNodes[3].childNodes[0].attributes[0].value = 'layui-layer-btn1';
			},
		});
	}
	else{
		$.ajax({
			type: "post",
			url: urlf + "api/User/PCEnterpriseCertification",
			async: true,
			data: {
				"CompanyName": CompanyName,
				"Province": Province,
				"City": City,
				"Region": Area,
				"CompanyAddress": Address,
				"CompanyScale": CompanySize,
				"CompanyNature": CompanyNature,
				"CompanyIndustry": CompanyTrade,
				"CompanyIntroduce": CompanyIntro,
				"Longitude": 0,
				"Latitude": 0,
				"LicenseImage": LicenseImage,
				"DispatchImage": DispatchImage,
				"QQNumber": CompanyQQ,
				"Token": Token
			},
			success: function(data) {
				if(data.Status == 1) {
					layer.open({
						content: data.Result,
						title: '温馨提示',
						area: ['320px', '180px'],
						success: function(layer) {
							layer[0].childNodes[3].childNodes[0].attributes[0].value = 'layui-layer-btn1';
						},
					});
				} else {
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
})

UploadLicenceImg("loadMiddleImage", "loadMiddleImga", "loadMiddleImge");
UploadLabourLicenceImg("loadMiddleLabourImage", "loadMiddleLabourImga", "loadMiddleLabourImge");
/*
 * 中介认证
 */
$("#middle-comfirm").click(function() {
	$(this).css("background-color", "#FF6146");
	var Name = $("#middle-name").val();
	var Number = $("#middle-number").val();
	var QQnumber = $("#middleQQ").val();
	var Province = $("#middlecmbProvince").val();
	var City = $("#middlecmbCity").val();
	var Area = $("#middlecmbArea").val();
	var Address = $("#middle-address").val();
	var Intro = $("#middle-intro").val();
	var LicenseImage = img_value;
	var DispatchImage = image_val;
	var Longitude = 0;
	var Latitude = 0;
	var Token = getCookie("token");
	if(Name == '' || Number == '' || QQnumber == '' || Address == '' || Intro == ''){
		layer.open({
			content: "请确定是否输入完整?",
			title: '温馨提示',
			area: ['320px', '180px'],
			success: function(layer) {
				layer[0].childNodes[3].childNodes[0].attributes[0].value = 'layui-layer-btn1';
			},
		});
	}
	else{
		$.ajax({
			type: "post",
			url: urlf + "api/User/PCIntermediaryCertification",
			async: true,
			data: {
				"CompanyName": Name,
				"Province": Province,
				"City": City,
				"Region": Area,
				"CompanyAddress": Address,
				"CompanyRegistration": Number,
				"CompanyIntroduce": Intro,
				"Longitude": 0,
				"Latitude": 0,
				"LicenseImage":LicenseImage,
				"DispatchImage":DispatchImage,
				"QQNumber": QQnumber,
				"Token": Token
			},
			success: function(data) {
				if(data.Status == 1) {
					layer.open({
						content: data.Result,
						title: '温馨提示',
						area: ['320px', '180px'],
						success: function(layer) {
							layer[0].childNodes[3].childNodes[0].attributes[0].value = 'layui-layer-btn1';
						},
					});
				} else {
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
})

/*
 * 获取实名认证信息
 */
function getMyAuthentication() {
	var name = '';
	var selfID = '';
	var token = getCookie("token");
	$.ajax({
		type: "get",
		url: urlf + "api/User/PCGetMyAuthentication",
		data: {
			"Token": token
		},
		error:function(){
			layer.open({
				content: "您未登录，请先登录。",
				title: '温馨提示',
				area: ['320px', '180px'],
				success: function(layer) {
					layer[0].childNodes[3].childNodes[0].attributes[0].value = 'layui-layer-btn1';
				},
			});
		},
		success: function(data) {
			//			console.log(data.Result);
			if(data.Status == 1) {
				name += '<input type="text" class="input-text01" id="self-name" value="' + data.Result.Name + '" readonly = "readonly"/>'
				selfID += '<input type="text" class="input-text01" id="self-number" value="' + data.Result.IDCard + '" readonly = "readonly"/>'

				$("#IdentName").html(name);
				$("#selfID").html(selfID);
				
				$("#cerfication-button").hide();
				
			} else {
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

$('#resume-quali').attr("disabled", "disabled");
$(".radio").attr("disabled", true); //这里
$('#resume-expe').attr("disabled", "disabled");

/*
 * 获取简历信息
 */
function GetResumeInfor() {
	var token = getCookie("token");
	var name = '';
	var address = '';
	var qq = '';
	var phone = '';
	var salary = '';
	var intro = '';
	var pro = '';
	var pos = '';

	$.ajax({
		type: "get",
		url: urlf + "api/User/PCGetResume",
		async: true,
		data: {
			"Token": token
		},
		error: function() {
			layer.open({
				content: "您未登录，请先登录。",
				title: '温馨提示',
				area: ['320px', '180px'],
				success: function(layer) {
					layer[0].childNodes[3].childNodes[0].attributes[0].value = 'layui-layer-btn1';
				},
			});
		},
		success: function(data) {
//				console.log(data.Result);
			re = data.Result;

			if(data.Status == 1) {
				//显示性别
				var se = re.Sex;
				//				 console.log(se);
				if(se == 1) {
					$("input[value = 1]").attr("checked", true);
				}

				//显示工作经验
				ShowSelectedInfor("resume-expe", re.WorkExperience);

				//显示学历
				ShowSelectedInfor("resume-quali", re.Qualifications);

				//显示省市区
				$("#distpicker-resume-infor").distpicker({
	    			province: re.Province,
	    			city: re.City,
	   		 		district: re.Region
	  			});
	  			$("#resumecmbProvince").attr("disabled",true);
	  			$("#resumecmbCity").attr("disabled",true);
	  			$("#resumecmbArea").attr("disabled",true);
	  			
	  			$("#resume-name").val(re.Name);
	  			$("#resume-address").val(re.Address);
	  			$("#res-QQ").val(re.QQNumber);
	  			$("#resume-phone").val(re.phone);
	  			$("#salary-expire").val(re.SalaryExpectation);
	  			$("#resume-selfIntro").val(re.Introduction);
	  			$("#resPosCName").val(re.PositionClassName);
	  			$("#resPosName").val(re.PositionName);
	  			
	  			$('input').attr("readonly",true);
	  			$('textarea').attr("readonly",true);
	  			
			} else {
					
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

/*
 * 点击修改按钮进入修改简历界面
 */
$("#resume-button").click(function() {

	$(this).css("background-color", "#FF6146");
	$(this).hide();
	$("#SaveResume").show();
	
	//设置元素只读状态
	$('#resume-expe').attr("disabled", false);
	$('input').attr("readonly", false) //去除input元素的readonly属性
	$('textarea').attr("readonly", false);
	$('#resume-quali').attr("disabled", false);
	$(".radio").attr("disabled", false); //这里
	$('#resume-job1').attr("disabled", false);
	$('#resume-job2').attr("disabled", false);
	$('#resume-expe').attr("disabled", false);
	$("#resumecmbProvince").attr("disabled",false);
	$("#resumecmbCity").attr("disabled",false);
	$("#resumecmbArea").attr("disabled",false);
	
	$("#resPostion").replaceWith('');
	$("#resPostion0").show();
	$("#resPostion1").show();
//	Jobs('销售');
	ShowSelectPosi("resume-job1", "resume-job2", re.PositionClassName, re.PositionID);
})

/*
 * 修改简历信息
 */
$("#SaveResume").click(function() {
	$("#SaveResume").css("background-color", "#FF6146");
	$(this).hide();
	$("#resume-button").show();

	var Name = $("#resume-name").val();
	var Sex = $('input:radio:checked').val();
	var ResumeQQ = $("#res-QQ").val();
	var Province = $("#resumecmbProvince").val();
	var City = $("#resumecmbCity").val();
	var Region = $("#resumecmbArea").val();
	var Address = $("#resume-address").val();
	var WorkExperience = $("#resume-expe").find("option:selected").text();
	var Phone = $("#resume-phone").val();
	var Qualifications = $("#resume-quali").find("option:selected").text();
	var PositionID = $("#resume-job2").find("option:selected").val();
	var SalaryExpectation = parseInt($("#salary-expire").val());
	var Introduction = $("#resume-selfIntro").val();
	var Token = getCookie("token");

	$.ajax({
		type: "POST",
		url: urlf + "api/Release/PCCreateResume",
		async: true,
		data: {
			"Name": Name,
			"Sex": Sex,
			"Province": Province,
			"City": City,
			"Region": Region,
			"Address": Address,
			"WorkExperience": WorkExperience,
			"phone": Phone,
			"QQNumber": ResumeQQ,
			"Qualifications": Qualifications,
			"PositionID": PositionID,
			"SalaryExpectation": SalaryExpectation,
			"Introduction": Introduction,
			"Token": Token
		},
		success: function(data) {
			if(data.Status == 1) {
				layer.open({
					content: data.Result,
					title: '温馨提示',
					area: ['320px', '180px'],
					success: function(layer) {
						layer[0].childNodes[3].childNodes[0].attributes[0].value = 'layui-layer-btn1';
					},
				});
				$('input').attr("readonly", true);
				$('#resumecmbProvince').attr("disabled", "disabled");
				$('#resumecmbCity').attr("disabled", "disabled");
				$('#resumecmbArea').attr("disabled", "disabled");
				$('textarea').attr("readonly", true);
				$('#resume-quali').attr("disabled", "disabled");
				$(".radio").attr("disabled", true); //这里
				$('#resume-job1').attr("disabled", "disabled");
				$('#resume-job2').attr("disabled", "disabled");
				$('#resume-expe').attr("disabled", "disabled");
			} else {
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
})

/*
 * 获取企业认证信息
 */
function getCompanyInfor() {
	var name = '';
	var size = '';
	var nature = '';
	var trade = '';
	var qq = '';
	var address = '';
	var intro = '';
	var token = getCookie("token");

	$.ajax({
		type: "get",
		url: urlf + "api/User/PCGetEnterprise",
		async: true,
		data: {
			"Token": token
		},
		error:function(){
			layer.open({
				content: "您未登录，请先登录。",
				title: '温馨提示',
				area: ['320px', '180px'],
				success: function(layer) {
					layer[0].childNodes[3].childNodes[0].attributes[0].value = 'layui-layer-btn1';
				},
			});
		},
		success: function(data) {
						console.log(data.Result);
			var re = data.Result;
			if(data.Status == 1) {
				//显示省市区
				$("#distpicker-company-infor").distpicker({
	    			province: re.Province,
	    			city: re.City,
	   		 		district: re.Region
	  			});
	  			
	  			$("#loadCompanyImge").attr("src", re.LicenseImage);
	  			$("#loadCompanyLabourImge").attr("src", re.DispatchImage);
	  			
	  			$("#company-name").val(re.CompanyName);
	  			$("#company-size").val(re.CompanyScale);
	  			$("#company-nature").val(re.CompanyNature);
	  			$("#company-trade").val(re.CompanyIndustry);
	  			$("#companyQQ").val(re.QQNumber);
	  			$("#company-address").val(re.CompanyAddress);
	  			$("#company-intro").val(re.CompanyIntroduce);

				$('input').attr("readonly", true);
				$('textarea').attr("readonly", true);
				$("#companycmbProvince").attr("disabled",true);
				$("#companycmbCity").attr("disabled",true);
				$("#companycmbArea").attr("disabled",true);
				
//				$("#company-comfirm").hide();
				
				$("#loadCompanyLabourImga").css("display", "none");
				$("#loadCompanyImga").css("display", "none");
				/*
				 * 图片放大
				 */
				$('#loadCompanyImge').zoomify();
	  			$('#loadCompanyLabourImge').zoomify();

			} else {
				$("#distpicker-company-infor").distpicker({
	    			province: "",
	    			city: "",
	   		 		district: ""
	  			});
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

/*
 * 获取中介认证信息
 */
function getMiddleInfor() {
	var name = '';
	var num = '';
	var qq = '';
	var addr = '';
	var intro = '';
	var token = getCookie("token");

	$.ajax({
		type: "get",
		url: urlf + "api/User/PCGetIntermediary",
		async: true,
		data: {
			"Token": token
		},
		error:function(){
			layer.open({
				content: "您未登录，请先登录。",
				title: '温馨提示',
				area: ['320px', '180px'],
				success: function(layer) {
					layer[0].childNodes[3].childNodes[0].attributes[0].value = 'layui-layer-btn1';
				},
			});
		},
		success: function(data) {
			var re = data.Result;
			if(data.Status == 1) {
				//显示省市区
				$("#distpicker-middle-infor").distpicker({
	    			province: re.Province,
	    			city: re.City,
	   		 		district: re.Region
	  			});
	  			
	  			$("#loadMiddleImge").attr("src", re.LicenseImage);
	  			$("#loadMiddleLabourImge").attr("src", re.DispatchImage);
	  			
	  			$("#middle-name").val(re.CompanyName);
	  			$("#middle-number").val(re.CompanyRegistration);
	  			$("#middleQQ").val(re.QQNumber);
	  			$("#middle-address").val(re.CompanyAddress);
	  			$("#middle-intro").val(re.CompanyIntroduce);
	  			
	  			$('input').attr("readonly",true);
	  			$('textarea').attr("readonly",true);
	  			$("#middlecmbProvince").attr("disabled", true);
	  			$("#middlecmbCity").attr("disabled", true);
	  			$("#middlecmbArea").attr("disabled", true);
	  			
	  			//隐藏input，使得图片只能显示
	  			$("#loadMiddleImga").css("display", "none");
	  			$("#loadMiddleLabourImga").css("display", "none");
	  			//图片放大
	  			$('#loadMiddleImge').zoomify();
	  			$('#loadMiddleLabourImge').zoomify();
	  		
			} else {
				$("#distpicker-middle-infor").distpicker({
	    			province: "",
	    			city: "",
	   		 		district: ""
	  			});
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

$('.information-right1').hide();
$(".information-right2").hide();
/*
   * 菜单栏的点击事件
   */
$(document).ready(function() {
	var inforID = window.document.location.href;
	var inID = inforID.split("#")[1];
	//	$('#menu-identify-information').click();
	$("#menu-" + inID).click();
})

$('#menu-identify-information').click(function() {
	$(".h4").css("color", "#4A4A4A");
	$(".m1").css("border-left", "4px solid #FFFFFF")
	$("#Menu1").css("color", "#FF6146");
	$("#menu-identify-information").css("border-left", "4px solid #ff6146");
	$('.information-right1').hide();
	$(".information-right2").hide();
	$('#identify-information').show();
	getMyAuthentication();
	
})
$('#menu-resume-information').click(function() {
	$(".h4").css("color", "#4A4A4A");
	$(".m1").css("border-left", "4px solid #FFFFFF")
	$("#Menu2").css("color", "#FF6146");
	$("#menu-resume-information").css("border-left", "4px solid #ff6146");
	$('.information-right1').hide();
	$(".information-right2").hide();
	$('#resume-information').show();
	GetResumeInfor();
})
$('#menu-company-information').click(function() {
	$(".h4").css("color", "#4A4A4A");
	$(".m1").css("border-left", "4px solid #FFFFFF")
	$("#Menu3").css("color", "#FF6146");
	$("#menu-company-information").css("border-left", "4px solid #ff6146");
	$('.information-right1').hide();
	$(".information-right2").hide();
	$('#company-information').show();
	getCompanyInfor();
})
$('#menu-middle-information').click(function() {
	$(".h4").css("color", "#4A4A4A");
	$(".m1").css("border-left", "4px solid #FFFFFF")
	$("#Menu4").css("color", "#FF6146");
	$("#menu-middle-information").css("border-left", "4px solid #ff6146");
	$('.information-right1').hide();
	$(".information-right2").hide();
	$('#middle-information').show();
	getMiddleInfor();
})
$('#menu-resume-infor').click(function() {
	$(".h4").css("color", "#4A4A4A");
	$(".m1").css("border-left", "4px solid #FFFFFF")
	$("#Menu6").css("color", "#FF6146");
	$("#menu-resume-infor").css("border-left", "4px solid #ff6146");
	$('.information-right1').hide();
	$(".information-right2").hide();
	$('#resume-information').show();
	GetResumeInfor();
})
$('#menu-provide-infor').click(function() {
	$(".h4").css("color", "#4A4A4A");
	$(".m1").css("border-left", "4px solid #FFFFFF")
	$("#Menu7").css("color", "#FF6146");
	$("#menu-provide-infor").css("border-left", "4px solid #ff6146");
	$('.information-right1').hide();
	$(".information-right2").hide();
	$('#provide-infor').show();
	getProvideList();
})
$('#menu-bus-infor').click(function() {
	$(".h4").css("color", "#4A4A4A");
	$(".m1").css("border-left", "4px solid #FFFFFF")
	$("#Menu12").css("color", "#FF6146");
	$("#menu-bus-infor").css("border-left", "4px solid #ff6146");
	$('.information-right1').hide();
	$(".information-right2").hide();
	$('#bus-infor').show();
	getBusInfor();
})
$('#menu-rent-infor').click(function() {
	$(".h4").css("color", "#4A4A4A");
	$(".m1").css("border-left", "4px solid #FFFFFF")
	$("#Menu13").css("color", "#FF6146");
	$("#menu-rent-infor").css("border-left", "4px solid #ff6146");
	$('.information-right1').hide();
	$(".information-right2").hide();
	$('#rent-infor').show();
	getRentList();
})