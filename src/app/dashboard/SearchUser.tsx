import React, { useState } from 'react';
import { SearchBarProps } from './utils/props';

const SearchUser: React.FC<SearchBarProps> = ({ email, handleFieldChange, handleCheckUser }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await handleCheckUser();
    setIsLoading(false);
  };

  return (
    <div id="buscar" className='w-3/4'>
      <div className="bg-gray-50 p-10 rounded-2xl flex">
        <div className="flex flex-col items-start flex-1">
          <input
            onChange={(event) => handleFieldChange(event, 'email')}
            type="email"
            value={email}
            name="emailSearch" 
            className="w-full h-full mt-1 border-2 border-gray rounded-md  text-black"
            placeholder="Introduce tu teléfono, email o DNI"
          />
        </div>
        <div className='flex flex-col flex-1'>
          <button
            onClick={handleClick}
            type="submit"
            className="inline-flex justify-center items-center w-full h-full px-5 py-3 ml-6 text-lg font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            ) : (
              'Buscar'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
