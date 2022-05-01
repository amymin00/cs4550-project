import './style.css';
import toMinutesSeconds from "../../utils/toMinutesSeconds";

const SongListItem = ({song = {
    id: '',
    name: '',
    artists: [],
    length_ms: 0,
    album: {},
}}) => {

    
    return (
        <div className='row w-auto'>
            <div className='col-3'>
                <img src={song.album.cover} alt=''
                    className='w-100'></img>
            </div>
            <div className='col-9'>
                <div className='row w-100 text-wrap text-dark pe-1'>
                        <nobr className='text-wrap'>
                            <span className="bold-song-name">{song.name}</span> 
                            <span className="text-muted"> ({toMinutesSeconds(song.length_ms)})</span>
                        </nobr>
                        <nobr className='text-wrap'>
                            <span className='text-success'>{song.artists[0].name}&nbsp;</span>
                            <span className="text-muted">&nbsp;{song.album.released.substring(0,4)}</span>
                        </nobr>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    );
}

export default SongListItem;