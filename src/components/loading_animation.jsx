// LoadingSpinner.jsx
function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default LoadingSpinner;
