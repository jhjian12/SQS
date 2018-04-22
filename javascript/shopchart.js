var user;
$(document).ready(function(){
	$.ajax({
            url:'../model/user/shop/controller.php?act=getuser',
            type: 'GET',
            async:false,
            success:function(r){
            	console.log(r);
                user=r;
            },
            error:function(err){
                console.log(err);
            }
    });
    //轉回php可砍
    $("#draw1_button").click(function(){
        var test = document.getElementById('test');
        for(var i=0;i<7;i++){
            $("#link"+(i+1)).hide();
            $("#draw"+(i+1)).hide();
        }
        $("#link1").show();
        $("#draw1").show();
        var draw1_button = document.getElementById('draw1_button').innerHTML;
        test.innerHTML=draw1_button;
    });
    var select = document.getElementById('select2');
    var item2=[];
    var itemid=[];
    var obj1={};
    obj1.act="showQuestionList";
    var obj2={};
    obj2.shop=user;
    var arr=[];
    arr.push(obj1);
    arr.push(obj2);
    //console.log(JSON.stringify(arr));
    $.ajax({
        url:'../model/Questionnaire/controller.php',
        data:JSON.stringify(arr),
        // contentType:"application/json",
        type:'POST',
        async:false,
        success: function(result) {
            var obj = eval (result);
            //console.log(obj);
            if(obj[0]['status']==200){
                for(var i=1;i<obj.length;i++){
                    item2.push(obj[i]['item']);
                    itemid.push(obj[i]['qid']);
                }
            }
            if(obj[0]['status']==400)
                alert("Fail!");
            if(obj[0]['status']==500)
                alert("Server Error");
            
        },
        error: function(err) {
            console.log('shit!');
            console.log(err);
        }
    });
    for(var i=0;i<item2.length;i++){
        var opt = document.createElement('option');
        opt.setAttribute("id",itemid[i]);
        opt.setAttribute("value",itemid[i]);
        opt.innerHTML=item2[i];
        select.appendChild(opt);
    }
    testsel();
    $("#draw2_button").click(function(){
        var test = document.getElementById('test');
        for(var i=0;i<7;i++){
            $("#link"+(i+1)).hide();
            $("#draw"+(i+1)).hide();
        }
        $("#link2").show();
        $("#draw2").show();
        var draw2_button = document.getElementById('draw2_button').innerHTML;
        test.innerHTML=draw2_button;
    });
    var nowdate = new Date();
    var nowyear = nowdate.getFullYear();
    var select_year=document.getElementById("select_year2");
    for(var i=2016; i<nowyear+1;i++){            //簽約時間開始算起
        var option_year=document.createElement("option");
        select_year.appendChild(option_year);
        option_year.setAttribute("id","year"+i);
        option_year.setAttribute("name","year");
        option_year.setAttribute("value",i);
        option_year.innerHTML=i+"年";
    }
    show2();
    $("#draw3_button").click(function(){
        var test = document.getElementById('test');
        for(var i=0;i<7;i++){
            $("#link"+(i+1)).hide();
            $("#draw"+(i+1)).hide();
        }
        $("#link3").show();
        $("#draw3").show();
        var draw3_button = document.getElementById('draw3_button').innerHTML;
        test.innerHTML=draw3_button;
    });
    var Today = new Date;
    var ThisYear = Today.getFullYear();
    for(var i=2015; i<=ThisYear; i++){
        $("#year").append("<option value='"+i+"'>"+i+'年'+"</option>");
    }
    var type = $("#type").val();
    getTypeValue(type);

    $("#type").change(function(){
        getTypeValue($("#type").val());
    });
    makechart();
    
    /*var form = document.forms["form3"];
    $("#form3 select").change(function(){
        var data=[];
        var act = {};
        act.act = "getEverySomeDayData";
        var obj = {};
        obj.year = $("#year").val();
        obj.day = $("#day").val();
        obj.type = $("#type").val();
        obj.typeValue = $("#typeValue").val();
        //要放店家
        obj.shop="nancyshop";
        data.push(act);
        data.push(obj);
        //console.log(JSON.stringify(data));
        makechart(data);
    })*/
    $("#draw4_button").click(function(){
        var test = document.getElementById('test');
        for(var i=0;i<7;i++){
            $("#link"+(i+1)).hide();
            $("#draw"+(i+1)).hide();
        }
        $("#link4").show();
        $("#draw4").show();
        var draw4_button = document.getElementById('draw4_button').innerHTML;
        test.innerHTML=draw4_button;
    });
	start();
    data_draw4();
    $("#draw5_button").click(function(){
        var test = document.getElementById('test');
        for(var i=0;i<7;i++){
            $("#link"+(i+1)).hide();
            $("#draw"+(i+1)).hide();
        }
        $("#link5").show();
        $("#draw5").show();
        var draw5_button = document.getElementById('draw5_button').innerHTML;
        test.innerHTML=draw5_button;
    });
    year();
    choose5();
    $("#draw6_button").click(function(){
        var test = document.getElementById('test');
        for(var i=0;i<7;i++){
            $("#link"+(i+1)).hide();
            $("#draw"+(i+1)).hide();
        }
        $("#link6").show();
        $("#draw6").show();
        var draw6_button = document.getElementById('draw6_button').innerHTML;
        test.innerHTML=draw6_button;
    });
    var nowdate = new Date();
    var nowyear = nowdate.getFullYear();
    var select_year=document.getElementById("select_year6");
    for(var i=2015; i<nowyear+1;i++){            //i為簽約時間
        var option_year=document.createElement("option");
        select_year.appendChild(option_year);
        option_year.setAttribute("id","year"+i);
        option_year.setAttribute("name","year");
        option_year.setAttribute("value",i);
        option_year.innerHTML=i+"年";
    }
    show6();
});
function start(){
	datelist();
	list_qitem();
}
function datelist(){
	var d = new Date();
	var year = d.getFullYear();
	$("#year4").append($("<option></option>").attr("value","").text("歷史資料"));
	for(var i = 2015; i < year+1; i++){
	  $("#year4").append($("<option></option>").attr("value",i).text(i));
  	}
  	$("#month4").append($("<option></option>").attr("value","").text("歷史資料"));
  	for(var j = 1; j < 13; j++){
	  $("#month4").append($("<option></option>").attr("value",j).text(j));
  	}
	$('#year4')[0].selectedIndex = 1;
	$('#month4')[0].selectedIndex = 1;
}
function list_qitem(){//列出問題
    $.ajax({
            url:'../model/Question/controller.php?act=showQuestionList',
            type: 'GET',
            async:false,
            success:function(result){
                    var table = $('<table border="1"></table>');
                    var object = eval(result);
                    for(var i = 1;i<object.length;i++){
                            //var td = $('<td></td>').text();
                            $("#question4").append($("<option></option>").attr("value",object[i].item).text(object[i].item));
                    }
            },
            error:function(err){
                console.log(err);
            }
    });
}
function data_draw4(){
    var d = new Date();
    var now_year = d.getFullYear()
    var getyear = document.form4.year4.value;
    var getmonth = document.form4.month4.value;
    //console.log(getmonth);
    var result=[{"act":"getAverageScore"}];
    var result2=[{"act":"getAverageScore"}];
    var form = document.forms["form4"];
    var data = {};
    var data2 = {};
    var shop = user;
    var year = getyear;
    var month = getmonth;
    var question = form4.elements.question4.value;
    var exp = "exp_score";
    var feel = "feel_score";
    // data.shop = shop;
    // data.year = year;
    // data.month = month;
    // data.question = question;
    // data.scoretype = exp;
    result.push(data);
    //console.log(JSON.stringify(result));
    if(!(getyear||getmonth)){
        alert("其中一項必填");
    }else if((getyear!=null)&&(getmonth=="")){
        // alert("1"+getyear+getmonth);
	    data.shop = shop;
	    data.year = year;
	    data.month = month;
	    data.question = question;
	    data.scoretype = exp;
	    result.push(data);
	    //console.log(JSON.stringify(result));
	    var result_tmp;
        $.ajax({
                url:'../model/Questionnaire/controller.php',
                type: 'POST',
                contentType:"application/json",
                async:false,
                data:JSON.stringify(result),
                success:function(r){
                        var result=JSON.parse(r);
                        //console.error(result);
                        if(result[0]['status']==200){
                            // alert("success");
                            //console.log(result);
                            //var days = new Date(getyear,getmonth,0).getDate();
                            result_tmp = result;
                        }
                },
                error:function(err){
                    console.log(err);
                }
        });
        //console.log(result_tmp);
	    data2.shop = shop;
	    data2.year = year;
	    data2.month = month;
	    data2.question = question;
	    data2.scoretype = feel;
	    result2.push(data2);
        $.ajax({
                url:'../model/Questionnaire/controller.php',
                type: 'POST',
                contentType:"application/json",
                async:false,
                data:JSON.stringify(result2),
                success:function(r){
                        var result=JSON.parse(r);
                        //console.error(result);
                        if(result[0]['status']==200){
                            // alert("success");
                            //console.log(result);
                            //var days = new Date(getyear,getmonth,0).getDate();
						    var s_value=[];
						    var data_obj = {};
						    var score_index=[];
						    for(var i = 1;i <= 12;i++){
						        if(result_tmp[i]==null){
						            var value = 0;
						        }else{
						            var value = result_tmp[i]['score'];
						        }
						        var num = parseInt(value);
						        score_index.push(num);

						    }
						    data_obj.name = "期望分數";
						    data_obj.data = score_index;
						    data_obj.color = "red";
						    s_value.push(data_obj);
						    var data_obj2 = {};
						    var score_index2 = [];
						    for(var i = 1;i <= 12;i++){
						        if(result[i]==null){
						            var value = 0;
						        }else{
						            var value = result[i]['score'];
						        }
						        var num = parseInt(value);
						        score_index2.push(num);

						    }
						    data_obj2.name = "實際分數";
						    data_obj2.data = score_index2;
						    data_obj2.color = "green";
						    s_value.push(data_obj2);
						   // console.log(JSON.stringify(s_value));
						    Highcharts.chart('container4', {
						    title: {
						        text: '每月問項期望與實際平均分數折線圖'
						    },
						    // subtitle: {
						    //     text: 'Source: thesolarfoundation.com'
						    // },

						    yAxis: {
						        title: {
						            text: 'average score'
						        }
						    },
						    xAxis: {
						        title: {
						            text: 'month'
						        },
						        tickInterval:1
						    },
							credits:{
  							  enabled:false
   							 },
						    legend: {
						        layout: 'vertical',
						        align: 'right',
						        verticalAlign: 'middle'
						    },

						    plotOptions: {
						        series: {
						            pointStart: 1
						        }
						    },

						    series:s_value

						     });
                        }
                },
                error:function(err){
                    console.log(err);
                }
        });
    }else if((getyear=="")&&(getmonth!=null)){
	    data.shop = shop;
	    data.year = year;
	    data.month = month;
	    data.question = question;
	    data.scoretype = exp;
	    result.push(data);
	    var result_tmp;
        $.ajax({
                url:'../model/Questionnaire/controller.php',
                type: 'POST',
                contentType:"application/json",
                async:false,
                data:JSON.stringify(result),
                success:function(r){
                        var result=JSON.parse(r);
                        //console.error(result);
                        if(result[0]['status']==200){
                            //alert("success");
                            result_tmp = result;
                        }   
                },
                error:function(err){
                    console.log(err);
                }
        });
	    data2.shop = shop;
	    data2.year = year;
	    data2.month = month;
	    data2.question = question;
	    data2.scoretype = feel;
	    result2.push(data2);
        $.ajax({
        	url:'../model/Questionnaire/controller.php',
        	type: 'POST',
        	contentType:"application/json",
        	async:false,
        	data:JSON.stringify(result2),
       		success:function(r){
                var result=JSON.parse(r);
                if(result[0]['status']==200){
                    //alert("success");
                    //console.log(result);
    				//var days = new Date(getyear,getmonth,0).getDate();
				    var s_value=[];
				    var data_obj = {};
				    var score_index=[];
				    for(var i = 1;i < result_tmp.length;i++){
				        if(result_tmp[i]==null){
				            var value = 0;
				        }else{
				            var value = result_tmp[i]['score'];
				        }
				        var num = parseInt(value);
				        score_index.push(num);

				    }
				    data_obj.name = "期望分數";
				    data_obj.data = score_index;
				    data_obj.color = "red";
				    s_value.push(data_obj);
				    var data_obj2 = {};
				    var score_index2=[];
				    for(var i = 1;i < result.length;i++){
				        if(result[i]==null){
				            var value = 0;
				        }else{
				            var value = result[i]['score'];
				        }
				        var num = parseInt(value);
				        score_index2.push(num);

				    }
				    data_obj2.name = "實際分數";
				    data_obj2.data = score_index2;
				    data_obj2.color = "green";
				    s_value.push(data_obj2);
				    Highcharts.chart('container4', {
				    title: {
				        text: '月份歷年問項期望與實際平均分數折線圖'
				    },
				    // subtitle: {
				    //     text: 'Source: thesolarfoundation.com'
				    // },

				    yAxis: {
				        title: {
				            text: 'average score'
				        }
				    },
				    xAxis: {
				        title: {
				            text: 'year'
				        },
				        tickInterval:1
				    },
				    credits:{
  						enabled:false
   					},
				    legend: {
				        layout: 'vertical',
				        align: 'right',
				        verticalAlign: 'middle'
				    },
				    plotOptions: {
				        series: {
				            pointStart: 2015
				        }
				    },
				    series:s_value
				     });
                }   
        	},
        	error:function(err){
           		console.log(err);
        	}
		});
    }else{
	    data.shop = shop;
	    data.year = year;
	    data.month = month;
	    data.question = question;
	    data.scoretype = exp;
	    result.push(data);
	    var result_tmp;
        $.ajax({
                url:'../model/Questionnaire/controller.php',
                type: 'POST',
                contentType:"application/json",
                async:false,
                data:JSON.stringify(result),
                success:function(r){
                        var result=JSON.parse(r);
                        if(result[0]['status']==200){
                            //alert("success");
                            var days = new Date(getyear,getmonth,0).getDate();
                            result_tmp = result;
                        }else if(result[0]['status']==400){
                            alert("查無資料");
                            document.getElementById('container4').innerHTML="";
                        }   
                },
                error:function(err){
                    console.log(err);
                }
        });
	    data2.shop = shop;
	    data2.year = year;
	    data2.month = month;
	    data2.question = question;
	    data2.scoretype = feel;
	    result2.push(data2);
        $.ajax({
                url:'../model/Questionnaire/controller.php',
                type: 'POST',
                contentType:"application/json",
                async:false,
                data:JSON.stringify(result2),
                success:function(r){
                        var result=JSON.parse(r);
                        if(result[0]['status']==200){
                            //alert("success");
                            var days = new Date(getyear,getmonth,0).getDate();
						    var s_value=[];
						    var data_obj = {};
						    var score_index=[];
						    for(var i=1; i<=days; i++){
						        score_index.push(0);
						    }
						    for(var i=1; i<result_tmp.length; i++){
						        score_index[result_tmp[i].date-1]=Number(result_tmp[i].score);
						    }
						    data_obj.name = "期望分數";
						    data_obj.data = score_index;
						    data_obj.color = "red";
						    s_value.push(data_obj);
						    var data_obj2 = {};
						    var score_index2=[];
						    for(var i=1; i<=days; i++){
						        score_index2.push(0);
						    }
						    for(var i=1; i<result.length; i++){
						        score_index2[result[i].date-1]=Number(result[i].score);
						    }
						    data_obj2.name = "實際分數";
						    data_obj2.data = score_index2;
						    data_obj2.color = "green";
						    s_value.push(data_obj2);

						    Highcharts.chart('container4', {
						    title: {
						        text: '當月每天問項期望與實際平均分數折線圖'
						    },
						    // subtitle: {
						    //     text: 'Source: thesolarfoundation.com'
						    // },

						    yAxis: {
						        title: {
						            text: 'average score'
						        },
						        tickInterval:0.1
						    },
						    xAxis: {
						        title: {
						            text: 'day'
						        },
						        tickInterval:1
						    },
						    credits:{
  							    enabled:false
   							},
						    legend: {
						        layout: 'vertical',
						        align: 'right',
						        verticalAlign: 'middle'
						    },

						    plotOptions: {
						        series: {
						            pointStart: 1
						        }
						    },
						    series:s_value
						     });
                        }else if(result[0]['status']==400){
                            //alert("查無資料");
                        }   
                },
                error:function(err){
                    console.log(err);
                }
        });
    }
}
function year(){
    var select = document.getElementById('select5');
    var day = new Date();
    var year = day.getFullYear();
    //console.log(day);
    for(var i=2016; i<=year; i++){
        var opt=document.createElement('option');
        opt.setAttribute("value",i);
        opt.setAttribute("id",i);
        opt.setAttribute("name",i);
        opt.innerHTML=i+'年';
        select.appendChild(opt);
    }
}
function choose5(){
    a = document.form5.sel5.value;
    year = document.form5.select5.value;
    var obj={};
    obj.act="getPeopleNumberbyShop";
    var obj2={};
    obj2.shop=user;
    obj2.year=year;
    obj2.month="";
    obj2.type=a;
    var arr=[];
    arr.push(obj);
    arr.push(obj2);
    $.ajax({
        url:'../model/Questionnaire/controller.php',
        data:JSON.stringify(arr),
        type:'POST',
        async:false,
        success:function(result){
            var obj = eval (result);
            // console.log("後端資料");
            // console.log(obj[1]);
            var resultarr = [];
            var result =[];
            /*debug*/
            var alltype = [];
            for(i=0;i<obj[1].length;i++){
                for(j=0;j<obj[1][i].data.length;j++){
                    check=0;
                    for(k=-1;k<alltype.length;k++){
                        if(alltype[k+1]==obj[1][i].data[j].型態){
                            check=1;
                            break;
                        }
                    }
                    if(check==0){
                        alltype.push(obj[1][i].data[j].型態);
                    }
                }
            }
            var printarr = [];
            for(i=0;i<alltype.length;i++){
                printarr[i]=[];
                var title={}
                title.type=alltype[i];
                title.drilldown=2017;
                // title.sum=50;
                printarr[i].push(title);
            }
            for(i=0;i<obj[1].length;i++){
                for(j=0;j<printarr.length;j++){
                    for(k=0;k<obj[1][i].data.length;k++){
                        if(obj[1][i].data[k].型態==printarr[j][0].type){
                            tmparr = [];
                            date=obj[1][i].date+"月";
                            tmparr.push(date);
                            tmparr.push(parseInt(obj[1][i].data[k].count));
                            printarr[j][obj[1][i].date]=(tmparr);
                        }
                    }
                }
            }
            for(i=0;i<printarr.length;i++){
                index = Object.keys(printarr[i]);
                sum=0;
                for(j=0;j<index.length;j++){
                    if(index[j]!='0'){
                        sum+=printarr[i][index[j]][1];
                    }
                    if(index[j]=='all'){
                        printarr[i][1]=printarr[i]['all'];
                        delete printarr[i]['all'];
                    }
                }
                printarr[i][0].sum=sum;
            }
            if(obj[1][0].date!="all"){
                for(i=0;i<printarr.length;i++){
                    for(j=1;j<=12;j++){
                        if(typeof printarr[i][j] =="undefined"){
                            printarr[i][j]=[];
                            printarr[i][j].push(j+"月");
                            printarr[i][j].push(0);
                            // console.log(printarr[i][j]);
                        }
                    }
                }
            }
            // console.log(printarr);
            draw5(printarr);
        },
        error: function(err) {
            console.log('error!');
            console.log(err);
        }
    });
}
function draw5(data){
    // console.log(data[0][0]);
    var test2 = data;
    // console.log(test2);
    var dataToShow = [];
    var alldrilldown =[];
    for(var i=0; i<data.length; i++){
        var drilldown ={};
        drilldown.name=(data[i][0].type).toString();
        drilldown.id=(data[i][0].type).toString();
        drilldown.data=[];
        for(var j=1; j<data[i].length; j++){
            drilldown.data.push(data[i][j]);
        }
        var onedata = {};
        onedata.name=data[i][0].type;
        onedata.y=data[i][0].sum;
        onedata.drilldown=(data[i][0].type).toString();
        dataToShow.push(onedata);
        alldrilldown.push(drilldown);
    }
    //console.log(alldrilldown);
    Highcharts.chart('container5', {
        chart: {
            type: 'column'
        },
        title: {
            text: '各時段來客屬性分布圖'
        },
        subtitle: {
            text: '按圖形看詳細數據.'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: '數量'
            }
        },
        legend: {
            enabled: false
        },
        credits:{
            enabled:false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                }
            }
        },
        series: [{
            name: '人數',
            colorByPoint: true,
            data: dataToShow
        }]
        ,
        drilldown: {
            series:alldrilldown
        }
    });
}
function show6(){
    //console.error(document.form6);
    var  data=document.form6.select_type.value;
    var  data_second=document.form6.select_secondtype.value;
    var  data_year=document.form6.select_year6.value;
    var  data_month=document.form6.select_month6.value;
    //console.log(data_month);
    var array=[];
    var obj={};
    var obj2={};
    obj.act="getPeopleInfobyShop";
    obj2.shop=user;
    obj2.year=data_year;
    obj2.month=data_month;
    obj2.type=data;
    obj2.secondType=data_second;
    array.push(obj);
    array.push(obj2);
    //console.log(JSON.stringify(array));
    
    //console.log(test);
    $.ajax({
        url:'../model/Questionnaire/controller.php',
        data:JSON.stringify(array),
        type: 'POST',
        async:false,
        success: function(result) {
            var obj=eval(result); 
            if(obj[0]['status'] == 200){
                //console.log(result);
                var totalnum=0;
                var totalshop=0;
                var series_title=[];
                var series_text={};
                var data_title=[];
                var data_text={};
                for(var i =1;i<obj.length;i++){
                    for(var j =0;j<obj[i]['data'].length;j++){
                        totalnum+=parseFloat(obj[i]['data'][j]['數值']);
                    }
                }
                for(var i =1;i<obj.length;i++){
                    for(var j =0;j<obj[i]['data'].length;j++){
                        totalshop+=parseFloat(obj[i]['data'][j]['數值']);
                    }
                    data_text.drilldown=obj[i]['title'];
                    data_text.name=obj[i]['title'];
                    data_text.y=parseFloat(totalshop/totalnum)*100;
                    data_text.x=parseFloat(totalshop);
                    data_title.push(data_text);
                    totalshop=0;
                    data_text={};
                }
                series_text.name='第一分類';
                series_text.colorBypoint=true;
                series_text.data=data_title;
                series_title.push(series_text);
                //console.log(data_title);
                
                var series_drilldown_title=[];
                var series_drilldown_text={};
                var data_drilldown_title=[];
                var data_drilldown_text={};
                //series_drilldown_text.data=[];
                for(var i =1;i<obj.length;i++){
                    for(var j =0;j<obj[i]['data'].length;j++)
                        totalshop+=parseFloat(obj[i]['data'][j]['數值']);
                    for(var j =0;j<obj[i]['data'].length;j++){
                        data_drilldown_text.name=obj[i]['data'][j]['型態'];
                        data_drilldown_text.y=parseFloat(obj[i]['data'][j]['數值']/totalshop)*100;
                        data_drilldown_text.x=parseFloat(obj[i]['data'][j]['數值']);
                        data_drilldown_title.push(data_drilldown_text);
                        data_drilldown_text={};
                        
                    }
                    totalshop=0;
                    series_drilldown_text.name=obj[i]['title'];
                    series_drilldown_text.id=obj[i]['title'];
                    series_drilldown_text.data=data_drilldown_title;
                    series_drilldown_title.push(series_drilldown_text);
                    //console.log(data_drilldown_title);
                    data_drilldown_title=[];
                    series_drilldown_text={};
                }
                //console.log(series_drilldown_title);
                Highcharts.chart('container6', {
                    chart: {
                        type: 'pie',
                    },
                    title: {
                        text: '基本資料之比例(所有來店(填問卷)人數:'+totalnum+'人)'
                    },
                    subtitle: {
                        text: '請選擇欲了解之基本資料，再點選圖形查看詳情'
                    },
                    plotOptions: {
                        series: {
                            dataLabels: {
                                enabled: true,
                                format: '{point.name}: {point.y:.2f}%'
                            }
                        }
                    },
                    credits:{
                        enabled: false
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.x:.0f}</b> 人<br/>'
                    },
                    series: series_title,
                    drilldown: {
                        series: series_drilldown_title
                    }
                });
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
}
function testsel(){
    qid = document.form.select2.value;
    type = document.form.select.value;
    var chartobj={};
    chartobj.act="getAverageScoreByData";
    var chartobj2={};
    chartobj2.qid = qid;
    chartobj2.type = type;
    chartobj2.shop = user;
    var arr=[];
    arr.push(chartobj);
    arr.push(chartobj2);
    //console.log(JSON.stringify(arr));
    $.ajax({
        url:'../model/Questionnaire/controller.php',
        data:JSON.stringify(arr),
        // contentType:"application/json",
        type:'POST',
        async:false,
        success: function(result) {
            var obj = eval (result);
            //console.log(obj);
            if(obj[0]['status']==200){
                ary=new Array();
                for(x in obj[2])
                    ary[ary.length]=x;
                var a=[];
                var test=[];
                var scoreobj={}
                var scorearr=[];
                var scoreobj2={};
                var scorearr2=[];
                for(var i=1;i<obj.length;i++){                    
                    scorearr.push(parseFloat((parseInt(obj[i]['期望分數'] * 100 ))/100));
                    scorearr2.push(parseFloat((parseInt(obj[i]['感知分數'] * 100 ))/100));
                    a.push(obj[i][ary[0]]);
                }
                scoreobj.data=scorearr;
                scoreobj.name="期望分數";
                scoreobj2.data=scorearr2;
                scoreobj2.name="感知分數";
                test.push(scoreobj);
                test.push(scoreobj2);
                //console.log(test);
                //console.log(a);
                Highcharts.chart('container1', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: '此問項的期望&感知分數(依基本資料分類)'
                    },
                    credits:{
                        enabled: false
                    },
                    xAxis: {
                       categories:a
                    },
                    series: test
                    
                });
               
            }
            if(obj[0]['status']==400)
                alert("沒有資料喔!");
            if(obj[0]['status']==500)
                alert("Server Error");
            
        },
        error: function(err) {
            console.log('shit!');
            console.log(err);
        }
    });
}
function show2(){
    var data_year=document.form2.select_year2.value;
    var data_month=document.form2.select_month2.value;
    var array=[];
    var actobj={};
    var obj={};
    actobj.act='getDimensionScoreByShop';   
    obj.shop=user;  
    obj.year=data_year;  
    obj.month=data_month;  
    array.push(actobj);
    array.push(obj);
    //console.log(JSON.stringify(array));
    $.ajax({
        url:'../model/Questionnaire/controller.php',
        data:JSON.stringify(array),
        type: 'POST',
        async:false,
        success: function(result) {
            //console.log(result);
            var obj=eval(result); 
            if(obj[0]['status'] == 200){
                var data_expect=[];
                var data_perceived=[];
                var title_text=[];
                for(var i=1;i<obj.length;i++){
                    data_expect.push(parseFloat(obj[i]["期望分數"]));  //
                    data_perceived.push(parseFloat(obj[i]["感知分數"]));  //
                    title_text.push(obj[i]['dimension']);
                }
                if(data_month){
                    data_month=data_month+'月';
                }
                if(data_year){
                    data_year=data_year+'年';
                }
                //console.log(data_expect);
                //console.log(data_perceived);
                Highcharts.chart('container2', {
                    chart: {
                        polar: true,
                        type: 'line'
                    },

                    title: {
                        text: '本店:'+title_text+'之平均分數',
                        x: -80
                    },
                    subtitle: {
                        text: '在'+data_year+data_month+'期間'
                    },
                    pane: {
                        size: '80%'
                    },

                    xAxis: {
                        categories: title_text,
                        tickmarkPlacement: 'on',
                        lineWidth: 0
                    },

                    yAxis: {
                        gridLineInterpolation: 'polygon',
                        lineWidth: 0,
                        min: 0
                    },
                    credits:{
                        enabled: false
                    },
                    tooltip: {
                        shared: true,
                        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.3f}分/最高5分</b><br/>'
                    },

                    legend: {
                        align: 'right',
                        verticalAlign: 'top',
                        y: 70,
                        layout: 'vertical'
                    },

                    series:  [{
                        name: '期望分數',
                        data: data_expect,
                        pointPlacement: 'on'
                    }, {
                        name: '感知分數',
                        data:  data_perceived,
                        pointPlacement: 'on'
                    }]

                });
            
            }
            if(obj[0]['status']==400)
                alert("無資料");
            if(obj[0]['status']==500)
                alert("Server Error");
        },
        error: function(err) {
            console.log('err');
            console.log(err);
        }
    });
}
function makechart(){
    var data=[];
    var act = {};
    act.act = "getEverySomeDayData";
    var obj = {};
    obj.year = $("#year").val();
    obj.day = $("#day").val();
    obj.type = $("#type").val();
    obj.typeValue = $("#typeValue").val();
    //要放店家
    obj.shop=user;
    data.push(act);
    data.push(obj);
    $.ajax({
        url:'../model/Questionnaire/controller.php',
        type:'POST',
        data:JSON.stringify(data),
        async:false,
        success:function(r){
            //console.log("hello");
            //console.log(eval(r));
            var result = eval(r);
            var datearr=[];
            var pepolearr=[];
            for(var i=1; i<result.length; i++){
                datearr.push(result[i].日期);
                pepolearr.push(parseInt(result[i].人數));
            }
            draw(datearr,pepolearr);
        }
    })
}
/*function makechart(data){
    $.ajax({
        url:'../model/Questionnaire/controller.php',
        type:'POST',
        data:JSON.stringify(data),
        async:false,
        success:function(r){
            //console.log("hello");
            //console.log(eval(r));
            var result = eval(r);
            var datearr=[];
            var pepolearr=[];
            for(var i=1; i<result.length; i++){
                datearr.push(result[i].日期);
                pepolearr.push(parseInt(result[i].人數));
            }
            draw(datearr,pepolearr);
        }
    })
}*/
function getTypeValue(type){
    $("#typeValue").html("<select></select>");
    //獲取TYPEVALUE
    var data = [];
    var act = {};
    var obj = {};
    obj.title = type;
    act.act = "getAllType";
    data.push(act);
    data.push(obj);
    // console.error(JSON.stringify(data));
    $.ajax({
            url:'../model/Questionnaire/controller.php',
            type: 'POST',
            data:JSON.stringify(data),
            async:false,
            success:function(r){
                var result = eval(r);
                // console.error(result);
                for(var i =1; i<result.length; i++){
                    var title = Object.values(result[i])[0];
                    $("#typeValue").append("<option value='"+title+"'>"+title+"</option>");
                }
            },
            error:function(err){
                console.log(err);
            }
    });
}
function draw(date,pepole){
    var  year=document.form3.year.value;
    var  day=document.form3.day.value;
    var  type=document.form3.type.value;
    var  typeValue=document.form3.typeValue.value;
    if(day==1){
        day='一';
    } else if(day==2){
        day='二';
    } else if(day==3){
        day='三';
    } else if(day==4){
        day='四';
    } else if(day==5){
        day='五';
    } else if(day==6){
        day='六';
    } else {
        day='天';
    }
    Highcharts.chart('container3', {
    chart: {
        type: 'column'
    },
    title: {
        text: year+'年星期'+day+'的來店人數'
    },
    xAxis: {
        categories: date,
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: '來客人數'
        }
    },
    credits:{
        enabled: false
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.0f}人</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: year+'年各星期'+day,
        data: pepole
    },]
});
}
