import './App.css';
import './vendors/bootstrap.min.css';
import './vendors/fontawesome-free-5.15.4-web/css/all.min.css';
import {BrowserRouter, Routes, Route}
  from "react-router-dom";
import HomeScreen from "./components/HomeScreen"
import Login from "./components/Login/log-in";
import Register from "./components/Login/register";
import Profile from "./components/Profile";
import PrivacyPolicy from "./components/Privacy";

function App() {
  return (
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/">
              <Route index element={<HomeScreen />} />
              <Route path="home" exact={true} element={<HomeScreen />} />
              <Route path="login" element={<Login/>}/>
              <Route path="register" element={<Register/>}/>
              <Route path="profile" element={<Profile/>}/>
              <Route path="privacy" element={<PrivacyPolicy/>}/>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
