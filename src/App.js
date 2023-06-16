import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import CourseDetails from './components/CourseDetails';
import DisplayReservations from './components/DisplayReservations';
import Login from './components/Login';
import RouteProtection from './components/RouteProtection';
import AddReservation from './components/AddReservation';
import Home from './components/Home';
import AddCourse from './components/AddCourse';
import DeleteCourse from './components/DeleteCourse';

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
      {
        path: '/add_course',
        element: <AddCourse />,
      },
      {
        path: '/delete_course',
        element: <DeleteCourse />,
      },
      {
        path: '/home',
        element: <Home />,
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
