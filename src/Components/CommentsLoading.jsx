const CommentsLoading = () => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center px-4 py-12 rounded-lg overflow-hidden">
      {/* Semi-transparent backdrop */}
      <div className="absolute inset-0 bg-black opacity-20 z-0 rounded-lg"></div>

      {/* Foreground loading content */}
      <div className="relative flex flex-col items-center gap-5 z-10">
        <h1 className="text-2xl text-white text-center">Loading Comments</h1>
        <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default CommentsLoading;
