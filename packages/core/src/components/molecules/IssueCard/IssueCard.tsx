import React from 'react';
import styled from 'styled-components';
import { Content } from '../ProjectBoard/ProjectBoard';

interface IssueCardProps {
  content: Content;
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(22, 27, 34);
`;

const Repository = styled.div`
  font-size: 12px;
  color: rgb(139, 148, 158);
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: rgb(201, 209, 217);
`;

export default function IssueCard({ content }: IssueCardProps) {
  const {
    title,
    repository,
  } = content;

  return (
    <Card>
      <Repository>
        {repository ? repository.name : 'Draft'}
      </Repository>
      <Title>
        {title}
      </Title>
    </Card>
  );
}