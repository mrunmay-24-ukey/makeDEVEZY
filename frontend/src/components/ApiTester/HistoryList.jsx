import React from 'react';
import HistoryItem from './HistoryItem';

const HistoryList = ({ history, onSelect }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-xl font-semibold text-gray-900">History</h2>
    <div className="space-y-4 mt-4">
      {history.map((item, index) => (
        <HistoryItem key={index} request={item} onSelect={onSelect} />
      ))}
    </div>
  </div>
);

export default HistoryList;
