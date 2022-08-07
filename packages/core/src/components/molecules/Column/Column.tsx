import React from 'react';
import styled from 'styled-components';

interface ColumnProps {
  name: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  height: 10em;
  width: 25em;
  border-radius: 6px;
`;

const Header = styled.div`
  display: flex;
  padding: 8px;
`;

const Title = styled.div`
  font-size: 1em;
  font-weight: bold;
  padding-left: 0.2em;
  padding-right: 0.2em;
  border: 3px solid transparent;
  border-radius: 8px;
  &:hover {
    border-color: #ccc;
  }
`;

export default function Column({ name }: ColumnProps) {
  return (
    <Container>
      <Header>
        <Title>
          {name}
        </Title>
      </Header>
    </Container>
  );
}