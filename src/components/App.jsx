import exampleVideoData from '../data/exampleVideoData.js';
import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import searchYoutube from '../lib/searchYouTube.js';
const { useState, useEffect } = React;

var App = () =>{
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(exampleVideoData[0]);

  useEffect(() => {
    if (videos.length === 0) {
      searchYoutube('fishing', (data) => {
        console.log(data);
        setVideos(data);
        setCurrentVideo(data[0]);
      });
    }
  }, []);

  const handleClick = (video) => {
    setCurrentVideo(video);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="col-md-6 offset-md-3">
          <div><h5><em>search</em> view goes here</h5></div>
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
};


// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
