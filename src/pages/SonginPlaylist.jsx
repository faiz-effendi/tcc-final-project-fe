import SongCard from "../components/song_card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavMenu from "../components/navigation_menu";

const API_URL = import.meta.env.VITE_API_URL;

function SonginPlaylist() {
  const [songs, setSongs] = useState([]);
  const { id_playlist } = useParams();
  const [search, setSearch] = useState("");

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
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };


  useEffect(() => {
    console.log("id_playlist:", id_playlist);
    const delaySearch = setTimeout(fetchSongs, 400); // Debounce to prevent spam requests
    return () => clearTimeout(delaySearch); // Clear timeout if user is still typing
  }, [search]);

  return (
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
              <i className="fas fa-search"></i>
            </span>
          </div>
        </div>

        {/* All Song List */}
        <div className="absolute inset-0 top-[140px] left-[60px] z-10">
          <div className="flex flex-col gap-1 max-h-[390px] overflow-y-scroll scrollbar-hide">
            {
              songs.map((song, index) => (
                <SongCard
                  key={index}
                  songData={song}
                  symbol="-"
                />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default SonginPlaylist;