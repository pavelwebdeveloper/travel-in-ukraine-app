

function getLogNav() {
console.log("getLogNav is working     !!!!!!!!!!!!!!!!!!!!!!!!!!!!          !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("loginoutmenu").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "/getloginoutmenu", true);
  xhttp.send();
}

function getSignUpForm() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("change1").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "/getsignupform", true);
  xhttp.send();
}

function getLogInForm() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("change1").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "/getloginform", true);
  xhttp.send();
}

function logIn() {
  var xhttp = new XMLHttpRequest();
  var useremail = document.getElementById("userEmail").value;
	var userpassword = document.getElementById("userPassword").value;
	var myobj = { "email":useremail,"password":userpassword };
var jsonstring = JSON.stringify( myobj );
var postjson = "jsonstring="+encodeURIComponent( jsonstring );
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("change1").innerHTML = this.responseText;
	  getLogNav();
    }
  };
  xhttp.open("POST", "/login", true);
  xhttp.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');
  xhttp.send(postjson);
}

function signUp() {
  var xhttp = new XMLHttpRequest();
  var username = document.getElementById("userName").value;
  var useremail = document.getElementById("userEmail").value;
	var userpassword = document.getElementById("userPassword").value;
	var myobj = { "name":username,"email":useremail,"password":userpassword };
var jsonstring = JSON.stringify( myobj );
var postjson = "jsonstring="+encodeURIComponent( jsonstring );
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("change1").innerHTML = this.responseText;
	  
    }
  };
  xhttp.open("POST", "/signup", true);
  xhttp.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');
  xhttp.send(postjson);
}


function logOut() {
console.log("logOut is working     !!!!!!!!!!!!!!!!!!!!!!!!!!!!          !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("change").innerHTML = this.responseText;
	  getLogNav();
    }
  };
  xhttp.open("GET", "/logout", true);
  xhttp.send();
}
