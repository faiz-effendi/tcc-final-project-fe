import { useNavigate } from "react-router-dom";

function SongCard({ songData, setPopup, setSongId, symbol }) {
  const navigate = useNavigate();

  const goToSongPlayer = () => {
    navigate(`/player/${songData.id}`);
  };

  return (
    <div className="relative border-0 w-[285px] z-2 flex items-center justify-between hover:cursor-pointer">
      {/* Image Art + Title */}
      <div className="flex items-center" onClick={ goToSongPlayer }>
        <div className="w-[46px]">
          <img src={ songData.image } alt="Album" className="rounded-sm" />
        </div>
        <div className="pl-2 pb-1 max-w-[200px] overflow-hidden">
          <p className="whitespace-nowrap text-2xl font-pixel h-6">{ songData.name }</p>
          <p className="text-sm text-gray-500 font-medium">{ songData.artist }</p>
        </div>
      </div>

      {/* + Button */}
      <div className="relative">
        <div
          className="text-4xl font-bold text-gray-600 hover:text-black cursor-pointer pb-2"
          onClick={() => {
            // opsional
            setPopup?.(true);
            setSongId?.(songData.id);
          }}
        >
          {symbol ? symbol : "+"}
        </div>
      </div>
    </div>
  );
}

export default SongCard;