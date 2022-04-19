import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
// import Pre from "../utils/pre";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import { searchForSongs } from '../../utils/spotifyRequests';

export default function Search() {
//     const [songs, setSongs] = useState([]);
    const songs = [
        {
            id: "1329873",
            title: "abc",
            artist: "Tom Smith",
        },
        {
            id: "987132",
            title: "defghi jklmnpqrst",
            artist: "Michael Jackson",
        }
    ]
    const [query, setQuery] = useState("");

    useEffect(() => {
        const data = searchForSongs(query);
        console.log(`in search index.js: ${data}`);
        console.log('would change songs list here');
        // setSongs(data);
    }, [query]);

    return (
        <div>
            <input className="form-control me-2" 
                    type="search"
                    placeholder="Search" 
                    aria-label="Search"
                    onChange={(e) => setQuery(e.target.value)} />
            {
                songs &&
                <div className="dropdown show dropdown-menu rounded-0 shadow-sm border-0">
                    {
                        songs.map(song =>
                            <Link to={`song/details/${song.id}`}
                                className="text-decoration-none">
                                <li className="dropdown-item">
                                    {song.title} 
                                    <span className='text-secondary'> {song.artist}</span>
                                </li>
                            </Link>
                        )
                    }
                </div>
            }
        </div>
  );
}