'use client';

import React from 'react';
import { useGlobalStore } from 'app/stores/globalStore';
import { Flex } from 'designSystem/Layouts/Layouts';

export default function Home() {
  const { isModalOpen, isMainScrollEnabled } = useGlobalStore(state => state);

  return (
    <Flex layout="col-center" className="text-center h-[1500px]">
      <p className="pt-[500px]">
        isModalOpen - {isModalOpen ? 'true' : 'false'}
      </p>
      <p>isMainScrollEnabled - {isMainScrollEnabled ? 'true' : 'false'}</p>
    </Flex>
  );
}
