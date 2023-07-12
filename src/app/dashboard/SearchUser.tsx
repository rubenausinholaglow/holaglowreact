import React, { useState } from 'react';
import { Button } from 'components/Buttons/Buttons';
import { Input } from 'components/Forms/Forms';
import { Container, Flex } from 'components/Layouts/Layouts';

import { SearchBarProps } from './utils/props';

const SearchUser: React.FC<SearchBarProps> = ({
  email,
  handleFieldChange,
  handleCheckUser,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await handleCheckUser();
    setIsLoading(false);
  };

  return (
    <Container className="mt-12">
      <Flex layout="row-center">
        <input
          onChange={event => handleFieldChange(event, 'email')}
          type="email"
          value={email}
          name="emailSearch"
          placeholder="Introduce tu teléfono, email o DNI"
          className="border rounded-lg px-4 py-2 mr-4 min-w-[300px]"
        />
        <Button onClick={handleClick} style="primary">
          {isLoading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          ) : (
            'Buscar'
          )}
        </Button>
      </Flex>
    </Container>
  );
};
export default SearchUser;
