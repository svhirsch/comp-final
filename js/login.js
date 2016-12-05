
var defaults = {
            colorMode: 'color',
            compositeOperation: 'lighten',
            iterationLimit: 0,
            key: 'low',
            lineWidth: 2,
            lineMode: 'smooth',
            origin: ['bottom'],
            outputSize: 'original',
            pathFinderCount: 30,
            speed: 7,
            turningAngle: Math.PI
        };
    



var imageElement = document.getElementById('my-image');
var chromata = new Chromata(imageElement, defaults);
chromata.start();



function inUser(){
	var uname = $('#createuser').val();
	var pw = $('#createpw').val();
	var cmpw = $('#confirmpw').val();				

	if (pw == cmpw){
	$.ajax({
		type: "POST",
		url: "build/insertUser.php",
		cache: false,
		data: {createuser:uname,createpw:pw}
		}).done(function(data){
			window.location.href = "build/main.php";
		});			
	}else{
		$("#divMsg").html("Passwords do not match");
	}
}

function logUser(){
	var usLogin = $('#loginuser').val();
	var pwLogin = $('#loginpw').val();

	$.ajax({
		type: "POST",
		url: "build/login.php",
		cache: false,
		data: {loginuser:usLogin,loginpw:pwLogin}
		}).done(function(data){
			if (data == 1){
				window.location.href = "/build/main.php";
			}else{
				$("#divMsg2").html("Account not found");
			}
		})			
}
	
function showCForm(){
	document.getElementById("showCreate").style.display="none";
	document.getElementById("showLogin").style.display="inline-block";
	document.getElementById("create").style.display="block";
	document.getElementById("login").style.display="none";
}

function showLForm(){
	document.getElementById("showCreate").style.display="inline-block";
	document.getElementById("showLogin").style.display="none";
	document.getElementById("create").style.display="none";
	document.getElementById("login").style.display="block";
	document.getElementById("login").style.paddingBottom="10px";
}
