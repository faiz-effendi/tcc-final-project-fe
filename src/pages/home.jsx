import SongCard from "../components/song_card";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function Home() {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");

  const fetchSongs = async() => {
    try {
      await axios
        .get(`${API_URL}${search ? `/songbyname/${search}` : "/songs"}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("localSavedUserData")).accessToken}`,
          }
        })
        .then((response) => { setSongs(response.data); })
        .catch((error) => {
          console.log("Error fetching songs:", error);
        })
    } catch (error) {
      console.error("Error during fetching songs:", error);
    }
  }

  useEffect(() => {
    const delaySearch = setTimeout(fetchSongs, 400); // Debounce to prevent spam requests
    return () => clearTimeout(delaySearch); // Clear timeout if user is still typing
  }, [search]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="relative w-[400px] h-[580px] flex items-center justify-center object-cover">
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

        <div className="absolute inset-0 top-[140px] left-[60px] z-10">
          <div className="flex flex-col gap-1 max-h-[390px] overflow-y-scroll scrollbar-hide">
            {
              songs.map((song, index) => (
                <SongCard
                key={index}
                song_id={song.id}
                title={song.name}
                artist={song.artist}
                img={song.image}
                />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
