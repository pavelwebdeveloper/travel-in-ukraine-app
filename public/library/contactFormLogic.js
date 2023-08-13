



function getContactForm() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("change1").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "/getcontactform", true);
  xhttp.send();
}


function resultOfSubmit() {
console.log("Hi the form is working");
var fname = document.getElementById("fname").value;
var email = document.getElementById("email").value;
var message = document.getElementById("message").value;
var myobj = { "name":fname,"email":email,"message":message };
var jsonstring2 = JSON.stringify( myobj );
var postjson2 = "jsonstring2="+encodeURIComponent( jsonstring2 );
var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("change1").innerHTML = this.responseText;
    }
  };
  xhttp.open("POST", "/contactinfo", true);
  xhttp.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');
  xhttp.send(postjson2);
}
