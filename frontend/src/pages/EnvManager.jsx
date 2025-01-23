import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EnvList from '../components/EnviromentManager/EnvList';
import EnvForm from '../components/EnviromentManager/EnvForm';


const EnvManager = () => {
  const [envVariables, setEnvVariables] = useState([]);

  // Fetch environment variables from the backend
  const fetchEnvVariables = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/env');
      setEnvVariables(response.data);
    } catch (error) {
      console.error('Error fetching environment variables:', error);
    }
  };

  // Add a new environment variable to the state
  const addEnvVariable = (newEnv) => {
    setEnvVariables((prev) => [...prev, newEnv]);
  };

  // Update an environment variable
  const updateEnvVariable = (updatedEnv) => {
    setEnvVariables((prev) =>
      prev.map((env) => (env._id === updatedEnv._id ? updatedEnv : env))
    );
  };

  // Delete an environment variable
  const deleteEnvVariable = (id) => {
    setEnvVariables((prev) => prev.filter((env) => env._id !== id));
  };

  useEffect(() => {
    fetchEnvVariables(); // Fetch the initial data when the component mounts
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Environment Variable Manager</h1>
      <EnvForm addEnvVariable={addEnvVariable} />
      <EnvList
        envVariables={envVariables}
        updateEnvVariable={updateEnvVariable}
        deleteEnvVariable={deleteEnvVariable}
      />
    </div>
  );
};

export default EnvManager;
