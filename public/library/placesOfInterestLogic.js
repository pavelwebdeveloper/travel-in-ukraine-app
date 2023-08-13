



function getPlacesOfInterest() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("change1").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "/placesofinterestlist", true);
  xhttp.send();
}



function getPlaceOfInterestDetails(id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	console.log(this.responseText);
      document.getElementById("change1").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "/placeofinterestdetails?id=" + id, true);
  xhttp.send();
}

function getManagePlacesOfInterestPage(){
var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	console.log(this.responseText);
      document.getElementById("change1").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "/getmanageplacesofinterestpage", true);
  xhttp.send();
}

function getAddPlaceOfInterestPage(){
var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	console.log(this.responseText);
      document.getElementById("change1").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "/getaddplaceofinterestpage", true);
  xhttp.send();
}

function addPlaceOfInterest(){
var xhttp = new XMLHttpRequest();
var placeofinterestname = document.getElementById("placeOfInterestName").value;
  var placeofinterestdescription = document.getElementById("placeOfInterestDescription").value;
  var locationname = document.getElementById("placeOfInterestLocationName").value;
  var locationid = document.getElementById("placeOfInterestLocationId").value;
  var priceforvisit = document.getElementById("placeOfInterestPriceForVisit").value;
  var locationmap = document.getElementById("placeOfInterestLocationMap").value;
  var openhours = document.getElementById("placeOfInterestOpenHours").value;
  var phonenumber = document.getElementById("placeOfInterestPhoneNumber").value;
  var website = document.getElementById("placeOfInterestWebsite").value;
  var image = document.getElementById("placeOfInterestImage").value;
	var myobj = { "placeofinterestname":placeofinterestname,"placeofinterestdescription":placeofinterestdescription, 
	"locationname":locationname,"locationid":locationid, "priceforvisit":priceforvisit,"locationmap":locationmap, 
	"openhours":openhours,"phonenumber":phonenumber, "website":website,"image":image};
var jsonstring = JSON.stringify( myobj );
var postjson = "jsonstring="+encodeURIComponent( jsonstring );
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	console.log(this.responseText);
      document.getElementById("change1").innerHTML = this.responseText;
    }
  };
  xhttp.open("POST", "/addplaceofinterest", true);
  xhttp.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');
  xhttp.send(postjson);
}

function getUpdatePlaceOfInterestPage(id){
var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	console.log(this.responseText);
      document.getElementById("change1").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "/getupdateplaceofinterestpage?id=" + id, true);
  xhttp.send();
}

function updatePlaceOfInterest(){
var xhttp = new XMLHttpRequest();
var id = document.getElementById("placeOfInterestId").value;
var placeofinterestname = document.getElementById("placeOfInterestName").value;
  var placeofinterestdescription = document.getElementById("placeOfInterestDescription").value;
  var locationname = document.getElementById("placeOfInterestLocationName").value;
  var locationid = document.getElementById("placeOfInterestLocationId").value;
  var priceforvisit = document.getElementById("placeOfInterestPriceForVisit").value;
  var locationmap = document.getElementById("placeOfInterestLocationMap").value;
  var openhours = document.getElementById("placeOfInterestOpenHours").value;
  var phonenumber = document.getElementById("placeOfInterestPhoneNumber").value;
  var website = document.getElementById("placeOfInterestWebsite").value;
  var image = document.getElementById("placeOfInterestImage").value;
	var myobj = { "id":id,"placeofinterestname":placeofinterestname,"placeofinterestdescription":placeofinterestdescription, 
	"locationname":locationname,"locationid":locationid, "priceforvisit":priceforvisit,"locationmap":locationmap, 
	"openhours":openhours,"phonenumber":phonenumber, "website":website,"image":image};
var jsonstring = JSON.stringify( myobj );
var postjson = "jsonstring="+encodeURIComponent( jsonstring );
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	console.log(this.responseText);
      document.getElementById("change1").innerHTML = this.responseText;
    }
  };
  xhttp.open("POST", "/updateplaceofinterest", true);
  xhttp.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');
  xhttp.send(postjson);
}

function getDeletePlaceOfInterestPage(id){
var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	console.log(this.responseText);
      document.getElementById("change1").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "/getdeleteplaceofinterestpage?id=" + id, true);
  xhttp.send();
}

function deletePlaceOfInterest(id) {
var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	console.log(this.responseText);
      document.getElementById("change1").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "/deleteplaceofinterest?id=" + id, true);
  xhttp.send();
}