const EnvVariable = require('../models/EnvVariable');

// Get all environment variables
exports.getAllEnvVariables = async (req, res) => {
    try {
      const envVariables = await EnvVariable.find();
      res.status(200).json(envVariables);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving environment variables' });
    }
  };


  // Create a new environment variable
exports.createEnvVariable = async (req, res) => {
    const { name, value } = req.body;
    
    if (!name || !value) {
      return res.status(400).json({ message: 'Name and value are required' });
    }
  
    try {
      const newEnvVariable = new EnvVariable({ name, value });
      await newEnvVariable.save();
      res.status(201).json(newEnvVariable);
    } catch (err) {
      res.status(500).json({ message: 'Error saving environment variable' });
    }
  };


  // Update an existing environment variable
  exports.updateEnvVariable = async (req, res) => {
    const { value } = req.body; // Only need the new value

    if (!value) {
        return res.status(400).json({ message: 'Value is required' });
    }

    try {
        const updatedEnvVariable = await EnvVariable.findByIdAndUpdate(
            req.params.id, // Use the `_id` from the URL
            { value }, // Update only the `value` field
            { new: true } // Return the updated document
        );

        if (!updatedEnvVariable) {
            return res.status(404).json({ message: 'Environment variable not found' });
        }

        res.status(200).json(updatedEnvVariable);
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).json({ message: 'Error updating environment variable' });
    }
};



  // Delete an environment variable
exports.deleteEnvVariable = async (req, res) => {
  try {
    const deletedEnvVariable = await EnvVariable.findOneAndDelete({ name: req.params.name });
    if (!deletedEnvVariable) {
      return res.status(404).json({ message: 'Environment variable not found' });
    }
    res.status(200).json({ message: 'Environment variable deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting environment variable' });
  }
};