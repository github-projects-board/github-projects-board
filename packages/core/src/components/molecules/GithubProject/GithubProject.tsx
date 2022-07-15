import React, {
  useEffect,
  useState,
} from 'react';

type BearerToken = string | undefined;

export interface IGithubProject {
  bearerToken: BearerToken;
}

const authorize = async (bearerToken: BearerToken) => {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
    body: JSON.stringify({ query: 'query { viewer { login } }' }),
  });
  return response.json();
};

export default function GithubProject({ bearerToken }: IGithubProject) {
  const [
    isAuthorized,
    setAuthorized,
  ] = useState(false);
  useEffect(() => {
    if (!isAuthorized && bearerToken) {
      authorize(bearerToken);
      setAuthorized(true);
    }
  }, [
    isAuthorized,
    bearerToken,
  ]);
  return (
    <div>
      Project Board
    </div>
  );
}
