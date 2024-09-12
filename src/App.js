// App.js

import './App.css';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import movieTrailer from 'movie-trailer';

function App() {
  // Setting up the initial states using react hook 'useState'
  const [video, setVideo] = useState("Interstellar");
  const [videoURL, setVideoURL] = useState("https://youtu.be/zSWdZVtXT7E");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // A function to fetch the required URL and storing it inside the videoURL state variable
  const handleSearch = () => {
    if (!video) return;
    setLoading(true);
    setError(null); // Reset error before new search
    movieTrailer(video)
      .then((res) => {
        setLoading(false);
        if (res) {
          setVideoURL(res);
        } else {
          setError("Trailer not found!");
          setVideoURL("");
        }
      })
      .catch((err) => {
        setLoading(false);
        setError("An error occurred while fetching the trailer.");
      });
  };

  // Handling the "Enter" key press for input
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="App">
      {/* Header Section with Logo and Title */}
      <header className="App-header">
        <h1 className="App-title">Trailersss</h1>
      </header>

      {/* Search Box */}
      <div className="search-box">
        <label>
          Search for any movies/shows:{" "}
        </label>
        <input
          type="text"
          onChange={(e) => setVideo(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Display loading message */}
      {loading && <p>Loading...</p>}

      {/* Display error message if exists */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Using 'ReactPlayer' component to display the video if URL is available */}
      {videoURL ? (
        <ReactPlayer url={videoURL} controls={true} />
      ) : (
        !loading && <p>No video to display</p>
      )}
    </div>
  );
}

export default App;
