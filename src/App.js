import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import CourseDetails from './components/CourseDetails';
import Reservations from './components/Reservations';
import DisplayReservations from './components/DisplayReservations';
import Login from './components/Login';
import RouteProtection from './components/RouteProtection';
import AddReservation from './components/AddReservation';
import Home from './components/Home';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        index: true,
        element: (
          <RouteProtection>
            <Home />
          </RouteProtection>
        ),
      },
      {
        path: '/courses/:id',
        element: <CourseDetails />,
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
        element: <RouteProtection><DisplayReservations /></RouteProtection>,
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
