import React from 'react';
import styled from 'styled-components';
import { Label as LabelType } from '../../molecules/ProjectBoard/ProjectBoard';

interface IssueLabelProps {
  labelProperties: LabelType;
}

const Label = styled.div`
  padding: 2px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  padding: 2px 7px;
  background-color: ${props => props.color + '50'};
  color: ${props => props.color};
`;

const LabelBorder = styled.div`
  border: 1px solid ${props => props.color};
  border-radius: 999px;
`;

export default function IssueLabel({ labelProperties }: IssueLabelProps) {
  const {
    name,
    color,
  } = labelProperties;

  return (
    <LabelBorder color={`#${color}`}>
      <Label color={`#${color}`}>
        {name}
      </Label>
    </LabelBorder>
  );
}