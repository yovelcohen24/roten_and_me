import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-56px)] bg-gradient-to-r from-indigo-600 to-blue-400">
      <div className="flex items-center justify-center flex-grow">
        <div className="px-8 py-4 bg-white rounded-md shadow-xl sm:px-16 sm:py-8 md:px-24 md:py-12">
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-blue-600 text-5xl sm:text-6xl md:text-7xl">404</h1>
            <h6 className="mt-4 text-lg font-bold text-center text-gray-800 sm:text-xl md:text-2xl">
              <span className="text-red-500">Oops!</span> Page not found
            </h6>
            <p className="mt-2 text-sm text-center text-gray-500 sm:text-base md:text-lg">
              The page you’re looking for doesn’t exist.
            </p>
            <a
              href="/"
              className="mt-6 px-4 py-2 text-sm font-semibold text-blue-800 bg-blue-100 sm:mt-8 sm:px-6 sm:py-3"
            >
              Go home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
