<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="../static/styles/4-common.css?{{ cache_id }}">
    <link rel="stylesheet" type="text/css" href="../static/styles/3-header.css?{{ cache_id }}">
    <link rel="stylesheet" type="text/css" href="../static/styles/3-footer.css?{{ cache_id }}">
    <link rel="stylesheet" type="text/css" href="../static/styles/6-filters.css?{{ cache_id }}">
    <link type="text/css" rel="stylesheet" href="../static/styles/8-places.css?{{ cache_id }}">
    <link rel="icon" href="../static/images/icon.png?{{ cache_id }}" />
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="static/scripts/101-hbnb.js"></script>
    <title>HBnB</title>
  </head>
  <body>
    <header>
      <div class="logo"></div>
      <div id="api_status"></div>
    </header>
    <div class="container">
      <section class="filters">
        <div class="locations">
          <h3>States</h3>
          <h4>&nbsp;</h4>
          <div class="popover">
            <ul>
              {% for state in states %}
              <li>
                <h2>
		  <input type="checkbox" data-id="{{ state[0].id }}" data-name="{{ state[0].name }}"
                    style="margin-right: 10px" class="state_input" />
                      {{ state[0].name }}:</h2>
                <ul>
                  {% for city in state[1] %}
		    <li>
                      <input type="checkbox" data-id="{{ city.id }}" data-name="{{ city.name }}"
                       style="margin-right: 10px" class="city_input" />
                         {{ city.name }}
                    </li>
                  {% endfor %}
                </ul>
              </li>
              {% endfor %}
            </ul>
          </div>
        </div>
        <div class="amenities">
          <h3>Amenities</h3>
          <h4>&nbsp;</h4>
          <div class="popover">
            <ul>
              {% for amenity in amenities %}
              <li>
                <input type="checkbox" data-id="{{ amenity.id }}" data-name="{{ amenity.name }}"
                   style="margin-right: 10px" />
                      {{ amenity.name }}
              </li>
              {% endfor %}
            </ul>
          </div>
        </div>
        <button type="button" onclick="searchPlaces()">Search</button>
      </section>
      <div class="placesh1"><h1>Places</h1></div>
      <section class="places">
        <!-- <h1>Places</h1> -->
      </section>
    </div>
    <footer>
      <p>Holberton School</p>
    </footer>
  </body>
</html>
