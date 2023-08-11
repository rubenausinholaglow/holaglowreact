'use client';

import React from 'react';
import { useGlobalStore } from 'app/stores/globalStore';
import { Flex } from 'components/Layouts/Layouts';

export default function Home() {
  const isModalOpen = useGlobalStore(state => state.isModalOpen);
  const isMainScrollEnabled = useGlobalStore(
    state => state.isMainScrollEnabled
  );

  return (
    <Flex layout="col-center" className="text-center h-[1500px]">
      <p className="pt-[500px]">
        isModalOpen - {isModalOpen ? 'true' : 'false'}
      </p>
      <p>isMainScrollEnabled - {isMainScrollEnabled ? 'true' : 'false'}</p>
    </Flex>
  );
}
