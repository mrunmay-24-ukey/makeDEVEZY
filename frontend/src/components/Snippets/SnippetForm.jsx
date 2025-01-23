import React, { useState } from 'react';

function SnippetForm({ onAddSnippet }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSnippet = {
     
      title,
      description,
      code,
      tags: tags.split(',').map((tag) => tag.trim()),
    };

    try {
      await onAddSnippet(newSnippet); // Make it async
      setTitle('');
      setDescription('');
      setCode('');
      setTags('');
    } catch (error) {
      console.error('Error adding snippet:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-md p-2"
          placeholder="Snippet Title"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-md p-2"
          placeholder="Snippet Description"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Code</label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full border rounded-md p-2 font-mono"
          placeholder="Enter your code here"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Tags</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full border rounded-md p-2"
          placeholder="e.g., javascript, react"
        />
      </div>
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
      >
        Add Snippet
      </button>
    </form>
  );
}

export default SnippetForm;
