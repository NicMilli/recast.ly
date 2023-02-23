import { API_KEY, YOUTUBE_API_KEY } from '../config/config.js';

$.ajaxPrefilter(function (settings, _, jqXHR) {
  jqXHR.setRequestHeader('Authorization', API_KEY);
});

var videosEndpoint = 'https://app-hrsei-api.herokuapp.com/api/recastly/videos';

// var searchYouTube = (query, callback) => {

//   $.ajax({
//     url: videosEndpoint,
//     type: 'GET',
//     data: { q: query },
//     contentType: 'application/json',
//     success: callback,
//     error: function(data) {
//       console.error('Message failed to send!');
//     }
//   });
// };

//Here we refactor searchYouTube to hit the youTube API directly. The function is asynchronous because the fetch command returns a promise. The await keyword tells JS to wait until the promise is resolved and then evaluate the callback - much like the success in AJAX.
var youtubeEndpoint = 'https://www.googleapis.com/youtube/v3/search?';

var searchYouTube = async (query, callback) => {
  const response = await fetch(youtubeEndpoint + new URLSearchParams({
    q: query,
    type: 'video',
    maxResults: 10,
    part: 'snippet',
    key: YOUTUBE_API_KEY
  }));
  const data = await response.json();
  callback(data.items)
};

export default searchYouTube;
