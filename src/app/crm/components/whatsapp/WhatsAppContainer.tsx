import React from 'react';

interface WhatsAppContainerProps {
  children: React.ReactNode;
}

export default function WhatsAppContainer({
  children,
}: WhatsAppContainerProps) {
  return <div className="border flex flex-col">{children}</div>;
}
