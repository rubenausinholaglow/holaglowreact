import React from 'react';

interface WhatsAppContainerProps {
  children: React.ReactNode;
}

export default function WhatsAppContainer({
  children,
}: WhatsAppContainerProps) {
  return <div className="flex flex-col">{children}</div>;
}
