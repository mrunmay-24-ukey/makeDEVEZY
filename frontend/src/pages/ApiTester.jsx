import React, { useState } from 'react';
import ApiForm from '../components/ApiTester/ApiForm';
import ResponseView from '../components/ApiTester/ResponseView';
import HistoryList from '../components/ApiTester/HistoryList';
import axios from 'axios';

const ApiTester = () => {
  const [response, setResponse] = useState(null);
  const [history, setHistory] = useState([]);

  const handleSendRequest = async (request) => {
    setHistory([request, ...history]);

    try {
      const res = await axios({
        method: request.method,
        url: request.url,
        headers: request.headers,
        data: request.body,
      });
      setResponse(res.data);
    } catch (err) {
      setResponse({ error: err.message });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <ApiForm onSendRequest={handleSendRequest} />
          <ResponseView response={response} />
        </div>
        <div className="space-y-6">
          <HistoryList history={history} onSelect={handleSendRequest} />
        </div>
      </div>
    </div>
  );
};

export default ApiTester;
