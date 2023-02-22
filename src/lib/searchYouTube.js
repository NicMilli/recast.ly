import { API_KEY, YOUTUBE_API_KEY } from '../config/config.js';

$.ajaxPrefilter(function (settings, _, jqXHR) {
  jqXHR.setRequestHeader('Authorization', API_KEY);
});

var videosEndpoint = 'https://app-hrsei-api.herokuapp.com/api/recastly/videos';

var searchYouTube = (query, callback) => {

  $.ajax({
    url: videosEndpoint,
    type: 'GET',
    data: { q: query },
    contentType: 'application/json',
    success: callback,
    error: function(data) {
      console.error('Message failed to send!');
    }
  });
};

export default searchYouTube;
