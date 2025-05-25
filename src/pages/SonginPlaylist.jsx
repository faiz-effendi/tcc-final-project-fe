import SongCard from "../components/song_card";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PopupMessage from "../components/popup_message";
import NavMenu from "../components/navigation_menu";

const API_URL = import.meta.env.VITE_API_URL;

function SonginPlaylist() {
  const [songs, setSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  let { id_playlist } = useParams();
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [popupMessage, setPopupMessage] = useState({
    isOpen: false,
    type: "",
    message: ""
  });
  const navigate = useNavigate();
  
  const fetchSongs = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("localSavedUserData"))?.accessToken;
      const response = await axios.get(
        `${API_URL}/playlist-with-songs/${id_playlist}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response data:", response.data);
      // Pastikan response.data.songs sesuai struktur backend-mu
      setSongs(response.data[0].songs || []);
      setPlaylistName(response.data[0].Playlistname); // Set playlist name if available
      setNewPlaylistName(response.data[0].Playlistname); // Set newPlaylistName with playlistName
    } catch (error) {
      if (error.response.status === 404) {
        setPopupMessage({
          isOpen: true, 
          type: "error",
          message: "playlist is empty Back to home ? ."
        });
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      }
      console.error("Error fetching songs:", error);
    }
  };

  const updatePlaylistName = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("localSavedUserData"))?.accessToken;
      const response = await axios.put(
        `${API_URL}/edit-playlist/${id_playlist}`, // Endpoint yang benar
        {
          playlist_name: newPlaylistName, // Key yang benar
          id_playlist: id_playlist , 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPlaylistName(newPlaylistName); // Update playlistName state
      setPopupMessage({
        isOpen: true,
        type: "success",
        message: "Playlist name updated successfully!",
      });
      navigate(`/song-in-playlist/${response.data.playlists[0].id_playlist}`);
    } catch (error) { 
      console.log("Error updating playlist name:", error);
      alert("Failed to update playlist name. Please try again.");
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      updatePlaylistName();
    }
  };

  return (
    <>
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
        <div className="absolute w-[280px] h-[70px] top-[32px] z-10">
          <div className="relative">
            <input
              type="text"
              value={newPlaylistName}
              placeholder={playlistName} // Menggunakan playlistName sebagai placeholder
              className="px-3 py-1 border-2 border-orange-300 focus:border-orange-500 rounded-md w-70 flex-initial text-black font-pixel text-xl capitalize "
              onChange={(e) => setNewPlaylistName(e.target.value)}
              onKeyDown={handleKeyDown} // Tambahkan event listener
              />
            <span className="absolute inset-y-0 right-3 flex items-center text-orange-400">
              <i className="fas fa-pen"></i>
            </span>
          </div>
        </div>

        {/* All Song List */}
        <div className="absolute inset-0 top-[85px] left-[60px] z-10">
          <div className="flex flex-col gap-1 max-h-[390px] overflow-y-scroll scrollbar-hide">
            {songs.map((song, index) => (
              <SongCard key={index} songData={song} symbol="-" />
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default SonginPlaylist;