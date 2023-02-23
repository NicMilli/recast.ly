const {useState} = React;

var Search = (props) => {

  //Initialise the state variable for the text typed within the search bar
  const [curText, setCurText] = useState('');

  //Create an eventHandler to update the curText state when a new character is typed in the search bar.
  var handleChange = function (event) {
    //event is a special object returned by the browser? and has properties to describe the event. Here we access the JSX element through event.target. We have set a value key to be the curText state variable and so event.target.value returns the text currently inside the search bar.
    setCurText(event.target.value);
  };

  //Create an eventHandler function for when the search button is clicked - the outcome of this event is to update the videos displayed on the page. That is defined by the state variables within App.jsx and so we cannot update them directly from Search.jsx. Therefore we have passed down a function as a prop which was defined in App.js- we need to call that function and pass the current search as the argument.
  var handleClick = () => {
    props.search(curText);
  };

  return (
    <div className="search-bar form-inline">
      <input className="form-control" type="text" value={curText} onChange={handleChange} />
      <button className="btn hidden-sm-down" onClick={handleClick}>
        <span className="glyphicon glyphicon-search"></span>
      </button>
    </div>
  );
};

// In the ES6 spec, files are "modules" and do not share a top-level scopeß
// `var` declarations will only exist globally where explicitly definedß
export default Search;

