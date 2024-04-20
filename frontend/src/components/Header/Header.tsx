import Logo from "./Logo";

const Header = () => {
  return (
    <header className="bg-gray-500 w-full py-2">
      <div className="container mx-auto flex items-center justify-between">
        <Logo />
      </div>
    </header>
  );
};

export default Header;
