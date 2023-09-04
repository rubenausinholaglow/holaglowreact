'use client';

import React, { useEffect, useState } from 'react';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';

export default function Page() {
  useEffect(() => {}, []);

  return (
    <Container>
      <Flex layout="col-center">
        <p className="font-bold text-2xl mt-12 mb-4">¡Hola!</p>
        <p className="font-bold text-2xl mb-6">
          Preparad@ para ver
          <br />
          tu glow?
        </p>
        <Button href="/dashboard/menu" type="primary" size="lg">
          Menu
        </Button>
      </Flex>
    </Container>
  );
}
