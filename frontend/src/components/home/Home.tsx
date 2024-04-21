import Header from '../header/Header';
import Friends from './Friends';
import People from './People';
import User from './User';

const Home = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto mt-10">
        <User />
        <Friends />
        <People />
      </div>
    </div>
  );
};

export default Home;
