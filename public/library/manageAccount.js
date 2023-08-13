




function manageAccount(){
var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("change1").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "/manageaccount", true);
  xhttp.send();
}

function getManageAccountForm(){
var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("change1").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "/getmanageaccountform", true);
  xhttp.send();
}

function updateAccount(){
var xhttp = new XMLHttpRequest();
var userid = document.getElementById("userId").value;
var username = document.getElementById("userName").value;
  var useremail = document.getElementById("userEmail").value;
	var myobj = { "userid":userid,"name":username,"email":useremail };
var jsonstring = JSON.stringify( myobj );
var postjson = "jsonstring="+encodeURIComponent( jsonstring );
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("change1").innerHTML = this.responseText;
    }
  };
  xhttp.open("PUT", "/updateaccountinfo", true);
  xhttp.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');
  xhttp.send(postjson);
}

function updatePassword(){
var xhttp = new XMLHttpRequest();
var userid = document.getElementById("userId").value;
	var userpassword = document.getElementById("userPassword").value;
	var myobj = { "userid":userid, "password":userpassword };
var jsonstring = JSON.stringify( myobj );
var postjson = "jsonstring="+encodeURIComponent( jsonstring );
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("change1").innerHTML = this.responseText;
	  
    }
  };
  xhttp.open("POST", "/updatepassword", true);
  xhttp.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');
  xhttp.send(postjson);
}
