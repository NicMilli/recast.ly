var VideoListEntry = (props) => (
  <div className="video-list-entry media" onClick={() => { props.handleClick(props.video); }}>
    <div className="media-left media-middle">
      <img className="media-object" src={props.video.snippet.thumbnails.default.url} alt={props.video.snippet.description} />
    </div>
    <div className="media-body">
      <div className="video-list-entry-title">{props.video.snippet.title}</div>
      <div className="video-list-entry-detail">{props.video.snippet.description}</div>
    </div>
  </div>
);

//https://www.youtube.com/watch?v=3aG3WroJHlk&list=PLwnD0jwK0yyn4LjP7KrDdHG17qlCr3FY9

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
VideoListEntry.propTypes = {
  video: PropTypes.object.isRequired,
};

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default VideoListEntry;
