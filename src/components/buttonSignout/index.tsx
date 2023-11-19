import { useAuth } from '#/context/AuthContext';
import Button from '../button';

export const ButtonSignout = () => {
  const { logout } = useAuth();

  const signOut = () => {
    logout();
  };

  return (
    <div className="w-full px-6 pb-7 flex justify-center">
      <Button
        type="button"
        className="border-2 border-violet-700 bg-white-100 p-4 text-violet-700 w-full rounded-xl font-semibold text-xl tracking-wider"
        label="Cerrar sesión"
        onClick={signOut}
      />
    </div>
  );
};
