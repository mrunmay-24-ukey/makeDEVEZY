import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SnippetItem from './SnippetItem';
import SnippetForm from './SnippetForm';

function SnippetList() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/snippets');
        setSnippets(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching snippets:', error);
      }
    };
    fetchSnippets();
  }, []); // No need for userId dependency

  const handleAddSnippet = async (newSnippet) => {
    try {
      const response = await axios.post('http://localhost:5000/api/snippets', newSnippet);
      setSnippets([...snippets, response.data]);
    } catch (error) {
      console.error('Error adding snippet:', error);
    }
  };

  const handleDeleteSnippet = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/snippets/${id}`);
      setSnippets(snippets.filter((snippet) => snippet._id !== id));
    } catch (error) {
      console.error('Error deleting snippet:', error);
    }
  };

  if (loading) {
    return <p>Loading snippets...</p>;
  }

  return (
    <div className="space-y-6">
      <SnippetForm onAddSnippet={handleAddSnippet} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {snippets.map((snippet) => (
          <SnippetItem
            key={snippet.id}
            snippet={snippet}
            onDelete={handleDeleteSnippet}
          />
        ))}
      </div>
    </div>
  );
}

export default SnippetList;
