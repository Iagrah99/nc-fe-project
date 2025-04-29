const FullscreenLoadingSpinner = ({ message = "Loading..." }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop (transparent black) */}
        <div className="absolute inset-0 bg-black opacity-15"></div>
  
        {/* Spinner content */}
        <div className="relative flex flex-col items-center z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-red-500"></div>
          <p className="mt-4 text-white text-sm font-medium">{message}</p>
        </div>
      </div>
    );
  };
  
  export default FullscreenLoadingSpinner;
  