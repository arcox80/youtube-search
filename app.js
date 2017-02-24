var YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  var query = {
    part: 'snippet',
    key: 'AIzaSyDVTdsV_xm2uLcpouPg-tV259WE274ketQ',
    q: searchTerm
  }
  $.getJSON(YOUTUBE_BASE_URL, query, callback);
}


function displayTUBESearchData(data) {
  var resultElement = '';
  if (data.Search) {
    data.Search.forEach(function(item) {
     resultElement += '<p>' + item.Title + '</p>';
    });
  }
  else {
    resultElement += '<p>No results</p>';
  }

  $('.js-search-results').html(resultElement);
}

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    getDataFromApi(query, displayTUBESearchData);
  });
}

$(function(){watchSubmit();});
