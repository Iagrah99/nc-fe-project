const FullscreenLoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {/* Backdrop (transparent black) */}
      <div className="absolute inset-0 bg-black opacity-15"></div>

      {/* Spinner content */}
      <div className={`relative flex flex-col items-center ${message.includes('Reloading' ? 'mt-40' : 'mt-0')} sm:mb-24 sm:mt-0 gap-5 z-10`}>
        <p className={`mt-4 text-white text-2xl sm:text-3xl ${message.includes('Reloading') ? 'hidden' : 'sm:block'}`}>{message}</p>
        <div className="w-20 h-20 border-4 border-t-transparent border-red-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default FullscreenLoadingSpinner;

