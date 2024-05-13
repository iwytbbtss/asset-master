import PasswordForm from './PasswordForm';
import Session from './Session';

const Auth = () => {
  return (
    <main className='flex flex-col justify-center items-center w-full h-screen'>
      <Session />
      <PasswordForm />
    </main>
  );
};

export default Auth;
