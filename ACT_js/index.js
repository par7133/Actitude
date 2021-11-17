/**
 * Copyright 2021, 2024 5 Mode
 *
 * This file is part of Homomm.
 *
 * Homomm is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Homomm is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.  
 * 
 * You should have received a copy of the GNU General Public License
 * along with Homomm. If not, see <https://www.gnu.org/licenses/>.
 *
 * home.js
 * 
 * JS file for Home page
 *
 * @author Daniele Bonini <my25mb@aol.com>
 * @copyrights (c) 2021, 2024, the Open Gallery's contributors     
 */

var bBurgerMenuVisible = false;
var bSideBarVisible = false;

$(document).ready(function() {
 $("#Password").on("keydown",function(e){
   key = e.which;
   //alert(key);
   $("#chatHint").val("");
   if (key===13) {
   e.preventDefault();
   frmHC.submit();
   } else { 
   $("#Password2").val($(this).val());
   //e.preventDefault();
   }
 });

 $("#Password2").on("keydown",function(e){
   key = e.which;
   //alert(key);
   $("#chatHint").val("");
   if (key===13) {
   e.preventDefault();
   $("#Password").val("");
   frmHC.submit();
   } else { 
   //e.preventDefault();
   }
 });

 $("#MessageLine").on("keydown",function(e){
   key = e.which;
   //alert(key);
   if (key===13) {
     //e.preventDefault();
     //sendMessage()
   } else { 
     //e.preventDefault();
   }
 });
});

$("#burger-menu").on("click",function(){
  if (!bBurgerMenuVisible) {
    $(".friend-header").css("display", "table");
  } else {
    $(".friend-header").css("display", "none");
  }    
  bBurgerMenuVisible=!bBurgerMenuVisible;  
});

function hideBurgerMenu() {
  $(".friend-header").css("display", "none");
  bBurgerMenuVisible=false;  
}

function showSideBar() {
 if (!bSideBarVisible) {
   $("#contentbar").css("width","100%");
   $("#sidebar").show("slow");
 }  
 bSideBarVisible = true; 
}

function closeSideBar() {
 $("#sidebar").hide();
 $("#contentbar").css("width","100%");
 bSideBarVisible = false; 
}


$("#call-sidebar").on("mouseover", function() {
  //alert("hello");
  showSideBar();
});  

function closeSplash() {
  $("#hideSplash").val("1");
  $("#splash").hide();	
}

function refresh() {
 $("#CommandLine").val("refreshbrd");
 frmHC.submit();
}

function delSign(sign) {
  $("#CommandLine").val("del '" + sign + "'");
  frmHC.submit();
}

function confSign(sign) {
  $("#CommandLine").val("conf '" + sign + "'");
  frmHC.submit();
}

function sendSign() {
  var val = "";
  val = $("#name").val().trim();
  if (val=="" || val.length<3) {
    $("#name").addClass("emptyfield");
    return;
  }  
  val = $("#place").val().trim();
  if (val=="" || val.length<3) {
    $("#place").addClass("emptyfield");
    return;
  }  
  $("#CommandLine").val("sign");
  frmHC.submit();
}

$("#send").on("click",function() {
  $("#name").removeClass("emptyfield");
  $("#name").removeClass("emptyfield");
  sendSign();
});


function setContentPos() {
  if (window.innerWidth<650) {
    $("#ahome").attr("href","/");
    $("#agithub").css("display","none");
    $("#afeedback").css("display","none");
    $("#asupport").css("display","none");
    $("#pwd2").css("display","inline");    
    //$("#sidebar").css("display","none");
    $("#burger-menu").css("display","inline");
    //$("#contentbar").css("width","100%");
    $("#logo-hmm").css("display","none");
  } else {  
    $("#ahome").attr("href","http://homomm.org");
    $("#agithub").css("display","inline");
    $("#afeedback").css("display","inline");
    $("#asupport").css("display","inline");  
    $("#pwd2").css("display","none");
    //$("#sidebar").css("display","inline");
    $("#burger-menu").css("display","none");
    //$("#contentbar").css("width","75%");
    $("#logo-hmm").css("display","inline");
  }
  hideBurgerMenu();
  //window.scroll(0, 0);
  //$(document.body).css("overflow-y", "hidden");
}  

function setFooterPos() {
  //if (document.getElementById("footerCont")) {
	//if ($("#Password").val() === "") {  
  //  tollerance = 48;
  //} else {
	  tollerance = 15;
	//}  	  
  
    if (window.innerWidth<450) {
      $(".no-sm").css("display", "none");
    } else {
      $(".no-sm").css("display", "inline");
    }
    
    $("#footerCont").css("top", parseInt( window.innerHeight - $("#footerCont").height() - tollerance ) + "px");
    $("#footer").css("top", parseInt( window.innerHeight - $("#footer").height() - tollerance ) + "px");
  //}
}

function showEncodedPassword() {
   if ($("#Password").val() === "") {
	 $("#Password").addClass("emptyfield");
	 return;  
   }
   if ($("#Salt").val() === "") {
	 $("#Salt").addClass("emptyfield");
	 return;  
   }	   	
   passw = encryptSha2( $("#Password").val() + $("#Salt").val());
   msg = "Please set your hash in the config file with this value:";
   alert(msg + "\n\n" + passw);	
}

$("input#files").on("change", function(e) {
  
  if (!document.getElementById("files").files) {
    $("#del-attach").css("display", "none");
  } else {  
    $("#del-attach").css("display", "inline");
  }  
  //frmHC.submit();
});

function clearUpload() {
  $("#upload-cont").html("<input id='files' name='files[]' type='file' accept='.gif,.png,.jpg,.jpeg' style='visibility: hidden;' multiple>"); 
  $("#del-attach").css("display", "none");
}  

$("#Password").on("keydown", function(e){
	$("#Password").removeClass("emptyfield");
});	

$("#Salt").on("keydown", function(e){
	$("#Salt").removeClass("emptyfield");
});	

window.addEventListener("load", function() {
  
  if ($("#frmHC").css("display")==="none") {
    setTimeout("setContentPos()", 5200);  
    //setTimeout("setFooterPos()", 5300);
  } else {
    setTimeout("setContentPos()", 1000);
    //setTimeout("setFooterPos()", 2000);
  }      
  
}, true);

window.addEventListener("resize", function() {

  if ($("#frmHC").css("display")==="none") {
    setTimeout("setContentPos()", 5200);
    //setTimeout("setFooterPos()", 5300);
  } else {
    setTimeout("setContentPos()", 1000);
    //setTimeout("setFooterPos()", 2000);
  }      

}, true);


