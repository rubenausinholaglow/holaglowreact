import TextInputField from '@dashboardComponents/TextInputField';
import { HOLAGLOW_COLORS } from '@utils/colors';
import { SvgHolaglow, SvgSpinner } from 'app/icons/Icons';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';

interface AuthenticationProps {
  email: string;
  password: string;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  handleLogin: () => void;
  errorMessage?: string;
  errorEmail?: string;
}

const AuthenticationComponent: React.FC<AuthenticationProps> = ({
  email,
  password,
  handleEmailChange,
  handleChangePassword,
  isLoading,
  handleLogin,
  errorMessage,
  errorEmail,
}) => {
  return (
    <Flex className="items-center justify-center flex-col p-4 h-[800px]">
      <div className="flex mb-4">
        <SvgHolaglow
          fill={HOLAGLOW_COLORS['secondary']}
          className="h-[24px] lg:h-[32px] w-[98px] lg:w-[130px]"
        />
        <p className={`ml-4 font-bold text-xl text-hg-secondary`}>CRM</p>
      </div>

      <div className="mb-4">
        <TextInputField
          placeholder="Email"
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          hasNoValidation
          error={errorEmail}
        />
      </div>
      <div className="mb-4">
        <TextInputField
          label="Contraseña"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={handleChangePassword}
          hasNoValidation
          style={false}
        />
      </div>
      <Button onClick={handleLogin} className="mb-4">
        {isLoading ? (
          <SvgSpinner className="w-full justify-center" />
        ) : (
          'Entrar'
        )}
      </Button>
      {errorMessage && (
        <p className="text-hg-error text-left text-sm ml-2 mt-2">
          {errorMessage}
        </p>
      )}
    </Flex>
  );
};

export default AuthenticationComponent;
