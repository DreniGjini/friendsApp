import useGetUsers from '../../hooks/useGetUsers/useGetUsers';
import { useAppSelector } from '../../redux/hooks';
import Card from './card/Card';

const People = () => {
  const { usersData } = useGetUsers();
  const { id } = useAppSelector((state) => state.authReducer);

  return (
    <div className="mt-14">
      <p className="text-white text-lg font-semibold mb-3">
        People you may know
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 ">
        {usersData
          .filter((user) => user.id !== id)
          .map((el) => (
            <Card key={el.id} list {...el} />
          ))}
      </div>
    </div>
  );
};

export default People;
