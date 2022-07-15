import React, {
  useEffect,
  useState,
} from 'react';

export type BearerToken = string | undefined;

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

export interface IAuthentication {
  bearerToken: BearerToken;
}

function Authentication({ bearerToken }: IAuthentication) {
  const [
    isAuthorized,
    setAuthorized,
  ] = useState(false);
  useEffect(() => {
    if (!isAuthorized && bearerToken) {
      try {
        authorize(bearerToken);
        setAuthorized(true);
      } catch (error) {
        setAuthorized(false);
      }
    }
  }, [
    isAuthorized,
    bearerToken,
  ]);
  return (
    <div>
      {
        isAuthorized
          ? null
          : 'Not Authorized: Authentication failed or not provided.'
      }
    </div>
  );
}

export default Authentication;
