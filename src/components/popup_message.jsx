import { XCircle, CheckCircle } from "lucide-react";

function PopupMessage({ state, setState }) {
  const isError = state.type === "error";
  const isSuccess = state.type === "success";

  return (
    <div className="absolute inset-0 z-20 backdrop-blur-[1px] bg-black/30 flex items-center justify-center">
      <div className="bg-white w-[320px] rounded-xl shadow-xl p-4 text-center relative">

        {/* Icon Dinamis */}
        <div className="flex justify-center -mt-14 mb-1">
          <div
            className={`rounded-full p-3 ${
              isError ? "bg-red-100" : isSuccess ? "bg-green-100" : ""
            }`}
          >
            {isError && <XCircle className="text-red-600 w-12 h-12" />}
            {isSuccess && <CheckCircle className="text-green-600 w-12 h-12" />}
          </div>
        </div>

        {/* Judul */}
        <h2
          className={`text-3xl font-bold ${
            isError ? "text-red-600" : isSuccess ? "text-green-600" : "text-gray-800"
          }`}
        >
          {isError ? "Error!" : isSuccess ? "Success!" : "Notice"}
        </h2>

        {/* Pesan */}
        <p className="text-sm text-gray-600 mt-1">{state.message}</p>

        {/* Tombol */}
        <button
          onClick={() => setState({ status: null, message: "" })}
          className={`mt-5 ${
            isError
              ? "bg-red-500 hover:bg-red-600"
              : isSuccess
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-500 hover:bg-gray-600"
          } w-full text-white font-semibold py-2 px-6 rounded-lg transition duration-300`}
        >
          Ok
        </button>
      </div>
    </div>
  );
}

export default PopupMessage;
