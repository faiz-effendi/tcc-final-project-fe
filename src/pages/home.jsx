import SongCard from "../components/song_card";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import NavMenu from "../components/navigation_menu";
import PopupPlaylist from "../components/popup_playlist";
import PopupMessage from "../components/popup_message";

const API_URL = import.meta.env.VITE_API_URL;

function Home() {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [search, setSearch] = useState("");
  const [songId, setSongId] = useState("");
  const [popupPlaylist, setPopupPlaylist] = useState(false);
  const [popupMessage, setPopupMessage] = useState({
    isOpen: false,
    type: "",
    message: ""
  });
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const fetchSongs = async() => {
    await axios
      .get(`${API_URL}${search ? `/songbyname/${search}` : "/songs"}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("localSavedUserData")).accessToken}`,
        },
        timeout: 5000
      })
      .then((response) => { 
        setSongs(response.data); 
      })
      .catch((error) => {
        console.log("Error fetching songs:", error);
        if(error.response.status === 403) {
          localStorage.removeItem("localSavedUserData");
          navigate('/', {state: { type: "error", message: "Session expired, please login again!" }});
        }
      })
  }

  useEffect(() => {
    const delaySearch = setTimeout(fetchSongs, 400); // Debounce to prevent spam requests
    return () => clearTimeout(delaySearch); // Clear timeout if user is still typing
  }, [search]);

  const fetchPlaylists = async() => {
    await axios
      .get(`${API_URL}/playlist/${JSON.parse(localStorage.getItem("localSavedUserData")).id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("localSavedUserData")).accessToken}`,
        }
      })
      .then((response) => {
        setPlaylists(response.data);
      })
      .catch((error) => {
        console.log("Error fetching playlists: ", error);
      })
  }

  useEffect(() => {
    fetchPlaylists();

    const container = scrollRef.current;
    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    // cleanup biar nggak memory leak
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [])

  return (
    <>
      { popupPlaylist && <PopupPlaylist songId={songId} playlists={playlists} setPopupPlaylist={setPopupPlaylist} setPopupMessage={setPopupMessage}/>}
      { popupMessage.isOpen && <PopupMessage state={popupMessage} setState={setPopupMessage} />}

      <div className="h-screen flex items-center justify-center">
        <div className="relative w-[400px] h-[580px] flex items-center justify-center object-cover">
          <NavMenu />
          {/* Pixel Player */}
          <img src="/home_player.png" className="relative z-8 h-full object-cover" />

          {/* Background Cream */}
          <div
            className="absolute inset-0 bg-[#FFF2DB] rounded-lg z-0 object-cover ml-9 mt-4 w-[325px] h-[540px]"
            style={{ clipPath: "polygon(5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)" }}
          ></div>

          {/* Search bar */}
          <div className="absolute w-[280px] h-[40px] top-[32px] z-10">
            <div className="relative">
              <input
                type="text"
                placeholder="Search songs..."
                className="pl-10 pr-4 py-1 border-2 border-orange-300 focus:border-orange-500 rounded-md w-70 flex-initial text-gray-800"
                value={search}
                onChange={(e) => setSearch(e.target.value)}

              />
            <span className="absolute inset-y-0 left-3 flex items-center text-orange-400">
              <i className="fas fa-search"></i> {/* Ikon Search */}
            </span>
          </div>
        </div>

        {/* Playlist */}
        <div 
          className="absolute flex gap-2 border-0 border-blue-400 h-[50px] w-[280px] top-[78px] overflow-x-auto scrollbar-hide z-10 font-pixel"
          ref={scrollRef}
          >
          {
            playlists.map((playlist) => (
              <div
              className="bg-[#f7d585] rounded-lg min-w-50 flex items-center cursor-pointer capitalize"
              onClick={() => navigate(`/song-in-playlist/${playlist.id_playlist}`)}
              key={playlist.id} // gunakan id (int) untuk key
                ///katanya bug///
              >
                <div className="w-[50px] rounded-lg">
                  <img src="/supershy.jpeg" alt="" className="rounded-lg"/>
                </div>
                <h1 className="px-2 text-xl text-gray-600 whitespace-nowrap">
                  {playlist.Playlistname}
                </h1>
              </div>
            ))
          }
        </div>

          {/* All Song List */}
          <div className="absolute inset-0 top-[140px] left-[60px] z-10">
            <div className="flex flex-col gap-1 max-h-[390px] overflow-y-scroll scrollbar-hide">
              {
                songs.map((song, index) => (
                  <SongCard
                    key={index}
                    songData={song}
                    setSongId={setSongId}
                    setPopup={setPopupPlaylist}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
