const CommentsLoading = () => {
  return (
    <div className="flex flex-col items-center justify-evenly px-4">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-2xl text-white text-center">
          Loading Comments
        </h1>
        <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
 
export default CommentsLoading;