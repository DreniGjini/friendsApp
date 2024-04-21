import Router from './routes';
import StoreProvider from './redux/provider';
import useMarkNotificationAsRead from './hooks/useMarkAsReadNotification/useUpdateFriendshipStatus';
import { useEffect } from 'react';
import {io} from "socket.io-client"

function App() {
  const { markNotificationAsRead, loading } = useMarkNotificationAsRead();
  const socket = io("http://localhost:8080?eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRpbmEiLCJ1c2VySWQiOiIzOTFhNTMwMy0xZDM4LTQ2YjAtYmI3OC0wYjBlMjA3NzU1YmEiLCJpYXQiOjE3MTM3MDg5MzgsImV4cCI6MTcxMzc0NDkzOH0.4Pr6_Yo7oFrmzThg7RbRsogKuL4RuPZinfqV1ry7WPI")
 
  useEffect(() => {
    socket.on('connect', () => {
      console.log("cinnected")
    })
  }, [])

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