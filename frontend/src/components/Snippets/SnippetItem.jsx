import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function SnippetItem({ snippet, onDelete }) {
  return (
    <div className="border rounded-md shadow-sm p-4">
      <h3 className="text-lg font-bold text-gray-900">{snippet.title}</h3>
      <p className="text-gray-600 mb-2">{snippet.description}</p>
      <SyntaxHighlighter language="javascript" style={github}>
        {snippet.code}
      </SyntaxHighlighter>
      <div className="flex items-center justify-between mt-4">
        <div className="flex space-x-2">
          {snippet.tags.map((tag, index) => (
            <span
              key={index}
              className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
        <button
          onClick={() => onDelete(snippet._id)}
          className="text-red-600 hover:text-red-800"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default SnippetItem;
