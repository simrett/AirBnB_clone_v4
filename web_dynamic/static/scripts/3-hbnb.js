$(document).ready(function () {
  const checkedAmenities = [];

  function updateAmenitiesList () {
    const amenitiesList = checkedAmenities.join(', ');
 
    $('.amenities h4').text(amenitiesList);
  }

  $('input[type=checkbox][name=amenity]').change(function () {
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      checkedAmenities.push(amenityName);
    } else {
      const index = checkedAmenities.indexOf(amenityName);
      if (index !== -1) {
        checkedAmenities.splice(index, 1);
      }
    }

    updateAmenitiesList();
  });

  function updateApiStatus () {
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });

    function fetchAndDisplayPlaces () {
      $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function (data) {
          const placesSection = $('.places');
          placesSection.empty();

          data.forEach(function (place) {
            const article = $('<article>');
            article.append('<div class="title_box">' +
              '<h2>' + place.name + '</h2>' +
              '<div class="price_by_night">$' + place.price_by_night + '</div>' +
              '</div>');
            article.append('<div class="information">' +
              '<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>' +
              '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>' +
              '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>' +
              '</div>');
            article.append('<div class="description">' + place.description + '</div>');
            placesSection.append(article);
          });
        },
        error: function (xhr, status, error) {
          console.log('Error:', error);
        }
      });
    }

    fetchAndDisplayPlaces();
  }
});
