import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services/shazamCore';

const SongDetails = () => {
  const { songid } = useParams();
  // 获取歌曲的基本信息
  const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid });
  // 获取相关歌曲的信息
  const { data, isFetching: isFetchingRelatedSongs, error } = useGetSongRelatedQuery({ songid });

  // console.log(songData);
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  // 点击暂停
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  // 点击播放
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  if (isFetchingRelatedSongs || isFetchingSongDetails) return <Loader title="搜索歌曲的信息中" />;
  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      {/* 歌曲基本信息 */}
      <DetailsHeader songData={songData} artsitId="" />
      {/* 歌词部分 */}
      <div className=" mb-10">
        <h2 className=" text-white text-3xl  font-bold">歌词:</h2>
        <div className="mt-5">
          {songData?.sections[1].type === 'LYRICS' ? (
            songData?.sections[1].text.map((item, i) => (
              <p className=" text-gray-400 text-base my-1" key={i}>
                {item}{' '}
              </p>
            ))
          ) : (
            <p className=" text-gray-400 text-base my-1">抱歉，没找到歌词</p>
          )}
        </div>
      </div>
      {/* 歌曲的相关信息 */}
      <RelatedSongs
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
        data={data}
      />
    </div>
  );
};

export default SongDetails;
