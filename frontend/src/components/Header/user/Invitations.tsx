import { UserGroupIcon } from '@heroicons/react/24/outline';
import Dropdown from '../../shared/dropDown';

const Invitations = () => {
  const ifNotifications = true;
  return (
    <div>
      <Dropdown
        iniciator={
          <span className="relative">
            {ifNotifications && (
              <span className="w-2 h-2 rounded-full animate-bounce bg-[red] absolute top-0 right-0" />
            )}
            <UserGroupIcon className="w-6 h-6" />
          </span>
        }
      >
        <ul className="text-sm">
          <li className="mb-3">
            <p className="font-semibold">John doe</p>
            <p>Sent you invitation</p>
          </li>
          <li>
            <p className="font-semibold">Angie Martin</p>
            <p>Sent you invitation</p>
          </li>
        </ul>
      </Dropdown>
    </div>
  );
};

export default Invitations;
