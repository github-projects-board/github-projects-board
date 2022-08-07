import React from 'react';
import {
  useQuery,
  gql,
} from '@apollo/client';
import styled from 'styled-components';
import
  Authentication, {
  BearerToken,
} from '../../atoms/Authentication/Authentication';
import Column from '../Column/Column';

export interface Option {
  __typename: string;
  id: string;
  name: string;
}

export interface ProjectBoardProps {
  bearerToken: BearerToken;
}

// project node id PVT_kwHOBXyyXM4ABZY9
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
                  fieldValues(last: 1) {
                    nodes {
                      ... on ProjectV2ItemFieldSingleSelectValue {
                        name
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
      }
    }
  }
`;

const Board = styled.div`
  overflow-x: scroll;
  display: flex;
  gap: 10px;
  width: max-content;
`;


export default function ProjectBoard({ bearerToken }: ProjectBoardProps) {
  const { data } = useQuery(GET_PROJECT_COLUMNS);
  const options  = data?.user.projectV2.field.options;

  return (
    <div>
      <Authentication bearerToken={bearerToken} />
      <Board>
        {data && options.map((option: Option) => {
          const { name } = option;
          return (
            <Column
              key={name}
              name={name}
            />
          );
        })}
      </Board>
    </div>
  );
}
