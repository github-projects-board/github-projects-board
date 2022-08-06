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
const GET_PROJECT = gql`
   query GetProject($numberOfIssues: Int!, $numberOfFieldValues: Int!, $numberOfAssignees: Int!, $numberOfLabels: Int!) {
    node(id: "PVT_kwHOBXyyXM4ABZY9") {
        ... on ProjectV2 {
          items(first: $numberOfIssues) {
            nodes {
              id
              fieldValues(first: $numberOfFieldValues) {
                nodes {                
                  ... on ProjectV2ItemFieldTextValue {
                    text
                    field {
                      ... on ProjectV2FieldCommon {
                        name
                      }
                    }
                  }
                  ... on ProjectV2ItemFieldDateValue {
                    date
                    field {
                      ... on ProjectV2FieldCommon {
                        name
                      }
                    }
                  }
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
                ... on DraftIssue {
                  title
                  body
                }
                ...on Issue {
                  title
                  assignees(first: $numberOfAssignees) {
                    nodes{
                      login
                    }
                  }
                  labels(first: $numberOfLabels) {
                    nodes {
                      name
                      color
                    }
                  }
                }
                ...on PullRequest {
                  title
                  assignees(first: $numberOfAssignees) {
                    nodes {
                      login
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

export default function GithubProjectBoard({ bearerToken }: GithubProjectBoardProps) {
  const { data } = useQuery(GET_PROJECT, {
    variables: {
      numberOfIssues: 50,
      numberOfFieldValues: 30,
      numberOfAssignees: 20,
      numberOfLabels: 10,
    },
  });
  console.log(data);

  return (
    <div>
      <Authentication bearerToken={bearerToken} />
      <Board>
        Board
      </Board>
    </div>
  );
}
