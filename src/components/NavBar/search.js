import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchForSongs } from '../../services/song-service';
import SongListItem from '../SongList/SongListItem';
import './style.css';

export default function Search({className=''}) {
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

    const clearQuery = () => {
        queryRef.current.value = "";
        setSongs([]);
    };

    return (
        <div id='search' className={`dropdown ${className}`}>
            {/* Search form */}
            <div className='d-flex align-items-center bg-white rounded-2'>
                <input ref={queryRef}
                        id='navbarDropdown'
                        className='form-control pe-2 border-0 shadow-none' 
                        type='search'
                        placeholder='Search songs'
                        aria-label='Search'
                        onInput={fetchSongs}/>
                <i className="fa fa-search fa-lg mx-2"></i>
            </div>

            {/* Search results dropdown */}
            {
                songs.length > 0 &&
                <ul id='search-results-menu'
                    className='show dropdown-menu rounded-0 shadow-sm border-0'>
                    {
                        songs.map(song =>
                            <li key={song.id} className='dropdown-item'>
                                <Link to={`/songs/details/${song.id}`}
                                    className='text-decoration-none'
                                    key={song.id}
                                    onClick={clearQuery}>
                                    <SongListItem song={song} />
                                </Link>
                            </li>
                        )
                    }
                </ul>
            }
        </div>
  );
}