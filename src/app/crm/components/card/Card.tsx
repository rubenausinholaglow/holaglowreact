import React from 'react';

interface CardProps {
  title: string;
  number: number;
}

const Card = ({ title, number }: CardProps) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden m-4">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{number}%</p>
      </div>
    </div>
  );
};

export default Card;
