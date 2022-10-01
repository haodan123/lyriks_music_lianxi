import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PlayPause from './PlayPause';

import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongCard = ({ song, i, isPlaying, activeSong, data }) => {
  const dispatch = useDispatch();
  // 点击暂停
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  // 点击播放
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className=" relative w-full h-56 group ">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 
       group-hover:flex ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'}
      `}
        >
          <PlayPause
            activeSong={activeSong}
            isPlaying={isPlaying}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img src={song?.images?.coverart} alt="" />
      </div>
      {/* 文字 */}
      <div className="mt4 flex flex-col">
        <p className="text-lg font-semibold text-white truncate">
          <Link to={`/songs/${song?.key}`}>{song?.title}</Link>
        </p>
        <p className="text-sm font-semibold text-gray-300 mt-1 truncate">
          <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}>{song?.subtitle}</Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
