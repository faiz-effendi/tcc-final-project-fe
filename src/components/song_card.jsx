import { useNavigate } from "react-router-dom";

function SongCard({ song_id, title, artist, img }) {
  const navigate = useNavigate();

  const goToSongPlayer = () => {
    navigate(`/player/${song_id}`);
  }

  return (
    <div className="border-0 border-blue-500 w-[285px] z-2 flex items-center justify-between hover:cursor-pointer" onClick={ goToSongPlayer }>
      {/* Album Art */}
      <div className="flex items-center">
        <div className="w-[46px]">
          <img src={img} alt="Album" className="rounded-sm" />
        </div>

        {/* Song Title and Artist */}
        <div className="pl-2 pb-1 max-w-[200px] overflow-hidden">
          <p className="whitespace-nowrap text-2xl font-pixel h-6">{title}</p>
          <p className="text-sm text-gray-500 font-medium">{artist}</p>
        </div>
      </div>
      {/* Add Button */}
      <div className="text-4xl font-bold text-gray-600 hover:text-black overflow-visible flex items-center">
        <p className="pb-2 text-3xl">+</p>
      </div>
    </div>
  );
}

export default SongCard;