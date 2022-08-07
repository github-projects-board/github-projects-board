import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface ColumnProps {
  name: string;
  children: ReactNode | ReactNode[];
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

const IssueCount = styled.span`
  display: inline-block;
  padding: 2px 5px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  border-radius: 20px;
  background-color: rgba(110, 118, 129, 0.4);
  color: rgb(139, 148, 158);
  margin-left: 8px;
`;

const ScrollArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  overflow-y: scroll;
  height: 100%;
`;

export default function Column({
  name,
  children
}: ColumnProps) {
  const [issueCount, setIssueCount] = React.useState(0);

  React.useEffect(() => {
    if (Array.isArray(children)) {
      const childrenLength = children.filter((child) => child).length;
      setIssueCount(childrenLength);
    }
  } , [children]);

  return (
    <Container>
      <Header>
        <Title>
          {name}
          <IssueCount>
            {issueCount}
          </IssueCount>
        </Title>
      </Header>
      <ScrollArea>
        {children}
      </ScrollArea>
    </Container>
  );
}