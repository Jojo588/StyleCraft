import { HashRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SignInPage from './pages/SignInPage';
import FashionCustomizer from './pages/FashionCustomizer';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import LetsTalkFashionPage from './pages/LetsTalkFashionPage';
import RecentDiscussionsPage from './pages/RecentDiscussionsPage';
import Layout from './components/Layout';
import DiscussionDetailPage from './pages/DiscussionDetailPage';
import SignupPage from './pages/SignupPage';
import ScrollToTop from './ScrollToTop.js';
import ProtectedRoute from './components/ProtectedRoute';
const AppWithLoader = () => {
  const [discussions, setDiscussions] = useState([]);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [choseToLogout, setChoseToLogout] = useState('yes')
  

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('styleCraftUserData');
    return saved ? JSON.parse(saved) : [];
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('styleCraftIsLoggedIn') === 'true';
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('styleCraftCurrentUser');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem("styleCraftUserData", JSON.stringify(data));
    localStorage.setItem("styleCraftIsLoggedIn", JSON.stringify(isLoggedIn));
    if (currentUser) {
      localStorage.setItem("styleCraftCurrentUser", JSON.stringify(currentUser));
    }
  }, [data, isLoggedIn, currentUser]);

  function handleLogOut(){
    setShowLogoutPopup(true);
  }

  function confirmLogOut() {
    if (choseToLogout) {
      setIsLoggedIn(false);
      setCurrentUser(null);
      localStorage.removeItem("styleCraftCurrentUser");
      localStorage.setItem("styleCraftIsLoggedIn", false);
    }
    else{
      return;
    }
  }

  useEffect(() => {
    const stored = localStorage.getItem("discussions");
    if (stored) {
      const parsed = JSON.parse(stored);
      setDiscussions(parsed.map(d => (d.id ? d : { ...d, id: uuidv4() })));
    }
  }, []);

  useEffect(() => {
    if (discussions.length > 0) {
      localStorage.setItem("discussions", JSON.stringify(discussions));
    }
  }, [discussions]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              isLoggedIn={isLoggedIn}
              handleLogOut={handleLogOut}
              confirmLogOut={confirmLogOut}
              showLogoutPopup={showLogoutPopup}
              setShowLogoutPopup={setShowLogoutPopup}
              setChoseToLogout={setChoseToLogout}
            />
          }
        >
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/gallery"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <GalleryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lets-talk-fashion"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <LetsTalkFashionPage
                  discussions={discussions}
                  setDiscussions={setDiscussions}
                  currentUser={currentUser}

                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recent-discussions"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <RecentDiscussionsPage
                  discussions={discussions}
                  setDiscussions={setDiscussions}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/discussion-detail/:id"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <DiscussionDetailPage
                  discussions={discussions}
                  setDiscussions={setDiscussions}
                  currentUser={currentUser}
                />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="/sign-in"
          element={
            <SignInPage
              data={data}
              setIsLoggedIn={setIsLoggedIn}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/sign-up"
          element={
            <SignupPage
              data={data}
              setData={setData}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/fashion-customizer"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <FashionCustomizer />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

const App = () => (
  <HashRouter>
    <ScrollToTop />
    <AppWithLoader />
  </HashRouter>
);

export default App;
