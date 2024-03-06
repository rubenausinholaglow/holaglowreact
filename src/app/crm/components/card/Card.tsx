import React from 'react';

interface CardProps {
  title: string;
  number: number;
  backgroundColor: string;
}

const Card = ({ title, number, backgroundColor }: CardProps) => {
  return (
    <div className="text-white max-w-sm mx-auto rounded-xl shadow-md overflow-hidden m-4 text-center" style={{backgroundColor: backgroundColor}}>
      <div className="px-6 py-4">
        <div className="font-bold text-sm mb-2">{title}</div>
        <p className="font-bold text-base">{number}%</p>
      </div>
    </div>
  );
};

export default Card;
