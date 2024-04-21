import Router from './routes';
import StoreProvider from './redux/provider';

import useGetUserNotifications from './hooks/useGetUserNotifications/useGetUserNotifications';
import useMarkNotificationAsRead from './hooks/useMarkAsReadNotification/useUpdateFriendshipStatus';

function App() {
  const { markNotificationAsRead, loading } = useMarkNotificationAsRead();

  const register = () => {
    markNotificationAsRead({id: "c7fe58cc-ef1e-4ab5-b0c8-c21b172ee2ca"});
  };
  if (loading) {
    console.log(!loading, 'userdata');
  }

  return (
    <StoreProvider>
      <button onClick={register}>REGISTER</button>
      <Router />
    </StoreProvider>
  );
}

export default App;
// 