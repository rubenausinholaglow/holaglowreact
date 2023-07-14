import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ERROR_EMAIL_NOT_VALID } from '@utils/textConstants';
import { Button } from 'components/Buttons/Buttons';
import { Container, Flex } from 'components/Layouts/Layouts';
import { SvgSpinner } from 'icons/Icons';

import { SearchBarProps } from './utils/props';

const SearchUser: React.FC<SearchBarProps> = ({
  email,
  handleFieldChange,
  handleCheckUser,
  errors_,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    await handleCheckUser();
  };

  console.log(errors);

  return (
    <Container className="mt-12">
      <Flex layout="col-center">
        <div>
          <Flex layout="row-left">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register('Email', {
                  required: 'required error message',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'wrong email format error message',
                  },
                })}
                type="email"
                name="emailSearch"
                placeholder="Introduce tu teléfono, email o DNI"
                className="border rounded-lg px-4 py-2 mr-4 min-w-[300px]"
              />
              <p>{errors.Email?.type}</p>
              <Button type="submit" /* onClick={handleClick} */ style="primary">
                {isLoading ? <SvgSpinner height={24} width={24} /> : 'Buscar'}
              </Button>
            </form>
          </Flex>
          {/* {errors.includes(ERROR_EMAIL_NOT_VALID) && (
            <p className="text-red-500 text-left text-sm ml-2 mt-2">
              {ERROR_EMAIL_NOT_VALID}
            </p>
          )} */}
        </div>
      </Flex>
    </Container>
  );
};
export default SearchUser;
