import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import ECommerce from './pages/Dashboard/ECommerce';
import Settings from './pages/Settings';
import Profile from './pages/Profile.tsx';
import Events from './pages/Events.tsx';
import AddEvent from './pages/Event/Add.tsx';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import FormLayout from './pages/Form/FormLayout.tsx';
import FormElements from './pages/Form/FormElements.tsx';


function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <AuthProvider>
      {loading ? (
        <Loader />
      ) : (
        <>
      <Routes>
        <Route
          index
          element={
            <PrivateRoute>
              <PageTitle title="Find Your Smile | Dashboard" />
              <ECommerce />
            </PrivateRoute>
          }
        />
        <Route
          path="/form"
          element={
            <PrivateRoute>
              <PageTitle title="Find Your Smile | Events" />
              <FormLayout />
            </PrivateRoute>
          }
        />
        <Route
          path="/elements"
          element={
            <PrivateRoute>
              <PageTitle title="Find Your Smile | Events" />
              <FormElements />
            </PrivateRoute>
          }
        />
        <Route
          path="/events"
          element={
            <PrivateRoute>
              <PageTitle title="Find Your Smile | Events" />
              <Events />
            </PrivateRoute>
          }
        />
        <Route
          path="/events/add"
          element={
            <PrivateRoute>
              <PageTitle title="Find Your Smile | Events" />
              <AddEvent />
            </PrivateRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <PrivateRoute>
              <PageTitle title="Find Your Smile | Calendar" />
              <Calendar />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <PageTitle title="Find Your Smile | Profile" />
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <PageTitle title="Find Your Smile | Settings" />
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Find Your Smile | Signin" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Find Your Smile | Signup" />
              <SignUp />
            </>
          }
        />
      </Routes>
        </>
      )}
    </AuthProvider>
  );
}

export default App;
