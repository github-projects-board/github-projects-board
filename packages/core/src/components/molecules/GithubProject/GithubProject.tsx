import React from 'react';
import {
  useQuery,
  gql,
} from '@apollo/client';
import styled from 'styled-components';
import Authentication, {
  BearerToken,
} from '../../atoms/Authentication/Authentication';

export interface GithubProjectBoardProps {
  bearerToken: BearerToken;
}

export interface Option {
  __typename: string;
  id: string;
  name: string;
}

// PVT_kwHOBXyyXM4ABZY9
const GET_PROJECT_COLUMNS = gql`
  query GetProject {
  user(login: "michaelballos") {
    projectV2(number: 1) {
      field(name: "Status") {
        ... on ProjectV2SingleSelectField {
          id
          name
          options {
            id
            name
          }
          project {
            items(first: 40) {
              nodes {
                content {
                  ... on Issue {
                    id
                    number
                    repository {
                      name
                    }
                    title
                    body
                    closed
                    bodyText
                    labels(first: 10) {
                      nodes {
                        name
                        color
                      }
                    }
                    assignees(first: 10) {
                      nodes {
                        name
                        avatarUrl
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

const Board = styled.div`
  display: flex;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function GithubProjectBoard({ bearerToken }: GithubProjectBoardProps) {
  const { data } = useQuery(GET_PROJECT_COLUMNS);
  console.log('ISSUES:', data?.user.projectV2.field.options);

  return (
    <div>
      <Authentication bearerToken={bearerToken} />
      <Board>
        <Column>
          {data?.user.projectV2.field.options.map((option: Option) => {
            const { name } = option;
            return name;
          })}
        </Column>
      </Board>
    </div>
  );
}
