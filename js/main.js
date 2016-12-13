
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: 35.90, lng: -79.04}
  });
  var geocoder = new google.maps.Geocoder;
  var infowindow = new google.maps.InfoWindow;

  document.getElementById('submit').addEventListener('click', function() {
    geocodePlaceId(geocoder, map, infowindow);
  });
}

// This function is called when the user clicks the UI button requesting
// a reverse geocode.
function geocodePlaceId(geocoder, map, infowindow) {
  var placeId = document.getElementById('place-id').value;
  geocoder.geocode({'placeId': placeId}, function(results, status) {
    if (status === 'OK') {
      if (results[0]) {
        map.setZoom(14);
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
        infowindow.setContent(results[0].formatted_address);
        infowindow.open(map, marker);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}


var bricklayer = new Bricklayer(document.querySelector('.bricklayer'))
var genres = [];
var prices = [];


$('#submitbutton').click(function(){

    genres.push($('#genre').val());
    prices.push($('#price').val());
    $('#firstForm').fadeOut("slow");
    $('#myForm').css("display", "hidden");
    $('#myForm').fadeIn("slow");

});


//input population function
$(function(){
  $('input').on('change', function() {
    var input = $(this);
    if (input.val().length) {
      input.addClass('populated');
    } else {
      input.removeClass('populated');
    }
  });
  
  setTimeout(function() {
    $('#genre').trigger('focus');
  }, 500);
});


$('.bricklayer-column').mouseover(function(){
  
    var genre = $(this).find(':first-child').attr("data-genre");
    var price = $(this).find(':first-child').attr("data-price");
    var genreText = document.createElement('span');
    var priceText = document.createElement('span');
    $(genreText).addClass("genreDisplay");
    $(priceText).addClass("priceDisplay");

    $(genreText).html(genre);
    $(priceText).html(price);
    $(".infobox").append(genreText);
    $(".infobox").append(priceText);
    setTimeout(function(){
    $(genreText).fadeOut("slow");
    $(priceText).fadeOut("slow");
    }, 1000);
    $('img.maybe').unbind("mouseover");
});

$('.bricklayer-column').mouseleave(function(){
    $('.genreDisplay').remove();
    $('.priceDisplay').remove();
   

});




//appends additional parameters to Dropzone's http request for uploading images
Dropzone.autoDiscover = false;
$('.dropzone').dropzone ({
        url: "../build/upload.php",
        init: function() {
            
            this.on("sending", function(file, xhr, formData){
                formData.append("genre", genres[genres.length-1]);
                formData.append("price", prices[prices.length-1]);
            }),
            this.on("success", function(file, xhr){
              
               var src = file.name;
               var newImage = document.createElement('img');
               $(newImage).attr("src","../testimages/" + src);
               $(newImage).addClass("maybe");
               bricklayer.append(newImage);
            }),
            this.on("addedfile", function(event) {
            var set = 0;
            setTimeout(function(){
                $('#myForm').fadeOut("slow");
                 $('#firstForm').fadeIn("slow");
            }, 2000);
           
            
          }),
             this.on("complete", function() {
      // If all files have been uploaded
        if (this.getQueuedFiles().length == 0 && this.getUploadingFiles().length == 0) {

        var _this = this;

        setTimeout(function(_this){
        // Remove all files
        _this.removeAllFiles();
       }, 600);
        
       }

        });
      
            

        }
    
});






$.ajax({
  cache: false,
  dataType: "json",
    url : "../build/pullImages.php",
    success: function(data) {
      $.each(data, function(i, filename){
                var testImage = document.createElement('img');
                var fileID = filename.substring(11,26);
                $(testImage).attr("id", fileID);
                testImage.src = filename;
                $(testImage).addClass("maybe");
                bricklayer.append(testImage);
                
        });


    }

  });


//hook genre and price for each image as data-genre and data-price attributes
$.ajax({
  cache: false,
  dataType: "json",
    url : "../build/pictures.php",
    success: function(data) {
                

      $.each(data, function(i, fname){
          
          var id = data[i].filename;
          var currentPic = document.getElementById(id);
          
          if (currentPic !== null){
            currentPic.setAttribute("data-genre", data[i].genre);
            currentPic.setAttribute("data-price", data[i].price);
          }

        });
    }
   
  });



  