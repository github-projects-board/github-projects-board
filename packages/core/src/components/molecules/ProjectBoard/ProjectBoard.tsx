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
import IssueCard from '../IssueCard/IssueCard';

export interface Option {
  id: string;
  name: string;
  __typename: string;
}

export interface ProjectBoardProps {
  bearerToken: BearerToken;
}

export interface User {
  avatarUrl: string;
  name: string;
  __typename: 'User';
}

export interface Assignee {
  nodes: User[];
  __typename: 'UserConnection';
}

export interface Label {
  name: string;
  color: string;
  __typename: 'Label';
}

export interface Labels {
  nodes: Label[];
  __typename: 'LabelConnection';
}

export interface Repository {
  name: string;
  __typename: 'Repository';
}

export interface Status {
  name: string;
  __typename: 'ProjectV2ItemFieldSingleSelectValue';
}

export interface Content {
  id: string;
  assignees: Assignee;
  body: string;
  bodyText: string;
  closed: boolean;
  labels: Labels;
  repository: Repository;
  title: string;
  __typename: 'Issue';
}

export interface Issue {
  content: Content;
  fieldValues: {
    nodes: Status[];
    __typename: 'ProjectV2ItemFieldValueConnection';
  };
  __typename: 'ProjectV2Item';
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
  height: 40em;
`;

export default function ProjectBoard({ bearerToken }: ProjectBoardProps) {
  const { data } = useQuery(GET_PROJECT_COLUMNS);
  const options  = data?.user.projectV2.field.options;
  const issues = data?.user.projectV2.field.project.items.nodes;
  console.log('ISSUES:', issues);

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
            >
              {issues.map((issue: Issue) => {
                const {
                  content,
                  fieldValues,
                } = issue;
                return fieldValues.nodes[0].name === name && (
                  <IssueCard
                    key={content.id}
                    content={content}
                  />
                );
              })}
            </Column>
          );
        })}
      </Board>
    </div>
  );
}
