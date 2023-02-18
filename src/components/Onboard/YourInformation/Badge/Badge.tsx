import React, { useState } from 'react';

interface BadgeProps {
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (value: any) => void;
  defaultState?: boolean;
}

const Badge = ({ text, value, onClick, defaultState = false }: BadgeProps) => {
  const [isSelected, setIsSelected] = useState(defaultState);
  return (
    <div className='flex justify-center'>
      <span
        onClick={() => {
          setIsSelected(!isSelected);
          onClick && onClick(value);
        }}
        className={`cursor-pointer inline-flex items-center rounded-md  
            px-4 py-2 text-sm font-medium text-gray-800
            ${isSelected ? 'bg-gray-300' : 'bg-gray-100'}`}
      >
        {text}
      </span>
    </div>
  );
};

export default Badge;
