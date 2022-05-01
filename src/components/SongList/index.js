import React from "react";
import { Link } from "react-router-dom";
import SongListItem from "./SongListItem";

const SongList = ({songs = [],
                   className = '',
}) => {  
    if (songs.length > 0) {
        return (
           <div className={`list-group ${className}`}>
               {
                   songs.map((song, index) => 
                       <Link to={`/songs/details/${song.id}`}
                               key={song.id}
                               className='list-group-item'>
                           <SongListItem song={song} number={index + 1} />
                       </Link>
                   )
               }
           </div>
       );
    } 

    return null;   
}

export default SongList;

