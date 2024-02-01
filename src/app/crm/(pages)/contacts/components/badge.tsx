import React from 'react';

interface BadgeProps {
  text: string;
  color: string;
}

interface BadgeInterProps {
  text: React.ReactNode;
}

const BadgeInfo = ({ text }: BadgeInterProps) => {
  return (
    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
      {text}
    </span>
  );
};

const BadgeError = ({ text }: BadgeInterProps) => {
  return (
    <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
      {text}
    </span>
  );
};

const BadgeSuccess = ({ text }: BadgeInterProps) => {
  return (
    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
      {text}
    </span>
  );
};

const BadgeWarning = ({ text }: BadgeInterProps) => {
  return (
    <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
      {text}
    </span>
  );
};

const BadgeGrey = ({ text }: BadgeInterProps) => {
  return (
    <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
      {text}
    </span>
  );
};

export default function Badge({ text, color }: BadgeProps) {
  return (
    <>
      {color === 'blue' && <BadgeInfo text={text} />}
      {color === 'red' && <BadgeError text={text} />}
      {color === 'green' && <BadgeSuccess text={text} />}
      {color === 'yellow' && <BadgeWarning text={text} />}
      {color === 'grey' && <BadgeGrey text={text} />}
    </>
  );
}
