import React from 'react';

const authorize = async () => {
  await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GITHUB_BEARER_TOKEN}`,
    },
    body: JSON.stringify({ query: 'query { viewer { login } }' }),
  }).then((res) => res.json()).then((data) => console.log(data));
};

export default function App() {
  return (
    <button onClick={authorize} type="button">
      Authorize
    </button>
  );
}
