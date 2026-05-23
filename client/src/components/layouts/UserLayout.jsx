import { Outlet } from 'react-router-dom';
import Header from '@components/layouts/Header';
import Footer from '@components/layouts/Footer';

const UserLayout = () => {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;

