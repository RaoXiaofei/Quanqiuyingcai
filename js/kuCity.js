/*
 * 城市选择jquer插件
 *
 * Licensed under the MIT license:
 * https://github.com/callmeJozo/kuCity
 *
 * Author: Naraku(http://segmentfault.com/u/naraku_)
 *
 * Version:  1.0
 *
 */
//切换城市的名称
var changeCity = "";

(function($) {
    var allCities = ['北京市|beijing|bj', '上海市|shanghai|sh', '重庆市|chongqing|cq', '深圳市|shenzhen|sz', '广州市|guangzhou|gz', '杭州市|hangzhou|hz',
        '南京市|nanjing|nj', '苏州市|shuzhou|sz', '天津市|tianjin|tj', '成都市|chengdu|cd', '南昌市|nanchang|nc', '三亚市|sanya|sy', '青岛市|qingdao|qd',
        '厦门市|xiamen|xm', '西安市|xian|xa', '长沙市|changsha|cs', '合肥市|hefei|hf', '西藏市|xizang|xz', '内蒙古市|neimenggu|nmg', '安庆市|anqing|aq', '阿泰勒市|ataile|atl', '安康市|ankang|ak',
        '阿克苏市|akesu|aks', '包头市|baotou|bt', '北海市|beihai|bh', '百色市|baise|bs', '保山市|baoshan|bs', '长治市|changzhi|cz', '长春市|changchun|cc', '常州市|changzhou|cz', '昌都市|changdu|cd',
        '朝阳市|chaoyang|cy', '常德市|changde|cd', '长白山市|changbaishan|cbs', '赤峰市|chifeng|cf', '大同市|datong|dt', '大连市|dalian|dl', '达县市|daxian|dx', '东营市|dongying|dy', '大庆|daqing|dq', '丹东|dandong|dd',
        '大理市|dali|dl', '敦煌市|dunhuang|dh', '鄂尔多斯市|eerduosi|eeds', '恩施市|enshi|es', '福州市|fuzhou|fz', '阜阳市|fuyang|fy', '贵阳市|guiyang|gy',
        '桂林市|guilin|gl', '广元市|guangyuan|gy', '格尔木市|geermu|gem', '呼和浩特市|huhehaote|hhht', '哈密市|hami|hm',
        '黑河市|heihe|hh', '海拉尔市|hailaer|hle', '哈尔滨市|haerbin|heb', '海口市|haikou|hk', '黄山市|huangshan|hs', '邯郸市|handan|hd',
        '汉中市|hanzhong|hz', '和田市|hetian|ht', '晋江市|jinjiang|jj', '锦州市|jinzhou|jz', '景德镇市|jingdezhen|jdz',
        '嘉峪关市|jiayuguan|jyg', '井冈山市|jinggangshan|jgs', '济宁市|jining|jn', '九江市|jiujiang|jj', '佳木斯市|jiamusi|jms', '济南市|jinan|jn',
        '喀什市|kashi|ks', '昆明市|kunming|km', '康定市|kangding|kd', '克拉玛依市|kelamayi|klmy', '库尔勒市|kuerle|kel', '库车市|kuche|kc', '兰州市|lanzhou|lz',
        '洛阳市|luoyang|ly', '丽江市|lijiang|lj', '林芝市|linzhi|lz', '柳州市|liuzhou|lz', '泸州市|luzhou|lz', '连云港市|lianyungang|lyg', '黎平市|liping|lp',
        '连成市|liancheng|lc', '拉萨市|lasa|ls', '临沧市|lincang|lc', '临沂市|linyi|ly', '芒市市|mangshi|ms', '牡丹江市|mudanjiang|mdj', '满洲里市|manzhouli|mzl', '绵阳市|mianyang|my',
        '梅县市|meixian|mx', '漠河市|mohe|mh', '南充市|nanchong|nc', '南宁市|nanning|nn', '南阳市|nanyang|ny', '南通市|nantong|nt', '那拉提市|nalati|nlt',
        '宁波市|ningbo|nb', '攀枝花市|panzhihua|pzh', '衢州市|quzhou|qz', '秦皇岛市|qinhuangdao|qhd', '庆阳市|qingyang|qy', '齐齐哈尔市|qiqihaer|qqhe',
        '石家庄市|shijiazhuang|sjz', '沈阳市|shenyang|sy', '思茅市|simao|sm', '铜仁市|tongren|tr', '塔城市|tacheng|tc', '腾冲市|tengchong|tc', '台州市|taizhou|tz',
        '通辽市|tongliao|tl', '太原市|taiyuan|ty', '威海市|weihai|wh', '梧州市|wuzhou|wz', '文山市|wenshan|ws', '无锡市|wuxi|wx', '潍坊市|weifang|wf', '武夷山市|wuyishan|wys', '乌兰浩特市|wulanhaote|wlht',
        '温州市|wenzhou|wz', '乌鲁木齐市|wulumuqi|wlmq', '万州市|wanzhou|wz', '乌海市|wuhai|wh', '兴义市市|xingyi|xy', '西昌市市|xichang|xc', '襄樊市|xiangfan|xf',
        '西宁市|xining|xn', '锡林浩特市|xilinhaote|xlht', '西双版纳市|xishuangbanna|xsbn', '徐州市|xuzhou|xz', '义乌市|yiwu|yw', '永州市|yongzhou|yz', '榆林市|yulin|yl', '延安市|yanan|ya', '运城市|yuncheng|yc',
        '烟台市|yantai|yt', '银川市|yinchuan|yc', '宜昌市|yichang|yc', '宜宾市|yibin|yb', '盐城市|yancheng|yc', '延吉市|yanji|yj', '玉树市|yushu|ys', '伊宁市|yining|yn', '珠海市|zhuhai|zh', '昭通市|zhaotong|zt',
        '张家界市|zhangjiajie|zjj', '舟山市|zhoushan|zs', '郑州市|zhengzhou|zz', '中卫市|zhongwei|zw', '芷江市|zhijiang|zj', '湛江市|zhanjiang|zj'
    ];
    var regEx = /^([\u4E00-\u9FA5\uf900-\ufa2d]+)\|(\w+)\|(\w)\w*$/i, // 匹配汉字，拼音
        regExChiese = /([\u4E00-\u9FA5\uf900-\ufa2d]+)/, // 只匹配拼音
        reg_ah = /^[a-h]$/i, // 匹配首字母为 a-h
        reg_ip = /^[i-p]/i, // 匹配首字母为 i-p
        reg_qz = /^[q-z]/i; // 匹配首字母为 q-z

    //构建城市分类字面量
    var city = {
        hot: {},
        ABCDEFGH: {},
        IJKLMNOP: {},
        QRSTUVWXYZ: {}
    };

    //城市按首字母分类，填充到分类字面量
    (function() {
        for (var i = 0, len = allCities.length; i < len; i++) {
            var part = regEx.exec(allCities[i]),
                en = part[1], //中文名
                letter = part[2], //拼音
                spletter = part[3], //拼音简写
                first = letter[0].toUpperCase(), //拼音首字母
                ltPart; //当前字母下的城市

            if (reg_ah.test(first)) {
                ltPart = 'ABCDEFGH';
            } else if (reg_ip.test(first)) {
                ltPart = 'IJKLMNOP';
            } else if (reg_qz.test(first)) {
                ltPart = 'QRSTUVWXYZ';
            }

            city[ltPart][first] ? city[ltPart][first].push(en) : (city[ltPart][first] = [], city[ltPart][first].push(en));

            //设置前16个城市为热门城市
            if (i < 16) {
                city.hot['hot'] ? city.hot['hot'].push(part[1]) : (city.hot['hot'] = [], city.hot['hot'].push(part[1]));
            }
        }
    })();

    var KuCity = function(target) {
        this.target = target; // 输入框
        this.container = null; //插件容器
        this.resultct = null; //搜索结果容器
        this.isKeyslect = false; //是否在用上下键选择
        this.isContainerExit = false; // 插件容器是否已存在
    };

    KuCity.prototype = {
        constructor: KuCity,
        //初始化
        init: function() {
            this.creatItem();
            this.tabChange();
            this.citySelect();
            this.inputSearch();
            this.keySelect();
            this.stopPropagation();
        },
        //创建市列表
        creatItem: function() {
            if(this.isContainerExit) return;
            var template = '<div class="kucity"><div class="citybox"><h3 class="kucity_header">热门城市(支持汉字/拼音搜索)</h3><ul class="kucity_nav"><li class="active">热门城市</li><li>ABCDEFGH</li><li>IJKLMNOP</li><li>QRSTUVWXYZ</li></ul><div class="kucity_body"></div></div><ul class="result"></ul></div>';
            $('body').append(template);

            this.container = $('.kucity');
            this.resultct = $('.result');

            for (var group in city) {
                var itemKey = [];

                for (var item in city[group]) {
                    itemKey.push(item);
                }
                itemKey.sort();
                var itembox = $('<div class="kucity_item">');
                itembox.addClass(group);

                for (var i = 0, iLen = itemKey.length; i < iLen; i++) {

                    var dl = $('<dl>'),
                        dt = '<dt>' + (itemKey[i] == 'hot' ? '' : itemKey[i]) + '</dt>',
                        dd = $('<dd>'),
                        str = '';

                    for (var j = 0, jLen = city[group][itemKey[i]].length; j < jLen; j++) {
                        str += '<span>' + city[group][itemKey[i]][j] + '</span>'
                    }

                    dd.append(str);
                    dl.append(dt).append(dd);
                    itembox.append(dl);
                }
                $('.kucity_body').append(itembox);
                this.container.find('.hot').addClass('active');
            }
            this.isContainerExit = true;
        },
        //创建搜索结果列表
        creatResult: function(re, value) {
            var result = re.result,
                len = result.length,
                str = '';
            if (!!len) {
                for (var i = 0; i < len; i++) {
                    str += '<li><span class="name">' + result[i].cityName + '</span><span class="letter">' + result[i].py + '</span></li>'
                }
                this.container.find('.result').html('').html(str).find('li').eq(0).addClass('active');
            } else {
                this.container.find('.result').html('<li>没有找到<span class="noresult">' + value + '</span>相关信息</li>');
            }
        },
        //列表切换
        tabChange: function() {
            $('.kucity_nav').on('click', 'li', function(e) {
                var current = $(e.target),
                    index = current.index();

                current.addClass('active').siblings().removeClass('active');
                $('.kucity_item').eq(index).addClass('active').siblings().removeClass('active');
                $(' .kucity_body').scrollTop(0);

            })
        },
        //城市选择
        citySelect: function() {
            var self = this;
            $('.kucity_item dd').on('click', 'span', function(e) {
                self.target.val(($(e.target).text()));
            	this.changeCity = self.target.val()
            	atCity.innerHTML = this.changeCity;
            	setCookie("change",this.changeCity);
//          	console.log(getCookie("change"))
                self.container.hide();
                setTimeout("location.reload()",0);
            })
        },
        //上下键选择搜索结果
        keySelect: function() {
            var self = this;
            this.target.on('keydown', function(e){
                var current = self.resultct.find('.active').index();
                if(current !== -1){
                    switch(e.keyCode){
                        //上
                        case 38: 
                            keyActive(false);
                            break;
                        //下
                        case 40:
                            keyActive(true);
                            break;
                        //确定
                        case 13: 
                            self.isKeyslect = false;
                            self.target.val(self.resultct.find('.active .name').text());
                            self.triggleShow('all');
                            self.target.blur();
                            break;
                        default: 
                            self.isKeyslect = false;
                            break;
                    }

                    function keyActive(isInorder) {
                        var max = self.resultct.find('li').length - 1;
                        if(isInorder){
                            current = current == max ? 0 : current + 1;
                        }else{
                            current = current == 0 ? max : current - 1;
                        }
                        self.resultct.find('li').eq(current).addClass('active').siblings().removeClass('active');
                        self.isKeyslect = true;
                    }
                }
            })
        },
        //搜索
        inputSearch: function() {
            var self = this;
            this.target.on('keyup', function(e) {
                if(!self.isKeyslect){
//                  self.throttle(search, this);
                }
            })
            // 输入框搜索
//          function search(e) {
//              var container = self.container;
//              self.triggleShow(false);
//              var value = $(this).val();
//              if (value) {
//                  var url = 'https://sjipiao.alitrip.com/city_search.do?_ksTS=1439362066383_11337&lines=10&_input_charset=utf-8&needProvince=true&q=' + value;
//                  $.ajax({
//                      url: url,
//                      type: 'get',
//                      dataType: 'jsonp'
//                  }).done(function(re) {
//                      self.creatResult(re, value);
//                  })
//              } else {
//                  self.triggleShow(true);
//              }
//          }
        },
        //列表，结果，整体 显示切换
        triggleShow: function(open) {
            var container = this.container;
            if (open === 'all') {
                container.hide()
            } else if (open) {
                container.find('.citybox').show().end().find('.result').hide();
            } else {
                container.find('.citybox').hide().end().find('.result').show();
            }
        },
        //函数节流
        throttle: function(fn, context) {
            clearTimeout(fn.tId);
            fn.tId = setTimeout(function(){
                fn.call(context);
            }, 100)
        },
        //阻止事件冒泡
        stopPropagation: function() {
            var self = this;
            //阻止事件冒泡
            this.container.on('click', stopPropagation);
            this.target.on('click', stopPropagation);
            //页面点击 隐藏
            $(document).on('click', function() {
                self.container.hide();
            })
            function stopPropagation(e) {
                e.stopPropagation();
            }
        }
    };

    var kucity = null;
    $.fn.kuCity = function(options) {
        var target = $(this);
        target.on('focus', function(e) {
            var top = $(this).offset().top + $(this).outerHeight(),
                left = $(this).offset().left;
            kucity = kucity ? kucity : new KuCity(target);
            kucity.target = $(e.target);
            kucity.init();
            kucity.container.show().offset({
                'top': top + 7,
                'left': left
            });
            kucity.triggleShow(true);
            kucity.resultct.on('click', 'li', function() {
                kucity.target.val($(this).find('.name').text());
                kucity.triggleShow('all');
            })
        })
        return this;
    };
})(jQuery)
