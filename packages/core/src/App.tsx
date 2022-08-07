import React from 'react';
import ProjectBoard from './components/molecules/ProjectBoard/ProjectBoard';

export default function App() {
  return (
    <ProjectBoard bearerToken={process.env.REACT_APP_GITHUB_BEARER_TOKEN} />
  );
}
