import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchForSongs } from '../../services/song-service';
import refreshPage from '../../utils/refreshPage';

export default function Search() {
    const [songs, setSongs] = useState([]);
    const queryRef = useRef();
    const [showResults, setShowResults] = React.useState(false)
    const onFocus = () => setShowResults(true)
    const onBlur = () => setShowResults(false)

    // return <input type="text" onFocus={onFocus} onBlur={onBlur} />

    
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

    return (
        <div className='dropdown'>
            {/* Search form */}
            <form className='d-flex'>
                <input ref={queryRef}
                        className='form-control me-2' 
                        type='search'
                        placeholder='Search song titles' 
                        aria-label='Search'
                        onFocus={onFocus} />
                        {/* onBlur={onBlur} /> */}
                <button className='btn btn-outline-success'
                        type='submit'
                        onClick={fetchSongs}>
                    Search
                </button>
            </form>

            {/* Search results dropdown */}
            {
                songs.length > 0 && showResults &&
                <ul className='show dropdown-menu rounded-0 shadow-sm border-0'
                    onFocus={onFocus}
                    onBlur={onBlur}>
                    {
                        songs.slice(0, 10).map(song =>
                            <li className='dropdown-item'>
                                <Link to={`/songs/details/${song.id}`}
                                    className='text-decoration-none'
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