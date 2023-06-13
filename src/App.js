import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Reservations from './components/Reservations';
import Home from './components/Home';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/reservations',
        element: <Reservations />,
      },
    ],
  },
]);

function App() {
  return (
    <main className="main-app">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </main>
  );
}

export default App;
