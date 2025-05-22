import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "./loading_animation";

function MusicPlayer() {
  const [loaded, setLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [song, setSong] = useState(null);
  const audioRef = useRef(null);

  const { id } = useParams()??1;
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    try {
      axios
        .get(`${API_URL}/songbyid/${id}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("localSavedUserData")).accessToken}`,
          },
          timeout: 1000,
        })
        .then((response) => {
          setSong(response.data);
        })
        .catch((error) => {
          console.log("Error fetching songsss:", error);
        });
    } catch(error) {
      console.error("Error during fetching song:", error);
      
    }
  }, [id]);

  if (!song) return <LoadingSpinner />;

  const handleToggle = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  return (
    <>
        {/* Pixel Player */}
        <img src="/main_player.png" className="relative z-10 h-full object-cover" />

        {/* Album Cover */}
        <div className="border-2 absolute inset-0 z-1 ml-12 w-[276px] mt-9.5 h-[275px] rounded-xl">
          <img
            src={song.image}
            onLoad={() => setLoaded(true)}
            className={`object-cover h-full w-full overflow-hidden ${loaded ? 'opacity-100' : 'opacity-0'}`}
            alt="Gambar"
          />
        </div>

        {/* Title and Artist */}
        <div className="absolute inset-0 z-1 mt-81.5 ml-11 w-[285px]">
          <p className="text-4xl truncate font-pixel h-9">{song.name}</p>
          <p className="text-md text-gray-500 font-medium h-2">{song.artist}</p>
        </div>

        {/* Sound Progress Bar */}
        <div className="absolute inset-0 z-10 w-[285px] h-[25px] mt-98.5 ml-11 flex flex-col justify-center">
          <input
            type="range"
            min={0}
            max={duration}
            step="0.01"
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full appearance-none cursor-pointer"
          />
        </div>

        {/* Time Labels */}
        <div className="absolute inset-0 z-2 w-[285px] h-[25px] mt-103 ml-11 flex justify-between">
          <p className="font-pixel">{formatTime(currentTime)}</p>
          <p className="font-pixel">{formatTime(duration)}</p>
        </div>

        {/* Play/Pause Button */}
        <div
          className="absolute inset-0 z-10 border-0 w-[86px] h-[86px] top-[437px] left-[150px] cursor-pointer"
          onClick={handleToggle}
        >
          <img src={isPlaying ? "/pause_button.png" : "/play_button.png"} />
        </div>

        {/* Previous Button */}
        <div className="absolute inset-0 z-11 w-[56px] h-[56px] top-[452px] left-[74px] cursor-pointer">
          <img src="/previous_button.png" />
        </div>

        {/* Next Button */}
        <div className="absolute inset-0 z-2 w-[56px] h-[56px] top-[452px] left-[258px] cursor-pointer">
          <img src="/next_button.png" />
        </div>

        {/* Background Cream */}
        <div
          className="absolute inset-0 bg-[#FFF2DB] rounded-lg z-0 object-cover ml-6 mt-4 w-[325px] h-[540px]"
          style={{ clipPath: "polygon(5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)" }}
        ></div>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src={song.url}
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />
    </>
  );
}

function formatTime(time) {
  if (isNaN(time)) return "0.00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export default MusicPlayer;
