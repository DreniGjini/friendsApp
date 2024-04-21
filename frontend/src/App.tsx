import Router from './routes';
import StoreProvider from './redux/provider';

function App() {
  return (
    <StoreProvider>
      <Router />
    </StoreProvider>
  );
}

export default App;
