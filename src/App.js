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
import Header from "./components/Header";
import React from "react";
import EditProfile from "./components/Profile/EditProfile";
import userReducer from "./reducers/user-reducer";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";

function App() {

  const reducer = combineReducers({
    users: userReducer
  });
  const store = createStore(reducer);
  return (
      <Provider store={store}>
      <BrowserRouter>
        <div className="container">
          <Header/>
          <Routes>
            <Route path="/">
              <Route index element={<HomeScreen />} />
              <Route path="home" exact={true} element={<HomeScreen />} />
              <Route path="login" element={<Login/>}/>
              <Route path="register" element={<Register/>}/>
              <Route path="profile" element={<Profile/>}/>
              <Route path="editprofile" element={<EditProfile/>}/>
              <Route path="privacy" element={<PrivacyPolicy/>}/>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
      </Provider>
  );
}

export default App;