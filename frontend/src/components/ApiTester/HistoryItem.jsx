import React from 'react';

const HistoryItem = ({ request, onSelect }) => (
  <div
    onClick={() => onSelect(request)}
    className="bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 hover:shadow-md transition duration-200"
  >
    <p className="text-lg text-gray-800">{request.method} - {request.url}</p>
  </div>
);

export default HistoryItem;
