import LockIcon from '@heroicons/react/24/outline/LockClosedIcon';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/">
      <div className="w-14 h-14 rounded-full bg-gray-400 flex items-center justify-center">
        <LockIcon className="w-8 h-8 bg-gray-100 text-white opacity-50" />
      </div>
    </Link>
  );
};

export default Logo;
