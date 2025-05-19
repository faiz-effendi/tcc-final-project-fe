import MusicPlayer from "../components/music_player.jsx";
import { useNavigate } from "react-router-dom";

function Player() {
  const toBackPage = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="relative w-[400px] h-[580px] flex items-center justify-center object-cover">
        <MusicPlayer
          title="Super Shy"
          artist="Newjeans"
          image="https://storage.cloud.google.com/tcc_music_storage/images/Autumn%20in%20Amsterdam%20by%20Jazzwaves.jpg"
          songUrl="https://storage.cloud.google.com/tcc_music_storage/music_file/Rasheed%20-%20Okvsho.mp3"
        />

        <img src="/back_button.png" className="absolute z-10 top-[-100px] left-[-520px] w-[100px] cursor-pointer" onClick={ () => { toBackPage(-1) } }/>
      </div>
    </div>
  )
}

export default Player;