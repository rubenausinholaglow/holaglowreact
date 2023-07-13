import React, { useState } from 'react';
import { ERROR_EMAIL_NOT_VALID } from '@utils/textConstants';
import { Button } from 'components/Buttons/Buttons';
import { Container, Flex } from 'components/Layouts/Layouts';
import { SvgSpinner } from 'icons/Icons';

import { SearchBarProps } from './utils/props';

const SearchUser: React.FC<SearchBarProps> = ({
  email,
  handleFieldChange,
  handleCheckUser,
  error,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await handleCheckUser();
    setIsLoading(false);
  };
  return (
    <Container className="mt-12">
      <Flex layout="col-center">
        <div>
          <Flex layout="row-left">
            <input
              onChange={event => handleFieldChange(event, 'email')}
              type="email"
              value={email}
              name="emailSearch"
              placeholder="Introduce tu teléfono, email o DNI"
              className="border rounded-lg px-4 py-2 mr-4 min-w-[300px]"
            />
            <Button onClick={handleClick} style="primary">
              {isLoading ? <SvgSpinner height={24} width={24} /> : 'Buscar'}
            </Button>
          </Flex>
          {error === ERROR_EMAIL_NOT_VALID && (
            <p className="text-red-500 text-left text-sm ml-2 mt-2">{error}</p>
          )}
        </div>
      </Flex>
    </Container>
  );
};
export default SearchUser;
