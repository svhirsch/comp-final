<!DOCTYPE html>
<html>
	<head>
		<link type="text/css" href="../css/main.css" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel ='stylesheet' href = '../css/dropzone.css'>
    <link rel ='stylesheet' href = '../css/index.css'>
    <link rel ='stylesheet' href = '../css/dropzone.css'>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
		<script src="http://code.jquery.com/jquery-latest.js"></script>
		<script src="http://listjs.com/no-cdn/list.js"></script>
		<meta charset="UTF-8">
		<title>Main</title>
	</head>
	<h1> Art on the cheap</h1>


<div id="map"></div>

<form action="upload.php" method="post" enctype="multipart/form-data">
    Select image to upload:
    <input type="file" name="fileToUpload" id="fileToUpload">
    <input type="submit" value="Upload Image" name="submit">
</form>


<h2>Filter</h2>
<div id="filters" class="button-group">  <button class="button is-checked" data-filter="*">show all</button>
  <button class="button" data-filter=".metal">Genre</button>
  <button class="button" data-filter=".transition">Price</button>
</div>

<h2>Sort</h2>
<div id="sorts" class="button-group">  <button class="button is-checked" data-sort-by="original-order">original order</button>
  <button class="button" data-sort-by="name">name</button>

</div>

<div class="grid">
  <div class="element-item transition metal " data-category="transition">
    <h3 class="name">Mercury</h3>
    <p class="symbol">Hg</p>
    <p class="number">80</p>
    <p class="weight">200.59</p>
  </div>

</div>

<script src ='../js/isotope.pkgd.min.js'></script>
<script src="../js/main.js"></script>
<script async defer
src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAgBd99JmIBlUJy6eFZu6EzZrXWLGl6Eq8&callback=initMap">
</script>
<script src = '../js/dropzone.js'></script>
<script src = '../js/upload.js'></script>
</body>
</html>