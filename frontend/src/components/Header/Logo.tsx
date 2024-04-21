import LockIcon from '@heroicons/react/24/outline/LockClosedIcon';

const Logo = () => {
  return (
    <div className="w-14 h-14 rounded-full bg-gray-400 flex items-center justify-center">
      <LockIcon className="w-8 h-8 bg-gray-100 text-white opacity-50" />
    </div>
  );
};

export default Logo;
