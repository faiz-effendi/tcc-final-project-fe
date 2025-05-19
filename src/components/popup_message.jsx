import { XCircle } from "lucide-react";

function PopupMessage({ setState, message }) {
  return (
    <>
      <div className="absolute inset-0 z-20 backdrop-blur-[2px] bg-black/30 flex items-center justify-center">
        <div className="bg-white w-[320px] rounded-xl shadow-xl p-4 text-center relative">

          {/* Icon Error */}
          <div className="flex justify-center -mt-14 mb-1">
            <div className="bg-red-100 rounded-full p-3">
              <XCircle className="text-red-600 w-12 h-12" />
            </div>
          </div>

          {/* Judul */}
          <h2 className="text-3xl font-bold text-gray-800">Error!</h2>

          {/* Pesan */}
          <p className="text-sm text-gray-600 mt-1">
            {message}
          </p>

          {/* Tombol Try Again */}
          <button
            onClick={() => setState(false)}
            className="mt-5 bg-red-500 hover:bg-red-600 w-full text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
          >
            Ok
          </button>
        </div>
      </div>
    </>
  );
}

export default PopupMessage;
