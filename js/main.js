
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

var genres = [];
// $('#genre').keypress(function (e) {
//   int lock = 1;
//   if (e.which == 13) {
//     if(lock ==1)
//     {
//       lock++;
//       genres.push($(this).val());
//     }
//   }
// });

var prices = [];
// $('#price').keypress(function (e) {
//   int lock = 1;
//   if (e.which == 13) {
//     if(lock ==1)
//     {
//       lock++;
//       genres.push($(this).val());
//     }
//   }
// });

$('#submitbutton').click(function(){
    genres.push($('#genre').val());
    prices.push($('#price').val());
    $('form').fadeOut("slow");
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

Dropzone.autoDiscover = false;
$('.dropzone').dropzone ({
        url: "../build/upload.php",
        init: function() {
            this.on("sending", function(file, xhr, formData){
                formData.append("genre", genres[genres.length-1]);
                formData.append("price", prices[prices.length-1]);
            }),
            this.on("success", function(file, xhr){
                alert(file.xhr.response);
            })
        },
});

var bricklayer = new Bricklayer(document.querySelector('.bricklayer'))


$.ajax({
  cache: false,
  dataType: "json",
    url : "../build/pullImages.php",
    success: function(data) {
      $.each(data, function(i, filename){
                
                // var newImage = document.createElement('div');
                // $(newImage).addClass('dz-preview dz-processing dz-success dz-complete dz-image-preview');
  
                // var actualImage = document.createElement('div');
                // $(actualImage).addClass('plswork dz-image');
                // $(actualImage).append( "<img src='"+ filename + "'>");
                // $(actualImage).css("background-image", "url(" + filename + ")");
                // $(newImage).append(actualImage);
                
                // $("#myForm").append(newImage);
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



$(function() {
    $('.bricklayer-column').on('click', function() {
      $('.imagepreview').attr('src', $(this).find('img').attr('src'));
      $('#imagemodal').modal('show');   
    });   
});

  