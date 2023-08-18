import { store } from './src/Store/Store';
import { Provider } from 'react-redux';
import { AppNavigation } from './src/Navigation/AppNavigation';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
