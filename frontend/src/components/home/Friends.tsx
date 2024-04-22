import useGetFriends from '../../hooks/useGetFriends/useGetFriends';
import Card from './card/Card';
import { IFriend } from '../../interfaces/IFriend';
import { IUser } from '../../interfaces/IUser';

const Friends = () => {
  const { friendsData } = useGetFriends();
  const displayUser = (el: IFriend): IUser => {
    return el.addressee ? el.addressee : el.requester;
  };

  return (
    <div>
      <p className="text-white text-lg font-semibold mb-3">Friends</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 ">
        {friendsData.map((el) => (
          <Card key={el.id} {...displayUser(el)} />
        ))}
      </div>
    </div>
  );
};

export default Friends;
