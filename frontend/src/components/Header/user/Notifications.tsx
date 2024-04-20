import BellIcon from "@heroicons/react/24/outline/BellIcon";
import Dropdown from "../../shared/dropDown";

const Notifications = () => {
  const ifNotifications = true;
  return (
    <div>
      <Dropdown
        iniciator={
          <span className="relative">
            {ifNotifications && (
              <span className="w-2 h-2 rounded-full animate-bounce bg-[red] absolute top-0 right-0" />
            )}
            <BellIcon className="w-6 h-6" />
          </span>
        }
      >
        <ul className="text-sm">
          <li className="mb-3">
            <p className="font-semibold">John doe</p>
            <p>Has update its status</p>
          </li>
          <li>
            <p className="font-semibold">Angie Martin</p>
            <p>Has messaged you</p>
          </li>
        </ul>
      </Dropdown>
    </div>
  );
};

export default Notifications;
