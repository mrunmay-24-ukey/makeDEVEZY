const Documentation = require('../models/Documentation');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');

const GEMINI_API_KEY = 'AIzaSyADtPyoGAE8LCOIGpMroHrFFBF5aaswH6I'

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const documentationController = {
  // Fetch repository contents
  async fetchRepository(req, res) {
    try {
      const { repoUrl } = req.body;
      
      const urlParts = repoUrl
        .replace('https://github.com/', '')
        .replace('http://github.com/', '')
        .split('/');
      
      const owner = urlParts[0];
      const repo = urlParts[1];

      if (!owner || !repo) {
        return res.status(400).json({ 
          message: 'Invalid repository URL. Format should be: https://github.com/owner/repo' 
        });
      }

      async function fetchContents(path = '') {
        const response = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
          {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
              ...(process.env.GITHUB_TOKEN && {
                'Authorization': `token ${process.env.GITHUB_TOKEN}`
              })
            }
          }
        );

        const items = await Promise.all(
          response.data.map(async (item) => {
            const result = {
              name: item.name,
              path: item.path,
              type: item.type,
              url: item.download_url
            };

            if (item.type === 'dir') {
              result.children = await fetchContents(item.path);
            }

            return result;
          })
        );

        return items;
      }

      const files = await fetchContents();
      res.json(files);
    } catch (error) {
      console.error('GitHub API Error:', error.response?.data || error.message);
      res.status(error.response?.status || 500).json({ 
        message: error.response?.data?.message || 'Failed to fetch repository contents'
      });
    }
  },

  // Generate documentation
  async generateDocumentation(req, res) {
    try {
      const { files } = req.body;
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `Analyze the following codebase and generate comprehensive documentation:
        ${JSON.stringify(files)}
        Please include:
        1. Project Overview
        2. File Structure
        3. Component Documentation
        4. Dependencies
        5. Setup Instructions`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const documentation = response.text();

      // Save to database
      const newDoc = new Documentation({
        repositoryUrl: req.body.repoUrl,
        generatedDocs: documentation
      });
      await newDoc.save();

      res.json({ documentation });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async fetchFileContent(req, res) {
    try {
      const { owner, repo, path } = req.body;

      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            ...(process.env.GITHUB_TOKEN && {
              'Authorization': `token ${process.env.GITHUB_TOKEN}`
            })
          }
        }
      );

      // GitHub API returns base64 encoded content
      const content = Buffer.from(response.data.content, 'base64').toString();
      res.json({ content });
    } catch (error) {
      console.error('GitHub API Error:', error.response?.data || error.message);
      res.status(error.response?.status || 500).json({ 
        message: error.response?.data?.message || 'Failed to fetch file content'
      });
    }
  }
};

module.exports = documentationController;