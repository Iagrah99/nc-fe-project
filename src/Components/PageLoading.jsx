const PageLoading = ({ contentType }) => {
  return (
    <div className="flex flex-col items-center justify-evenly pt-48 px-4">
      <div className="flex flex-col items-center justify-center">
        <h1 className="lg:text-5xl text-2xl text-white mb-6 text-center">
          Loading {contentType}
        </h1>
        <div className="w-12 h-12 border-4 border-t-transparent border-red-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default PageLoading;
