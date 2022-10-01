import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

import 'swiper/css';
import 'swiper/css/free-mode';

// 前五歌手的卡片样式
const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <div className=" w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
    <h3 className=" font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img className=" w-20 h-20 rounded-lg" src={song?.images?.coverart} alt="art" />
      <div className=" flex-1 flex flex-col justify-center mx-3 ">
        <Link to={`/songs/${song.key}`}>
          <p className=" text-xl font-bold text-white"> {song.title}</p>
        </Link>
        <Link to={`/songs/${song?.artists[0].adamid}`}>
          <p className=" text-ase  text-gray-300 mt-1"> {song.subtitle}</p>
        </Link>
      </div>
    </div>

    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
    // 此处去掉第二个参数防止偶尔刷新时不调用
  });

  // 前五的歌曲
  const topPlays = data?.slice(0, 5);
  // 点击暂停
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  // 点击播放
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
      {/* 顶级歌曲 */}
      <div className=" w-full flex flex-col">
        {/* 第一行 */}
        <div className="flex flex-row justify-between items-center">
          <h2 className=" text-white font-bold text-2xl">顶级歌曲</h2>
          <Link to="/top-charts">
            <p className=" text-gray-300 text-base cursor-pointer">查看更多 </p>
          </Link>
        </div>
        {/* 第二块 */}
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((item, i) => (
            <TopChartCard
              handlePlayClick={() => handlePlayClick(item, i)}
              handlePauseClick={handlePauseClick}
              key={item.key}
              i={i}
              song={item}
              activeSong={activeSong}
              isPlaying={isPlaying}
            />
          ))}
        </div>
      </div>
      {/* 顶级艺人 */}
      <div className=" w-full flex flex-col mt-8">
        {/* 第一行 */}
        <div className="flex flex-row justify-between items-center">
          <h2 className=" text-white font-bold text-2xl">顶级歌手</h2>
          <Link to="/top-artists">
            <p className=" text-gray-300 text-base cursor-pointer">查看更多 </p>
          </Link>
        </div>
      </div>
      {/* 轮播 */}
      <Swiper
        slidesPerView="auto"
        spaceBetween={15}// 图片的间距
        freeMode
        centeredSlides
        centeredSlidesBounds
        modules={[FreeMode]}
        className="mt-4"
      >
        {topPlays?.map((song) => (
          <SwiperSlide
            key={song.key}
            style={{ width: '25%', height: 'auto' }}
            className=" shadow-lg rounded-full animate-slideright"
          >
            <Link to={`/artists/${song?.artists[0].adamid}`}>
              <img src={song?.images.background} className="rounded-full w-full object-cover" alt="name" />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopPlay;
