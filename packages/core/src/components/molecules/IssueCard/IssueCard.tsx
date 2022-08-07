import React from 'react';
import styled from 'styled-components';
import { Content } from '../ProjectBoard/ProjectBoard';
import Label from '../../atoms/IssueLabel/IssueLabel';
import IssueCompletion from '../../atoms/IssueCompletion/IssueCompletion';

interface IssueCardProps {
  content: Content;
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: rgb(22, 27, 34);
  padding: 12px;
  border-radius: 10px;
`;

const Repository = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  font-size: 12px;
  color: rgb(139, 148, 158);
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: rgb(201, 209, 217);
`;

const Labels = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

export default function IssueCard({ content }: IssueCardProps) {
  const {
    title,
    repository,
    labels,
    number,
  } = content;

  return (
    <Card>
      <Repository>
        <IssueCompletion />
        {repository ? `${repository.name} #${number}` : 'Draft'}
      </Repository>
      <Title>
        {title}
      </Title>
      <Labels>
        {labels && labels.nodes.map(label => (
          <Label 
            key={label.name}
            labelProperties={label}
          />))
        }
      </Labels>
    </Card>
  );
}