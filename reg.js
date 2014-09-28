// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      https://github.com/
// @copyright  2012+, You
// ==/UserScript==

function createCookie(name,value,days) {
    if (days) {
        var date=new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires="";
    document.cookie =name+"="+value+expires+"; path=/wrs";
}
function eraseCookie(name) {
    createCookie(name,"",-1);
}
if(document.URL=="https://cloud.itsc.cuhk.edu.hk/wrs/WRSEvent.aspx"){
	place=0;
	page=0;
	record=[];
	number=0;
	var record_td=function(temp){
		var tempd=[0,0,0,0,0];//0:name, 1:time, 2:place, 3:quota, 4:a
		tempd[0]=temp.children[1].children[0].text;
		tempd[1]=temp.children[2].children[0].textContent;
		tempd[2]=temp.children[3].children[0].textContent;
		tempd[3]=temp.children[5].children[0].textContent;
		tempd[4]=temp.children[1].children[0];
		record[number]=tempd;
		number=number+1;
	}
	var find_td=function(){
		var tables=document.getElementsByTagName("table");
		var i=0;
		var ctable;
		while(i<tables.length){
			if(tables[i].id=="ctl00_ContentPlaceHolder1_gvEventList"){
				ctable=tables[i];
			}
			i=i+1;
		}
		var rows=ctable.rows;
		i=1;
		while(i<rows.length-1){
			record_td(rows[i]);
			i=i+1;
		}
	}
	find_td();
	if(document.cookie.indexOf("page=")==-1){document.cookie+="; page:0 ;";}
	var find_page=function(){
		var temp=document.cookie.indexOf("page=")+5;
		page=parseInt(document.cookie.substring(temp,temp+2));
		if(isNaN(page)==true){page=0;document.cookie+="page=00;";}
		return temp;
	}
	place=find_page();
	var click_page=function(){
		var temp=document.getElementsByTagName("table")[5];
		var temp1=temp.rows[0].children;
		if(page<=9){}
		else if(page>=10 && page<20){
			temp1[1].children[0].click();
		}
		else if(page>=20 && page<27){
			if(temp1[2].children[0]){temp1[2].children[0].click();}
		}
	}
	var add_run=function(){
		var i=0;
		var tag=0;
		var temp=document.getElementsByTagName("table")[5];
		var temp1=temp.rows[0].children;
		if(page<=9){
			record[page][4].click();tag=1;
		}
		else if(page<=19 && temp1[1].children[0].tagName=="SPAN"){
			record[page-10][4].click();tag=1;
		}
		else if(page<=19 && temp1[0].children[0].tagName=="SPAN"){
			temp1[1].children[0].click();
		}
		else if(page>19 && temp1[2].children[0].tagName=="SPAN"){
			record[page-20][4].click();tag=1;
		}
		else{
			temp1[2].children[0].click();
		}
		if(tag==1){
			if(page<9){
				var temp2="0"+(page+1);
				eraseCookie("page");
				createCookie("page",temp2,100);
			}
			else{
				var temp2=page+1;
				eraseCookie("page");
				createCookie("page",temp2,100);
			}
		}
		
	}
	add_run();
}
if(document.URL=="https://cloud.itsc.cuhk.edu.hk/wrs/WRSEventDetails.aspx"){
	if(theForm.ctl00_ContentPlaceHolder1_btnRegister.disabled==false){
		theForm.ctl00_ContentPlaceHolder1_btnRegister.click();
	}
	else{
		theForm.ctl00$ContentPlaceHolder1$btnBack.click();
	}
}
if(document.URL=="https://cloud.itsc.cuhk.edu.hk/wrs/WRSUserInfo.aspx"){
	temp=document.getElementById("ctl00_ContentPlaceHolder1_btnCancel");
	temp.id="ctl00_ContentPlaceHolder1_btnNext";
	temp.name="ctl00$ContentPlaceHolder1$btnNext";
	temp.click();
}
if(document.URL=="https://cloud.itsc.cuhk.edu.hk/wrs/WRSRegistrationResult.aspx"){
	theForm.ctl00_ContentPlaceHolder1_btnHome.click();
}