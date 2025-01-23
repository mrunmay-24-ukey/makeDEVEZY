import React from 'react';

const ResponseView = ({ response }) => {
  if (!response) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-xl font-semibold text-gray-900">Response</h2>
      <pre className="mt-4 bg-gray-100 p-4 rounded-md overflow-auto text-sm">{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
};

export default ResponseView;
