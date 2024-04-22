import { ReactNode } from 'react';
import { NotificationStatus } from '../../../common/enums';

interface IUserItemProps {
  name: string;
  img: string;
  children: ReactNode;
  className?: string;
  description: string;
  opened: boolean;
  clickEvent?: () => void;
}

const UserItemList: React.FC<IUserItemProps> = ({
  name,
  img,
  children,
  className,
  description,
  opened,
  clickEvent,
}) => {
  return (
    <li
      onClick={clickEvent}
      className={`${className} cursor-pointer justify-between flex p-3 gap-5 border-b border-gray-300 items-center last:border-none ${
        opened ? '' : 'bg-gray-300 bg-opacity-10'
      }`}
    >
      <div className="flex items-center gap-2">
        <img
          alt="assignment"
          className="w-10 h-10 object-cover rounded-full border-2 border-gray-500"
          src={img}
        />
        <div>
          <p className="font-semibold">{name}</p>
          <p className={`${opened ? '' : 'font-semibold'}`}>{description}</p>
        </div>
      </div>
      {children}
    </li>
  );
};

export default UserItemList;
