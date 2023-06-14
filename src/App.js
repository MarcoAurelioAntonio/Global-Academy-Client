import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Courses from './components/Courses';
import Reservations from './components/Reservations';
import DisplayReservations from './components/DisplayReservations';
import Login from './components/Login';
import RouteProtection from './components/RouteProtection';
import AddReservation from './components/AddReservation';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/courses',
        element: (
          <RouteProtection>
            <Courses />
          </RouteProtection>
        ),
      },
      {
        path: '/reservations',
        element: (
          <RouteProtection>
            <Reservations />
          </RouteProtection>
        ),
      },
      {
        path: '/add-reservation',
        element: (
          <RouteProtection>
            <AddReservation />
          </RouteProtection>
        ),
      },
      {
        path: '/all_user_reservations',
        element: <DisplayReservations />,
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
