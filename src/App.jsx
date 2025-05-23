import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./authorization/protected_route.jsx";

import Layout from "./layout.jsx";
import Player from "./pages/player.jsx";
import Home from "./pages/home.jsx";
import LoginPage from "./pages/login.jsx";
import SignupPage from "./pages/signup.jsx";
import NewPlaylist from "./pages/new_playlist.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LoginPage/>} />
            <Route path="player/:id" element={
              <ProtectedRoute>
                <Player />
              </ProtectedRoute>
            } />
            <Route path="home" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="signup" element={
              <SignupPage />
            } />
            <Route path="create-playlist" element={
              <ProtectedRoute>
                <NewPlaylist />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
