import React from 'react';

function ArticlesPagination({ postsPerPage, totalPosts, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mb-5">
      <ul className="flex space-x-2">
        {pageNumbers.map((num) => (
          <li key={num}>
            <button
              className={`px-4 py-2 bg-slate-800 shadow-lg rounded hover:bg-gray-300 transition duration-200 cursor-pointer ${num === currentPage ? 'text-blue-500' : 'text-white'} `}
              onClick={() => paginate(num)}
            >
              {num}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArticlesPagination;
