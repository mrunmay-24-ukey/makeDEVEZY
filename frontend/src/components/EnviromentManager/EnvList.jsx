// src/components/EnvironmentManager/EnvList.jsx
import React from 'react';
import EnvItem from './EnvItem';

const EnvList = ({ envVariables, updateEnvVariable, deleteEnvVariable }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
      <div className="space-y-4">
        {envVariables.length === 0 ? (
          <p>No environment variables found.</p>
        ) : (
          envVariables.map((env) => (
            <EnvItem
              key={env._id}
              env={env}
              updateEnvVariable={updateEnvVariable}
              deleteEnvVariable={deleteEnvVariable}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default EnvList;
