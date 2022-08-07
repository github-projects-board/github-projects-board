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

// PVT_kwHOBXyyXM4ABZY9
const GET_PROJECT_COLUMNS = gql`
  query {
    node(id: "PVT_kwHOBXyyXM4ABZY9") {
      ... on ProjectV2 {
        items(first: 40) {
          nodes {
            id
            fieldValues(last: 1) {
              nodes {
                ... on ProjectV2ItemFieldSingleSelectValue {
                  name
                  field {
                    ... on ProjectV2FieldCommon {
                      name
                    }
                  }
                }
              }
            }
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
`;

const Board = styled.div`
  display: flex;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function GithubProjectBoard({ bearerToken }: GithubProjectBoardProps) {
  const {
    data,
  } = useQuery(GET_PROJECT_COLUMNS);
  const issues = data?.node?.items?.nodes;
  console.log(issues);

  return (
    <div>
      <Authentication bearerToken={bearerToken} />
      <Board>
        <Column>
          Columns
        </Column>
      </Board>
    </div>
  );
}
