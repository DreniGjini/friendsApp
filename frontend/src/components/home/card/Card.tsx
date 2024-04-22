import {
  FlagIcon,
  NoSymbolIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import Modal from '../../shared/modal';
import Button from '../../shared/button';
import sendNotification from '../../../utils/sendNotification';
import { IUser } from '../../../interfaces/IUser';
import useSendFriendRequest from '../../../hooks/useSendFriendRequest/useSendFriendRequest';
import { useAppSelector } from '../../../redux/hooks';

interface ICardProps extends IUser {
  list?: boolean;
}

const Card: React.FC<ICardProps> = ({
  name,
  imgUrl,
  statuses,
  username,
  id,
  list = false,
}) => {
  const { sendFriendRequest, returnData } = useSendFriendRequest();
  const [isOpen, setIsOpen] = useState(false);

  const { id: currentUserId } = useAppSelector((state) => state.authReducer);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleNotificationClick = () => {
    sendNotification(name, 'Has muted notifications from you', imgUrl);
  };

  useEffect(() => {
    closeModal();
  }, [returnData]);

  return (
    <>
      {list ? (
        <div
          className="flex items-center py-3 text-white cursor-pointer"
          onClick={openModal}
        >
          <img
            className="h-20 w-20 rounded-full object-cover mr-4"
            src={imgUrl}
            alt=""
          />
          <div>
            <p className="font-semibold">{name}</p>
              <p className="font-light overflow-hidden max-h-12 break-words">
                @{username}
              </p>
          </div>
        </div>
      ) : (
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitFontSmoothing: 'subpixel-antialiased',
            willChange: 'transform',
          }}
          className="overflow-hidden rounded-xl bg-gray-500 text-white cursor-pointer transform-gpu transition-transform duration-500 hover:translate-y-[3px]"
          onClick={openModal}
        >
          <img className="h-44 w-full object-cover" src={imgUrl} alt="" />
          <div className="px-5 py-3">
            <p className="font-semibold">{name}</p>
            {statuses?.length && (
              <p className="font-light overflow-hidden max-h-16 break-words">
                {statuses[0].content}
              </p>
            )}
          </div>
        </div>
      )}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="p-5">
          <div className="flex flex-col md:flex-row items-center gap-5">
            <img
              className="w-40 h-32 rounded-3xl object-cover"
              src={imgUrl}
              alt=""
            />
            <div className="w-full">
              <div>
                <p className="font-semibold">{name}</p>
                <p >@{username}</p>
                {statuses?.length && <p>{statuses[0].content}</p>}
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mt-5">
                <Button dark className="flex items-center gap-2">
                  <FlagIcon className="w-5 h-5" />
                  <p>Report</p>
                </Button>
                <Button
                  dark
                  className="flex items-center gap-2"
                  onClick={handleNotificationClick}
                >
                  <NoSymbolIcon className="w-5 h-5" />
                  <p>Mute notifications</p>
                </Button>
                <Button
                  onClick={() =>
                    sendFriendRequest({
                      addresseeId: id,
                      requesterId: currentUserId,
                    })
                  }
                  dark
                  className="flex items-center gap-2"
                >
                  <UserPlusIcon className="w-5 h-5" />
                  <p>Request friend</p>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Card;
