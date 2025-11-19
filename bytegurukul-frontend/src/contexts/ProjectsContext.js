// contexts/ProjectsContext.js
import React, { createContext, useState, useContext } from 'react';
import { projectAPI } from '../services/api.js';

const ProjectsContext = createContext();

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async (filters = {}) => {
    setLoading(true);
    try {
      const response = await projectAPI.getProjects(filters);
      setProjects(response.data.data);
      return response.data;
    } catch (error) {
      console.error('Fetch projects error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    projects,
    loading,
    fetchProjects
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
}