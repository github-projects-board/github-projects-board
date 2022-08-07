import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface ColumnProps {
  name: string;
  children: ReactNode;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(1, 4, 9);
  width: 350px;
  height: 100%;
  border-radius: 6px;
`;

const Header = styled.div`
  display: flex;
  padding: 8px;
`;

const Title = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  padding-left: 0.2em;
  padding-right: 0.2em;
  border: 2px solid transparent;
  border-radius: 8px;
  color: rgb(201, 209, 217);
  &:hover {
    border-color: #ccc;
  }
`;

const ScrollArea = styled.div`
  overflow-y: scroll;
  height: 100%;
`;

export default function Column({
  name,
  children
}: ColumnProps) {
  return (
    <Container>
      <Header>
        <Title>
          {name}
        </Title>
      </Header>
      <ScrollArea>
        {children}
      </ScrollArea>
    </Container>
  );
}