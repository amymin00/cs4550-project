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
import commentsReducer from "./reducers/comment-reducer";
import postsReducer from "./reducers/post-reducer";
import { ProfileProvider } from './contexts/profileContext';
import SecureRoute from './components/secureRoute';

function App() {

  const reducer = combineReducers({
    users: userReducer, comments: commentsReducer, posts: postsReducer
  });
  const store = createStore(reducer);
  return (
        <ProfileProvider>
            <Provider store={store}>
                <BrowserRouter>
                    <Header />
                    <div className="container">
                    <Routes>
                        <Route path="/">
                            <Route index element={<HomeScreen />} />
                            <Route path="home" exact={true} element={<HomeScreen />} />
                            <Route path="login" element={<Login/>}/>
                            <Route path="register" element={<Register/>}/>
                            <Route path="/profile/:userId" element={
                                <SecureRoute>
                                    <Profile/>
                                </SecureRoute>
                            }/>
                            <Route path="editprofile" element={
                                <SecureRoute>
                                    <EditProfile/>
                                </SecureRoute>
                            }/>
                            <Route path="privacy" element={<PrivacyPolicy/>}/>
                        </Route>
                    </Routes>
                    </div>
                </BrowserRouter>
            </Provider>
        </ProfileProvider>
      
  );
}

export default App;
