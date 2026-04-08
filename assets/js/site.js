(function () {
  var images = document.querySelectorAll("img:not([loading])");
  for (var i = 0; i < images.length; i += 1) {
    images[i].setAttribute("loading", "lazy");
    images[i].setAttribute("decoding", "async");
  }
})();
