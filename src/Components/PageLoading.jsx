const PageLoading = ({ contentType }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop (transparent black) */}
      <div className="absolute inset-0 bg-black opacity-15"></div>

      {/* Spinner content */}
      <div className="relative flex flex-col items-center mb-24 gap-5 z-10">
        <p className="mt-4 text-white text-3xl">Loading {contentType}</p>
        <div className="w-24 h-24 border-4 border-t-transparent border-red-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default PageLoading;
