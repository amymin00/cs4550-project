// Styles
import './App.css';
// Package imports
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
// Page component imports
import HomeScreen from "./components/HomeScreen"
import Login from "./components/Login/log-in";
import Register from "./components/Login/register";
import Profile from "./components/Profile";
import PrivacyPolicy from "./components/Privacy";
import Header from "./components/Header";
import React from "react";
import EditProfile from "./components/Profile/EditProfile";
import SongDetails from './components/SongDetails';
// Misc.
import userReducer from "./reducers/user-reducer";
import commentsReducer from "./reducers/comment-reducer";
import postsReducer from "./reducers/post-reducer";
import { ProfileProvider } from './contexts/profileContext';
import SecureRoute from './components/secureRoute';
import AnonRoute from './components/anonRoute';

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
                                    <Route path="/home" exact={true} element={<HomeScreen />} />
                                    <Route path="/login" element={
                                        <AnonRoute>
                                            <Login/>
                                        </AnonRoute>
                                    } />
                                    <Route path="/register" element={
                                        <AnonRoute>
                                            <Register/>
                                        </AnonRoute>
                                    } />
                                    <Route path="/profile/:userId" element={
                                        <SecureRoute>
                                            <Profile/>
                                        </SecureRoute>
                                    } />
                                    <Route path="/profile/edit" element={
                                        <SecureRoute>
                                            <EditProfile/>
                                        </SecureRoute>
                                    } />
                                    <Route path="/songs/details/:songId" element={<SongDetails />} />
                                    <Route path="/privacy" element={<PrivacyPolicy />} />
                                </Route>
                            </Routes>
                        </div>
                    </BrowserRouter>
                </Provider>
            </ProfileProvider>
        
    );
}

export default App;
