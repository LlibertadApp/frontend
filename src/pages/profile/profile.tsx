import { observer } from 'mobx-react-lite';
import { DataProfile } from '#/components';
import { ButtonSignout } from '#/components/buttonSignout';
import { useAuth } from '#/context/AuthContext';
import './styles.css';
import Navbar from '#/components/navbar';
import { paths } from '#/routes/paths';

const ProfilePage = () => {
  const { user } = useAuth();
  return (
    <>
      <Navbar routerLink={paths.home} />
      <main className="min__height-main flex justify-between flex-col px-4 profile__design bg-white">
        {user && <DataProfile user={user} />}
        <ButtonSignout />
      </main>
    </>
  );
};

export const Profile = observer(ProfilePage);

export default Profile;
