import MusicPlayer from "../components/music_player.jsx";
import NavMenu from "../components/navigation_menu.jsx";


function Player() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="relative w-[400px] h-[580px] flex items-center justify-center object-cover">
        <NavMenu />
        
        <MusicPlayer
          title="Super Shy"
          artist="Newjeans"
          image="https://storage.cloud.google.com/tcc_music_storage/images/Autumn%20in%20Amsterdam%20by%20Jazzwaves.jpg"
          songUrl="https://storage.cloud.google.com/tcc_music_storage/music_file/Rasheed%20-%20Okvsho.mp3"
        />
      </div>
    </div>
  )
}

export default Player;