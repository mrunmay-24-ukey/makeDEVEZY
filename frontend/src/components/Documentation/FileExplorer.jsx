import React, { useState } from 'react';
import { FaFolder, FaFolderOpen, FaFile, FaChevronDown, FaChevronRight } from 'react-icons/fa';

const FileExplorer = ({ files, onFileSelect, selectedFiles, onFileContent }) => {
  const [expandedFolders, setExpandedFolders] = useState(new Set());

  const toggleFolder = (path) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const handleFileSelect = (file) => {
    onFileSelect(file);
    if (file.type === 'file') {
      onFileContent(file);
    }
  };

  const FileItem = ({ item, depth = 0 }) => {
    const isExpanded = expandedFolders.has(item.path);
    const isSelected = selectedFiles.includes(item.path);

    return (
      <div className="select-none">
        <div 
          className={`flex items-center gap-2 p-1 hover:bg-gray-200 rounded cursor-pointer ${
            isSelected ? 'bg-blue-100' : ''
          }`}
          style={{ paddingLeft: `${depth * 12}px` }}
          onClick={() => handleFileSelect(item)}
        >
          {item.type === 'dir' && (
            <span 
              onClick={(e) => {
                e.stopPropagation();
                toggleFolder(item.path);
              }}
              className="w-4"
            >
              {isExpanded ? 
                <FaChevronDown className="text-gray-500" /> : 
                <FaChevronRight className="text-gray-500" />
              }
            </span>
          )}
          
          {item.type === 'dir' ? (
            <>
              {isExpanded ? 
                <FaFolderOpen className="text-yellow-500" /> : 
                <FaFolder className="text-yellow-500" />
              }
              <span className="font-medium">{item.name}</span>
            </>
          ) : (
            <>
              <span className="w-4" /> {/* Spacing for alignment */}
              <FaFile className="text-gray-500" />
              <span>{item.name}</span>
            </>
          )}
        </div>

        {item.type === 'dir' && isExpanded && item.children && (
          <div className="ml-2">
            {item.children.map((child) => (
              <FileItem 
                key={child.path} 
                item={child} 
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-100 p-4 h-screen overflow-y-auto">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Repository Files</h2>
        <span className="text-sm text-gray-600">
          {selectedFiles.length} files selected
        </span>
      </div>
      <div className="space-y-1">
        {files.map((item) => (
          <FileItem key={item.path} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;