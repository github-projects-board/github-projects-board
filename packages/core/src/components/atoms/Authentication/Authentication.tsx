import React, {
  useEffect,
  useState,
} from 'react';

export type BearerToken = string | undefined;

export const authorize = async (bearerToken: BearerToken) => {
  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify({ query: 'query { viewer { login } }' }),
    });
    return await response.json();
  } catch (error) {
    return error;
  }
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
      authorize(bearerToken);
      setAuthorized(true);
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
