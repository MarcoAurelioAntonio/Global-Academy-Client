import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import Reservations from './components/Reservations';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '/courses',
        element: <Courses />,
      },
      {
        path: '/courses/:id',
        element: <CourseDetails />,
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
