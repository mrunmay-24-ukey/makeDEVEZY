// src/components/EnvironmentManager/EnvItem.jsx
import { useState } from 'react';
import axios from 'axios';

const EnvItem = ({ env, updateEnvVariable, deleteEnvVariable }) => {
  const { _id, name, value } = env;
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const API_BASE_URL = 'https://makedevezy.onrender.com'

  const handleEdit = async () => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/api/env/${env._id}`, // Use `_id` in the URL
            { value: newValue } // Send only the updated value
        );
        updateEnvVariable(response.data); // Update the list in the parent
        setIsEditing(false); 
    } catch (error) {
        console.error('Error updating environment variable:', error);
    }
};


  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/api/env/${name}`);
      deleteEnvVariable(_id); // Remove the variable from the state
    } catch (error) {
      console.error('Error deleting environment variable:', error);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 rounded-md shadow-sm">
      <div>
        {isEditing ? (
          <>
            <input
              type="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter new value"
            />
            <button onClick={handleEdit} className="mt-2 bg-blue-500 text-white px-4 py-1 rounded-md">
              Save
            </button>
          </>
        ) : (
          <>
            <div className="text-lg font-medium">{name}</div>
            <div className="text-gray-600">{value}</div>
            <div className="flex mt-2 space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 text-white px-4 py-1 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-1 rounded-md"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EnvItem;
