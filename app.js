var YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
var nextToken;
var prevToken;
var query;

function getDataFromApi(searchTerm, pageToken, callback) {
  var query = {
    part: 'snippet',
    key: 'AIzaSyDVTdsV_xm2uLcpouPg-tV259WE274ketQ',
    q: searchTerm,
    pageToken: pageToken
  }
  $.getJSON(YOUTUBE_BASE_URL, query, callback);
}


function displayTUBESearchData(data) {
  //console.log(data);
  nextToken = data.nextPageToken;
  prevToken = data.prevPageToken;
  var num = 0;
  var resultElement = '';
  if (data.items) {
    data.items.forEach(function(item) {
     resultElement += '<div class="results">' +
                        '<h3><a href="https://www.youtube.com/watch?v=' + item.id.videoId + '" target="_blank">' + item.snippet.title + '</a></h3>' +
                        '<div class="description">' +
                          '<div class="thumbnail">' +
                            '<a href="https://www.youtube.com/watch?v=' + item.id.videoId + '" data-lity><img src="' + item.snippet.thumbnails.default.url + '"></a>' +
                          '</div>' +
                          '<div class="info">' +
                            '<h5>Uploaded by <a href="https://www.youtube.com/channel/' + item.snippet.channelId + '" target="_blank">' + item.snippet.channelTitle + '</a></h5>' +
                            '<p>' + item.snippet.description + '</p>' +
                          '</div>' +
                        '</div>' +
                      '</div>' +
                      '<div style="clear:left"></div>';
      num +=1;
      if ($('.js-pages').hasClass('hidden')) {
        $('.js-pages').toggleClass('hidden');
      }
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
    query = $(this).find('.js-query').val();
    getDataFromApi(query, null, displayTUBESearchData);
  });
  $('#prev').click(function(event) {
    getDataFromApi(query, prevToken, displayTUBESearchData);
  });
  $('#next').click(function(event) {
    getDataFromApi(query, nextToken, displayTUBESearchData);
  });
}

$(function(){watchSubmit();});
