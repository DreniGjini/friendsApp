import Logo from './Logo';
import Sign from './user/User';

const Header = () => {
  return (
    <header className="bg-gray-500 w-full py-2">
      <div className="container mx-auto flex items-center justify-between">
        <Logo />
        <Sign />
      </div>
    </header>
  );
};

export default Header;
