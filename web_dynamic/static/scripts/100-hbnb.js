$(document).ready(init);

const HOST = '0.0.0.0';
const amenity = {};
const state = {};
const city = {};
let objects = {};

function init () {
  $('.amenities .popover input').change(function () { objects = amenity; funcobjects.call(this, 1); });
  $('.state_input').change(function () { objects = state; funcobjects.call(this, 2); });
  $('.city_input').change(function () { objects = city; funcobjects.call(this, 3); });
  apiStatus();
  searchPlaces();
}

function funcobjects (objectX) {
  if ($(this).is(':checked')) {
    objects[$(this).attr('data-name')] = $(this).attr('data-id');
  } else if ($(this).is(':not(:checked)')) {
    delete objects[$(this).attr('data-name')];
  }
  const names = Object.keys(objects);
  if (objectX === 1) {
    $('.amenities h4').text(names.sort().join(', '));
  } else if (objectX === 2) {
    $('.locations h4').text(names.sort().join(', '));
  }
}

function apiStatus () {
  const API_URL = `http://${HOST}:5001/api/v1/status/`;
  $.get(API_URL, (data, textStatus) => {
    if (textStatus === 'success' && data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
}

function searchPlaces () {
  const PLACES_URL = `http://${HOST}:5001/api/v1/places_search/`;
  $.ajax({
    url: PLACES_URL,
    type: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({
      amenities: Object.values(amenity),
      states: Object.values(state),
      cities: Object.values(city)
    }),
    success: function (response) {
      $('SECTION.places').empty();
      for (const r of response) {
        const article = ['<article>',
          '<div class="title_box">',
          `<h2>${r.name}</h2>`,
          `<div class="price_by_night">$${r.price_by_night}</div>`,
          '</div>',
          '<div class="information">',
          `<div class="max_guest">${r.max_guest} Guest(s)</div>`,
          `<div class="number_rooms">${r.number_rooms} Bedroom(s)</div>`,
          `<div class="number_bathrooms">${r.number_bathrooms} Bathroom(s)</div>`,
          '</div>',
          '<div class="description">',
          `${r.description}`,
          '</div>',
          '</article>'];
        $('SECTION.places').append(article.join(''));
      }
    },
    error: function (error) {
      console.log(error);
    }
  });
}
