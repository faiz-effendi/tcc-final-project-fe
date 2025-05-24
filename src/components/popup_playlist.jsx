import { useRef } from "react";
import axios from "axios";

function PopupPlaylist({ songId, playlists, setPopupPlaylist, setPopupMessage }) {
  const popupRef = useRef();
  const API_URL = import.meta.env.VITE_API_URL;

  const addToPlaylist = async(playlistId) => {
    await axios
      .post(`${API_URL}/add-song-to-playlist/${playlistId}/${songId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("localSavedUserData")).accessToken}`,
        }
      })
      .then((response) => {
        setPopupPlaylist(false);
        setPopupMessage({
          isOpen: true,
          type: "success",
          message: "Song added to playlist successfully!"
        });
      })
      .catch((error) => {
        console.log("Error adding to playlist: ", error);
      })
  }

  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setPopupPlaylist(false);
    }
  };

  return (
    <div className="absolute flex bg-black/30 backdrop-blur-[1px] items-center justify-center w-screen h-screen z-30" onClick={handleClickOutside}>
      <div className="w-[420px] p-2 bg-[#FFFFFF] flex flex-col rounded-lg" ref={popupRef}>
        <h1 className="font-pixel text-3xl text-center mb-2 mt-1">Add to playlist</h1>
        {
          playlists.map((playlist, index) => (
            <div className="rounded-sm flex items-center justify-between cursor-pointer hover:bg-black/8 p-1.5" onClick={() => {
              setPopupPlaylist(false);
              addToPlaylist(playlist.id_playlist)}
            }
            key={index}
            >
              <div className="flex items-center">
                <img src="/supershy.jpeg" alt="" className="w-[54px] rounded-sm"/>
                <h1 className="ml-2 font-pixel text-2xl whitespace-nowrap capitalize">{playlist.Playlistname}</h1>
              </div>
              <div
                className=" text-4xl font-bold text-black cursor-pointer pb-2"
              >
                +
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default PopupPlaylist;