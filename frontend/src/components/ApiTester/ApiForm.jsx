import React, { useState } from 'react';

const ApiForm = ({ onSendRequest }) => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedHeaders = headers.split('\n').reduce((acc, line) => {
      const [key, value] = line.split(':').map((str) => str.trim());
      if (key && value) acc[key] = value;
      return acc;
    }, {});

    onSendRequest({
      method,
      url,
      headers: formattedHeaders,
      body: body ? JSON.parse(body) : null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium">Method</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="mt-2 p-2 border rounded-md"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-medium">URL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="mt-2 p-2 border rounded-md"
          placeholder="Enter API URL"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-medium">Headers</label>
        <textarea
          value={headers}
          onChange={(e) => setHeaders(e.target.value)}
          placeholder="Key: Value"
          className="mt-2 p-2 border rounded-md"
        />
      </div>

      {['POST', 'PUT'].includes(method) && (
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder='JSON body (e.g., {"key":"value"})'
            className="mt-2 p-2 border rounded-md"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white p-2 rounded-md mt-4 hover:bg-indigo-700 transition duration-300"
      >
        Send Request
      </button>
    </form>
  );
};

export default ApiForm;
