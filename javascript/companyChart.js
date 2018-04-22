var user;
$(document).ready(function(){
    $.ajax({
            url:'../model/user/company/controller.php?act=getuser',
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
    var test = document.getElementById('test');
    $("#draw8_button").click(function(){
        
        for(var i=0;i<8;i++){
            $("#draw"+(i+1)).hide();
            $("#link"+(i+1)).hide();
            $("#draw"+(i+1)+"_button").show();
        }
        $("#link8").show();
        $("#draw8").show();
        var draw8_button = document.getElementById('draw8_button').innerHTML;
        test.innerHTML=draw8_button;
    });
    start8();
    testsel();
    var test = document.getElementById('test');
    $("#draw7_button").click(function(){
        
        for(var i=0;i<8;i++){
            $("#link"+(i+1)).hide();
            $("#draw"+(i+1)).hide();
            $("#draw"+(i+1)+"_button").show();
        }
        $("#link7").show();
        $("#draw7").show();
        var draw7_button = document.getElementById('draw7_button').innerHTML;
        test.innerHTML=draw7_button;
    });
    datelist();
    data_draw7();
    var test = document.getElementById('test');
    $("#draw6_button").click(function(){
        
        for(var i=0;i<8;i++){
            $("#link"+(i+1)).hide();
            $("#draw"+(i+1)).hide();
            $("#draw"+(i+1)+"_button").show();
        }
        $("#link6").show();
        $("#draw6").show();
        var draw6_button = document.getElementById('draw6_button').innerHTML;
        test.innerHTML=draw6_button;
    });
    datelist6();
    data_draw6();
    var test = document.getElementById('test');
    $("#draw5_button").click(function(){
        for(var i=0;i<8;i++){
            $("#link"+(i+1)).hide();
            $("#draw"+(i+1)).hide();
            $("#draw"+(i+1)+"_button").show();
        }
        $("#link5").show();
        $("#draw5").show();
        var draw5_button = document.getElementById('draw5_button').innerHTML;
        test.innerHTML=draw5_button;
    });
    var nowdate = new Date();
    var nowyear = nowdate.getFullYear();
    var select_year=document.getElementById("select_year");
    for(var i=2015; i<nowyear+1;i++){            //簽約時間開始算起
        var option_year=document.createElement("option");
        select_year.appendChild(option_year);
        option_year.setAttribute("id","year"+i);
        option_year.setAttribute("name","year");
        option_year.setAttribute("value",i);
        option_year.innerHTML=i+"年";
    }
    show();
    var test = document.getElementById('test');
    $("#draw4_button").click(function(){
        
        for(var i=0;i<8;i++){
            $("#link"+(i+1)).hide();
            $("#draw"+(i+1)).hide();
            $("#draw"+(i+1)+"_button").show();
        }
        $("#link4").show();
        $("#draw4").show();
        var draw4_button = document.getElementById('draw4_button').innerHTML;
        test.innerHTML=draw4_button;
    });
    var Today = new Date;
    var ThisYear = Today.getFullYear();
    for(var i=2015; i<=ThisYear; i++){
        $("#year").append("<option value='"+i+"'>"+i+"</option>");
    }
    var type = $("#type").val();
    $("#type").change(function(){
    });
    makechart();
    /*
    var form = document.forms["form4"];
    $("#form4 select").change(function(){
        var data=[];
        var act = {};
        act.act = "getAllShopData";
        var obj = {};
        obj.year = $("#year").val();
        obj.type = $("#type").val();
        //要放店家
        obj.company=user;
        data.push(act);
        data.push(obj);
        // console.log(JSON.stringify(data));
        makechart(data);
    })*/
});
function test(){
    //var str="company1";
    var obj={};
    obj.act="listShopByCompany";
    var obj2={};
    obj2.account="test";
    var arr=[];
    arr.push(obj);
    arr.push(obj2);
    return JSON.stringify(arr);
}
//擁有問項列出(test公司)
function start8(){
    var select = document.getElementById('select2');
    var item2=[];
    var itemid=[];
    var obj1={};
    obj1.act="showQuestionListByCompany";
    var obj2={};
    obj2.company=user;
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
            //console.log('shit!');
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
}
function testsel(){
    //列出總公司共有幾家分店(test公司)
    var shop=[];
    var shopcname=[];
    $.ajax({
        url:'../model/user/shop/controller.php',
        data:test(),
        // contentType:"application/json",
        type: 'POST',
        async:false,
        success: function(result) {
            var obj = eval (result);
            //console.log(obj);
            if(obj[0]['status']==200){     
                for(var i=1;i<obj.length;i++){
                    shop.push(obj[i]['account']);
                    shopcname.push(obj[i]['shopcname']);
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
    //問項id
    qid = document.form8.select2.value;
    //選取種類
    type = document.form8.select.value;
    var tmp=[];
    var category=[];
    //所有分店分數
    for(var i=0;i<shop.length;i++){
        var chartobj={};
        chartobj.act="getAverageScoreByData";
        var chartobj2={};
        chartobj2.qid = qid;
        chartobj2.type = type;
        //chartobj2.shop = "nancyshop";
        chartobj2.shop = shop[i];
        var arr=[];
        arr.push(chartobj);
        arr.push(chartobj2);
        $.ajax({
            url:'../model/Questionnaire/controller.php',
            data:JSON.stringify(arr),
            type:'POST',
            async:false,
            success: function(result) {
                var obj = eval (result);
                console.log(obj);
                if(obj[0]['status']==200){
                    ary=new Array();
                    for(x in obj[2])
                        ary[ary.length]=x;
                    var c=[];
                    for(var i=1;i<obj.length;i++){
                        c.push(obj[i][ary[0]]);
                    }
                    category.push(c);
                    tmp.push(obj);
                }
                if(obj[0]['status']==400)
                if(obj[0]['status']==500)
                    alert("Server Error");
            },
            error: function(err) {
                console.log('shit!');
                console.log(err);
            }
        });
    }
    var tmp3=[]
    var feeltmp2=[];
    var n=0;
    //資料格式整理
    for(var i=0;i<tmp.length;i++){
        var tmp2=[];
        var feeltmp=[];
        for(var j=1;j<tmp[i].length;j++){            
            tmp2.push(parseFloat((parseInt(tmp[i][j]['期望分數'] * 100 ))/100));
            feeltmp.push(parseFloat((parseInt(tmp[i][j]['感知分數'] * 100 ))/100));
        }
        tmp3.push(tmp2);
        feeltmp2.push(feeltmp);
        n=n+1;
    }
    if(n==0){
        alert('無資料');
    }   
    var scorearr=[];
    for(var a=0;a<category[1].length;a++){//互換
        var data={};
        var score1=[]
        for(var i=0;i<tmp3.length;i++){
            for(var j=0;j<tmp3[i].length;j++){
                if(j == a){
                    score1.push(tmp3[i][j]);
                }
            }
        }
        data.data=score1;
        data.name=category[1][a]+"期望分數";
        data.stack="期望分數";
        scorearr.push(data);
    }
    for(var a=0;a<category[1].length;a++){//互換
        var data={};
        var score1=[]
        for(var i=0;i<feeltmp2.length;i++){
            for(var j=0;j<feeltmp2[i].length;j++){
                if(j == a){
                    score1.push(feeltmp2[i][j]);
                }
            }
        }
        data.data=score1;
        data.name=category[1][a]+"感知分數";
        data.stack="感知分數";
        scorearr.push(data);
    }
    Highcharts.chart('container8', {
        chart: {
            type: 'column'
        },
        title: {
            text: '各分店間，此問項與基本資料的人數比例'
        },
        credits:{
            enabled:false
        },
        xAxis: {
           categories:shopcname
        },
        yAxis: {
            title: {
                text: '人數'
            }
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}分<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: scorearr
    });
}
function datelist(){
    var d = new Date();
    var year = d.getFullYear();
    $("#year7").append($("<option></option>").attr("value","").text("歷史資料(年)"));
    for(var i = 2015; i < year+1; i++){
      $("#year7").append($("<option></option>").attr("value",i).text(i));
    }
    $("#month7").append($("<option></option>").attr("value","").text("歷史資料(月)"));
    for(var j = 1; j < 13; j++){
      $("#month7").append($("<option></option>").attr("value",j).text(j));
    }
    $("#exp_real7").append($("<option></option>").attr("value","期望分數").text("期望分數"));
    $("#exp_real7").append($("<option></option>").attr("value","感知分數").text("感知分數"));
}//list year and date
function data_draw7(){
    var data_year = document.form7.year7.value;
    var data_month = document.form7.month7.value;
    var result=[{"act":"getQuestionScoreByCompany"}];
    var form = document.forms["form7"];
    var data = {};
    var company = user;
    data.company = user;
    data.year = data_year;
    data.month = data_month;
    // data.question = question;
    // data.scoretype = exp;
    result.push(data);
    //console.log(JSON.stringify(result));
    $.ajax({
        url:'../model/Questionnaire/controller.php',
        type: 'POST',
        contentType:"application/json",
        async:false,
        data:JSON.stringify(result),
        success:function(r){
                var result=JSON.parse(r);
                //console.error(result);
                var s_value=[];
                var categories_list=[];
                if(result[0]['status']==200){
                    //alert("success");
                    //console.log(result);
                    for(var a = 0; a < result[1]['data'].length;a++){
                        //console.log(result[1]['data'][a]['問項']);
                        categories_list.push(result[1]['data'][a]['問項']);
                    }
                    if(document.form7.exp_real7.value=="期望分數"){
                        for(var i = 1; i < result.length;i++){
                        var data_obj = {};
                        var score_index=[];
                        for(var j = 0; j < result[i]['data'].length;j++){
                            //console.log(result[i]['data'][j]['期望分數']);
                            var value = result[i]['data'][j]['期望分數'];
                            var num = parseInt(value);
                            score_index.push(num);
                        }
                        data_obj.name = result[i]['shop'];
                        data_obj.data = score_index;
                        s_value.push(data_obj);
                        
                    }
                    //console.log(categories_list);
                    if(data_month){
                        data_month=data_month+'月';
                    }
                    if(data_year){
                        data_year=data_year+'年';
                    }
                    Highcharts.chart('container7', {
                            title: {
                                text: '分店間問項期望平均分數折線圖'
                            },
                             subtitle: {
                                 text: '在'+data_year+data_month+'期間'
                             },
                            yAxis: {
                                title: {
                                    text: 'average score'
                                }
                            },
                            xAxis: {
                                title: {
                                    text: '問項'
                                },
                                categories: categories_list
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
                                    pointStart: 0
                                }
                            },

                            series:s_value

                             });
                        }else{
                            for(var i = 1; i < result.length;i++){
                                var data_obj = {};
                                var score_index=[];
                            for(var j = 0; j < result[i]['data'].length;j++){
                                //console.log(result[i]['data'][j]['感知分數']);
                                var value = result[i]['data'][j]['感知分數'];
                                var num = parseInt(value);
                                score_index.push(num);
                            }
                                data_obj.name = result[i]['shop'];
                                data_obj.data = score_index;
                                s_value.push(data_obj);
                            }
                            //console.log(categories_list);
                            if(data_month){
                                data_month=data_month+'月';
                            }
                            if(data_year){
                                data_year=data_year+'年';
                            }
                            Highcharts.chart('container7', {
                                title: {
                                    text: '分店間問項感知平均分數折線圖'
                                },
                                subtitle: {
                                    text: '在'+data_year+data_month+'期間'
                                },

                                yAxis: {
                                    title: {
                                        text: 'average score'
                                    }
                                },
                                xAxis: {
                                    title: {
                                        text: '問項'
                                    },
                                    categories: categories_list
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
                                        pointStart: 0
                                    }
                                },

                                series:s_value

                                 });
                        }
                    }  
                //}//if
                },
                error:function(err){
                    console.log(err);
        }
    });   
}
function datelist6(){
    var d = new Date();
    var year = d.getFullYear();
    $("#year6").append($("<option></option>").attr("value","").text("歷史資料(年)"));
    for(var i = 2015; i < year+1; i++){
      $("#year6").append($("<option></option>").attr("value",i).text(i));
    }
    $("#month6").append($("<option></option>").attr("value","").text("歷史資料(月)"));
    for(var j = 1; j < 13; j++){
      $("#month6").append($("<option></option>").attr("value",j).text(j));
    }
    $("#exp_real6").append($("<option></option>").attr("value","期望分數").text("期望分數"));
    $("#exp_real6").append($("<option></option>").attr("value","感知分數").text("感知分數"));
}//list year and date
function data_draw6(){
    var result = [{"act":"getDimensionScore"}];
    var data = {};
    var company = user;
    data.company = user;
    data_year = document.sel_date.year6.value;
    data.year = data_year;
    data_month = document.sel_date.month6.value;
    data.month = data_month;
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
                            //alert("抓取成功");
                            //console.log(result);
                            var s_value=[];
                            if(document.sel_date.exp_real6.value=="期望分數"){
                                for(var i = 1; i < result.length;i++){
                                    var data_obj = {};
                                    var score_index=[];
                                    var Dimension_text=[];
                                    for(var j = 0; j < result[i]['data'].length;j++){
                                        //console.log(result[i]['data'][j]['期望分數']);
                                        var value = result[i]['data'][j]['期望分數'];
                                        var Dimension=result[i]['data'][j]['dimension'];
                                        var num = parseFloat((parseInt(value * 100 ))/100);
                                        score_index.push(num);
                                        Dimension_text.push(Dimension);
                                    }
                                    data_obj.name = result[i]['shop'];
                                    data_obj.data = score_index;
                                    s_value.push(data_obj);
                                }
                                //console.log(s_value);
                                if(data_month){
                                    data_month=data_month+'月';
                                }
                                if(data_year){
                                    data_year=data_year+'年';
                                }
                                Highcharts.chart('container6', {
                                title: {
                                    text: '分店間構面期望平均分數折線圖'
                                },
                                subtitle: {
                                     text: '在'+data_year+data_month+'期間'
                                },
                                yAxis: {
                                    title: {
                                        text: 'average score'
                                    }
                                },
                                xAxis: {
                                    title: {
                                        text: '構面'
                                    },
                                    categories: Dimension_text,
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
                                        pointStart: 0
                                    }
                                },

                                series:s_value

                                 });
                            }else{
                                //console.log("choose what!!!!");
                                for(var i = 1; i < result.length;i++){
                                    var data_obj = {};
                                    var score_index=[];
                                    var Dimension_text=[];
                                    for(var j = 0; j < result[i]['data'].length;j++){
                                        //console.log(result[i]['data'][j]['感知分數']);
                                        var value = result[i]['data'][j]['感知分數'];
                                        var Dimension=result[i]['data'][j]['dimension'];
                                        var num = parseFloat((parseInt(value * 100 ))/100);
                                        score_index.push(num);
                                        Dimension_text.push(Dimension);
                                        
                                    }
                                    data_obj.name = result[i]['shop'];
                                    data_obj.data = score_index;
                                    s_value.push(data_obj);
                                }
                                //console.log(s_value);
                                if(data_month){
                                    data_month=data_month+'月';
                                }
                                if(data_year){
                                    data_year=data_year+'年';
                                }
                                Highcharts.chart('container6', {
                                title: {
                                    text: '分店間構面感知平均分數折線圖'
                                },
                                subtitle: {
                                    text: '在'+data_year+data_month+'期間'
                                },

                                yAxis: {
                                    title: {
                                        text: 'average score'
                                    }
                                },
                                xAxis: {
                                    title: {
                                        text: '構面'
                                    },
                                    categories: Dimension_text,
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
                                        pointStart: 0
                                    }
                                },

                                series:s_value

                                 });
                            }
                        }
                },
            error:function(err){
                    console.log(err);
                    console.log("fail");
            }
        });
}
function show(){
    var  data=document.form5.select_type.value;
    var  data_second=document.form5.select_secondtype.value;
    var  data_year=document.form5.select_year.value;
    var  data_month=document.form5.select_month.value;
    var array=[];
    var actobj={};
    var obj={};
    actobj.act='getPeopleInfobyCompany';  
    obj.Company=user;
    obj.year=data_year;
    obj.month=data_month;
    obj.type=data;  
    obj.secondType=data_second;  
    array.push(actobj);
    array.push(obj);
    //console.log(JSON.stringify(array));
    $.ajax({
        url:'../model/Questionnaire/controller.php',
        data:JSON.stringify(array),
        type: 'POST',
        async:false,
        success: function(result) {
            var obj=eval(result); 
            if(obj[0]['status'] == 200){
                //console.log(result);
                var totalnum_company=0;
                var totalnum_shop=0;
                //第一層 分店
                var series_title=[];
                var series_text={};
                var data_title=[];
                var data_text={};
                for(var i =1;i<obj.length;i++){//有幾家分店
                    for(var j =0;j<obj[i]['shopdata'].length;j++){//分店中的第一個type分類
                        for(var k =0;k<obj[i]['shopdata'][j]['data'].length;k++){//分店中的secondtype分類
                            totalnum_shop+=parseFloat(obj[i]['shopdata'][j]['data'][k]['數值']);//總公司各分店人數總和
                            if(obj[i]['shopdata'][j]['data'][k]['數值'] === null){
                                obj[i]['shopdata'][j]['data'][k]['數值']=0;
                                obj[i]['shopdata'][j]['data'][k]['型態']=0;
                            }
                        }
                        if(obj[i]['shopdata'][j]['title'] === null){
                            obj[i]['shopdata'][j]['title']=0;
                        }
                    }
                    if(totalnum_shop){
                        totalnum_company+=parseFloat(totalnum_shop);
                    }
                    totalnum_shop=0;
                }

                for(var i =1;i<obj.length;i++){//有幾家分店
                    for(var j =0;j<obj[i]['shopdata'].length;j++){//分店中的第一個type分類
                        for(var k =0;k<obj[i]['shopdata'][j]['data'].length;k++){//分店中的secondtype分類
                            totalnum_shop+=parseFloat(obj[i]['shopdata'][j]['data'][k]['數值']);//總公司各分店人數總和
                        }
                    }
                    data_text.name=obj[i]['shop'];//
                    data_text.drilldown=obj[i]['shop'];//
                    data_text.y=parseFloat(totalnum_shop/totalnum_company)*100;//
                    data_text.x=parseFloat(totalnum_shop);//****************************
                    data_title.push(data_text);
                    totalnum_shop=0;
                    data_text={};
                }
                series_text.name='各分店比例';
                series_text.colorBypoint=true;
                series_text.data=data_title;
                series_title.push(series_text);
                //第二/三層 type/secondtype
                var series_drilldown_title=[];
                var series_drilldown_text={};
                var data_drilldown_title=[];
                var data_drilldown_text={};
                var series_drilldown_secondtype_text={};
                var data_drilldown_secondtype_title=[];
                var data_drilldown_secondtype_text={};
                //var totalnum_shoptype=0;
                //series_drilldown_text.data=[];
                
                //console.log(totalnum_shoptypeforthird);
                var totalnum_shoptypeforthird=0;
                var n=0;
                for(var i =1;i<obj.length;i++){//有幾家分店
                    for(var j =0;j<obj[i]['shopdata'].length;j++){//分店中的type分類
                        for(var k =0;k<obj[i]['shopdata'][j]['data'].length;k++){
                            
                            n+=parseFloat(obj[i]['shopdata'][j]['data'][k]['數值']);
                        }
                    }
                    //console.log(n);
                    var totalnum_shopsecondtype=0;
                    for(var j =0;j<obj[i]['shopdata'].length;j++){//分店中的type分類
                        for(var k =0;k<obj[i]['shopdata'][j]['data'].length;k++){
                            if(obj[i]['shopdata'][j]['data'][k]['數值']){
                                totalnum_shoptypeforthird+=parseFloat(obj[i]['shopdata'][j]['data'][k]['數值']);//secondtype的總人數
                            }
                        }
                        for(var k =0;k<obj[i]['shopdata'][j]['data'].length;k++){//分店中的secondtype分類
                            data_drilldown_secondtype_text.name=obj[i]['shopdata'][j]['data'][k]['型態'];//第三層
                            data_drilldown_secondtype_text.y=parseFloat(obj[i]['shopdata'][j]['data'][k]['數值']/totalnum_shoptypeforthird)*100;//第三層
                            data_drilldown_secondtype_text.x=parseFloat(obj[i]['shopdata'][j]['data'][k]['數值']);//第三層
                            data_drilldown_secondtype_title.push(data_drilldown_secondtype_text);//第三層
                            //console.log(data_drilldown_secondtype_text);
                            data_drilldown_secondtype_text={};//第三層
                            
                            
                        }
                        data_drilldown_text.name=obj[i]['shopdata'][j]['title'];
                        data_drilldown_text.y=parseFloat(totalnum_shoptypeforthird/n)*100;//
                        data_drilldown_text.x=parseFloat(totalnum_shoptypeforthird);//****************************
                        data_drilldown_text.drilldown=obj[i]['shop']+obj[i]['shopdata'][j]['title'];
                        data_drilldown_title.push(data_drilldown_text);
                        data_drilldown_text={};
                        series_drilldown_secondtype_text.name=obj[i]['shop']+obj[i]['shopdata'][j]['title'];//第三層
                        series_drilldown_secondtype_text.id=obj[i]['shop']+obj[i]['shopdata'][j]['title'];//第三層
                        series_drilldown_secondtype_text.data=data_drilldown_secondtype_title;//第三層
                        series_drilldown_title.push(series_drilldown_secondtype_text);//第三層
                        data_drilldown_secondtype_title=[];//第三層
                        series_drilldown_secondtype_text={};
                        totalnum_shoptypeforthird=0;
                    }
                    n=0;
                    series_drilldown_text.name=obj[i]['shop'];
                    series_drilldown_text.id=obj[i]['shop'];
                    series_drilldown_text.data=data_drilldown_title;
                    series_drilldown_title.push(series_drilldown_text);
                    data_drilldown_title=[];
                    series_drilldown_text={};
                    
                }
                //console.log(series_drilldown_title);
                Highcharts.chart('container5', {
                    chart: {
                        type: 'pie',
                    },
                    title: {
                        text: '各分店基本資料之比例(所有分店來客(填問卷)人數:'+totalnum_company+'人)'
                    },
                    subtitle: {
                        text: '請選擇欲了解之基本資料，再點選分店查看詳情'
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
                        pointFormat:'<span style="color:{point.color}">{point.name}</span>: <b>{point.x:.0f} 人</b> of total<br/>'
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
function makechart(){
    var data=[];
    var act = {};
    act.act = "getAllShopData";
    var obj = {};
    obj.year = $("#year").val();
    obj.type = $("#type").val();
    //要放店家
    obj.company=user;
    data.push(act);
    data.push(obj);
    $.ajax({
        url:'../model/Questionnaire/controller.php',
        type:'POST',
        data:JSON.stringify(data),
        async:false,
        success:function(r){
            // console.log("hello");
            // console.log(eval(r));
            //console.log(eval(r));
            var result = eval(r);
            // console.log(Object.keys(result[2]['data']));
            var drawdata=[];
            var max =0;
            var at;
            var shoparr = [];
            for(var i=1; i<result.length; i++){
                if(Object.keys(result[i]['data']).length>max){
                    max = Object.keys(result[i]['data']).length;
                    at = i;
                }
                shoparr.push(result[i]['shop']);
            }
            // console.error(Object.keys(result[at]['data']));
            var keyarr = Object.keys(result[at]['data']);
            var data = [];
            for(var i=1; i<result.length; i++){
                var pepolearr=[];
                for (var j = 0; j < keyarr.length; j++) {
                    var key = keyarr[j];
                    if(result[i]['data'][key]!=null)
                        pepolearr.push(parseInt(result[i]['data'][key]));
                    else
                        pepolearr.push(0);
                }
                var tmp ={};
                tmp.name=result[i]['shop'];
                tmp.data=pepolearr;
                data.push(tmp);
            }
                // console.error(pepolearr);

            draw(keyarr,data);
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
            // console.log("hello");
            // console.log(eval(r));
            var result = eval(r);
            // console.log(Object.keys(result[2]['data']));
            var drawdata=[];
            var max =0;
            var at;
            var shoparr = [];
            for(var i=1; i<result.length; i++){
                if(Object.keys(result[i]['data']).length>max){
                    max = Object.keys(result[i]['data']).length;
                    at = i;
                }
                shoparr.push(result[i]['shop']);
            }
            // console.error(Object.keys(result[at]['data']));
            var keyarr = Object.keys(result[at]['data']);
            var data = [];
            for(var i=1; i<result.length; i++){
                var pepolearr=[];
                for (var j = 0; j < keyarr.length; j++) {
                    var key = keyarr[j];
                    if(result[i]['data'][key]!=null)
                        pepolearr.push(parseInt(result[i]['data'][key]));
                    else
                        pepolearr.push(0);
                }
                var tmp ={};
                tmp.name=result[i]['shop'];
                tmp.data=pepolearr;
                data.push(tmp);
            }
                // console.error(pepolearr);

            draw(keyarr,data);
        }
    })
}*/
// [{
//         name: 'a',
//         data: pepole
//     },
//     {
//         name: 'b',
//         data: pepole
//     }]
function draw(key,people){
    Highcharts.chart('container4', {
    chart: {
        type: 'column'
    },
    title: {
        text: '各分店'+$("#year").val()+'年的特定屬性顧客比較'
    },
    xAxis: {
        categories: key,
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: '來客人數'
        }
    },
    credits:{
        enabled:false
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
    series: people
});
}



