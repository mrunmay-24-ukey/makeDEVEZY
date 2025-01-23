const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const snippetRoutes = require('./routes/snippetRoutes');
const envVariableRoutes = require('./routes/envVariableRoutes')
const docRoutes = require('./routes/documentationRoutes')
dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// routes
app.use('/api/snippets', snippetRoutes);
app.use('/api/env' , envVariableRoutes)
app.use('/api/documentation',docRoutes)


const PORT = process.env.PORT || 5000;

app.listen(PORT,  () => {
  console.log(`Server is running on port ${PORT}`);
});
