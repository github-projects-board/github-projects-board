import React from 'react';
import GithubProject from './components/molecules/GithubProject/GithubProject';

export default function App() {
  return (
    <GithubProject bearerToken={process.env.REACT_APP_GITHUB_BEARER_TOKEN} />
  );
}
