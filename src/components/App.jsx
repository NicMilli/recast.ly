import exampleVideoData from '../data/exampleVideoData.js';
import VideoList from './VideoList.js';
import Search from './Search.js';
import VideoPlayer from './VideoPlayer.js';
import searchYoutube from '../lib/searchYouTube.js';
const { useState, useEffect } = React;

var App = () =>{
  //Set up state variables to track the videos to render in the VideoPlayer and VideoList components
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState({id: {videoId: null}, snippet: {title: null, description: null}});

  //Update the videos when the search button is clicked. This needs to be passed to the search component so that Search.jsx can update the state variables videos and currentVideo inside App.jsx
  var updateVideo = function (query) {
    //Make a call to the YouTube API using AJAX, update the state variables when the promise is resolved.
    searchYoutube(query, (data) => {
      setVideos(data);
      setCurrentVideo(data[0]);
    });
  };

  //useEffect triggers on rendering to load initial data from the API, useEffect takes a function to be run and a dependency array. Here the dependency array is left empty as we want the callback to run on rendering. Variables in the dependency array will only trigger the function when they have been changed between renders.
  useEffect(() => {
    searchYoutube('React.js', (data) => {
      setVideos(data);
      setCurrentVideo(data[0]);
    });
  }, []);

  //Event handler when an individual VideoListEntry div is clicked within VideoList. This needs to change the currentVideo which is rendered in VideoPlayer.jsx. Since the state variable currentVideo is housed within App.jsx we define the function here and pass it down to VideoPlayer.jsx so that we may call setCurrentVideo function.
  const handleClick = (video) => {
    setCurrentVideo(video);
  };

  //Optional way to render - when initialising the app we had set a 'dummy' object as the currentVideo state (because we pass it down to VideoPlayer, where it attempts to access properties like currentVideo.id.currentId. This can cause they whole app to throw an error as these keys wont exist on an empty object. We solve this with a dummy array which is replaced in useEffect). This does not look great so another option is to conditionally render a loading spinner when there is no data in the state variables else if there is data in those variables we render the page as usual.
  // if (Object.keys(currentVideo).length === 0) {
  //   return (<div>>LoadingSpinner /></div>);
  // } else {
  return (
    <div>
      <nav className="navbar">
        <div className="col-md-6 offset-md-3">
          <div><h5><em><Search search={updateVideo} />
          </em></h5></div>
        </div>
      </nav>
      <div className="row">
        <div className="col-md-7">
          <VideoPlayer video={currentVideo}/>
        </div>
        <div className="col-md-5">
          <div><VideoList videos={videos} handleClick={handleClick}/></div>
        </div>
      </div>
    </div>
  );
//  }
};


// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
