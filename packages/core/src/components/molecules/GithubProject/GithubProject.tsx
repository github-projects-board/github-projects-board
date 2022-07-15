import React from 'react';
import Authentication, {
  BearerToken,
} from '../../atoms/Authentication/Authentication';

export interface IGithubProject {
  bearerToken: BearerToken;
}

export default function GithubProject({ bearerToken }: IGithubProject) {
  return (
    <div>
      <Authentication bearerToken={bearerToken} />
    </div>
  );
}
