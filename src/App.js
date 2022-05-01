// Styles
import './App.css';
// Package imports
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
// Page component imports
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomeScreen from "./components/HomeScreen"
import Login from "./components/Login/log-in";
import Register from "./components/Login/register";
import Profile from "./components/Profile";
import PrivacyPolicy from "./components/Privacy";
import React from "react";
import EditProfile from "./components/Profile/EditProfile";
import SongDetails from './components/SongDetails';
// Misc.
import usersReducer from "./reducers/user-reducer";
import commentsReducer from "./reducers/comment-reducer";
import postsReducer from "./reducers/post-reducer";
import { songsReducer, songSavedReducer } from './reducers/song-reducer';
import { ProfileProvider } from './contexts/profileContext';
import SecureRoute from './components/secureRoute';
import AnonRoute from './components/anonRoute';

function App() {
    const reducer = combineReducers({
        users: usersReducer,
        comments: commentsReducer, 
        posts: postsReducer, 
        songs: songsReducer,
        songSaved: songSavedReducer,
    });
    const store = createStore(reducer);
    return (
            <ProfileProvider>
                <Provider store={store}>
                    <BrowserRouter>
                        <NavBar />
                        <div className="container mb-3">
                            <Routes>
                                <Route exact path="/" >
                                    <Route index element={<HomeScreen />} />
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
                                    <Route exact path="/profile/:username" element={<Profile/>} />
                                    <Route exact path="/profile/edit" element={
                                        <SecureRoute>
                                            <EditProfile/>
                                        </SecureRoute>
                                    } />
                                    <Route path="/songs/details/:songId" element={<SongDetails />} />
                                    <Route path="/privacy" element={<PrivacyPolicy />} />
                                </Route>
                            </Routes>
                            <div className='footer-height'></div>
                        </div>
                        <Footer />
                    </BrowserRouter>
                </Provider>
            </ProfileProvider>
    );
}

export default App;
