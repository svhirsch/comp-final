// Initialize the map.
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


$.ajax({
  cache: false,
    url : "../build/pullImages.php",
    success: function(data) {
        $(data).find("a").attr("href", function (i, val) {
            if( val.match(/\.(jpe?g|png|gif|jpg)$/) ) { 
                var newImage = document.createElement('div');
                $(newImage).addClass('dz-preview', 'dz-processing', 'dz-success', 'dz-complete', 'dz-image-preview');
  
                var actualImage = document.createElement('div');
                $(actualImage).addClass('dz-image');
                $(actualImage).append( "<img src='"+ folder + val + "'>")
                $(newImage).append(actualImage);
                $("body").append(newImage);
            } 
        });
    }
});


$.ajax({
            url: "pullImages.php",
            dataType: "json",
            success: function (data) {

                $.each(data, function(i,filename) {
                    $('#imageDiv').prepend('<img src="'+ filename +'"><br>');
                });
            }
        });


  