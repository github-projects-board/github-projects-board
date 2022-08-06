import React from 'react';
import GithubProjectBoard from './components/molecules/GithubProject/GithubProject';

export default function App() {
  return (
    <GithubProjectBoard bearerToken={process.env.REACT_APP_GITHUB_BEARER_TOKEN} />
  );
}
