import { useState } from 'react';
import axios from 'axios';

const EnvForm = ({ addEnvVariable }) => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !value) {
      alert('Both fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/env', { name, value });
      addEnvVariable(response.data); // Add new env variable to the state in the parent
      setName('');
      setValue('');
    } catch (error) {
      console.error('Error adding environment variable:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
          placeholder="Enter environment variable name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Value</label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
          placeholder="Enter value"
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
        Save
      </button>
    </form>
  );
};

export default EnvForm;