import React, {useEffect, useRef, useState} from 'react';
import { Link } from "react-router-dom";
import { searchForSongs } from '../../services/song-service';

export default function Search() {
    const [songs, setSongs] = useState([]);
    const queryRef = useRef();
    
    const fetchSongs = async e => {
        e.preventDefault();
        const query = queryRef.current.value;

        if (query) {
            const data = await searchForSongs(query);
            setSongs(data);
        } else {
            setSongs([]);
        }
    };

    const refreshPage = () => { 
        window.location.reload(); 
    }

    return (
        <div className='dropdown'>
            <form className="d-flex">
                <input ref={queryRef}
                        className="form-control me-2" 
                        type="search"
                        placeholder="Search song titles" 
                        aria-label="Search" />
                <button className="btn btn-outline-success"
                        type="submit"
                        onClick={fetchSongs}>
                    Search
                </button>
            </form>
            {
                songs.length > 0 &&
                <ul className="show dropdown-menu rounded-0 shadow-sm border-0">
                    {
                        songs.slice(0, 10).map(song =>
                            <li className='dropdown-item'>
                                <Link to={`/songs/details/${song.id}`}
                                    className="text-decoration-none"
                                    key={song.id}
                                    onClick={refreshPage}>
                                    <div className='row w-auto'>
                                        <div className='col-3'>
                                            <img src={song.album.cover} alt=''
                                                className='w-100'></img>
                                        </div>
                                        <div className='col-9'>
                                            <div className='row w-100 text-wrap'>
                                                    {song.name}
                                                    <span className='text-secondary'>{song.artists[0].name}</span>
                                            </div>
                                            <div>
                                                <span className='text-secondary'>{song.album.released.substring(0,4)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        )
                    }
                </ul>
            }
        </div>
  );
}