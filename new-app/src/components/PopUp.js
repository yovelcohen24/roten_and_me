import React from 'react';

const Popup = ({ message, onClose, isGoodResponse }) => {
    const onCloseWithPageReload = () => {
        onClose();
        window.location.reload();
    }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-xl text-gray-800">{message}</p>
        <button
          onClick={onCloseWithPageReload}
          className={`mt-4 px-4 py-2 rounded focus:outline-none ${
            isGoodResponse ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}
        >
          {isGoodResponse ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default Popup;