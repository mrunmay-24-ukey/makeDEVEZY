import React from 'react'
import SnippetList from '../components/Snippets/SnippetList'

const Snippets = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Code Snippets</h1>
      <SnippetList />
    </div>
  )
}

export default Snippets