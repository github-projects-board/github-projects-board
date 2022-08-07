import React from 'react';

export interface Option {
  __typename: string;
  id: string;
  name: string;
}

interface ColumnsProps {
  options: Option[];
}

export default function Columns({ options }: ColumnsProps) {
  return (
    <div>
      {options.map((option: Option) => {
        const { name } = option;
        return name;
      })}
    </div>
  );
}