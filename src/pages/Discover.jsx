import { useDispatch, useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { genres } from '../assets/constants';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const Discover = () => {
  const genreTitle = 'Pop';
  const { data, isFetching, error } = useGetTopChartsQuery();

  // const dispatch= useDispatch()
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  // console.log(data);
  if (isFetching) return <Loader title="加载中....." />;
  if (error) return <Error />;
  return (
    <div className=" flex flex-col">
      <div className=" w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className=" font-bold text-3xl text-white text-left">Discover {genreTitle}</h2>
        <select
          onChange={() => {}}
          value=""
          className=" bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((item) => (
            <option className="" key={item.value} value={item.value}>
              {item.title}
            </option>
          ))}
        </select>
      </div>

      <div className=" flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((item, index) => (
          <SongCard
            isPlaying={isPlaying}
            activeSong={activeSong}
            key={item.key}
            song={item}
            i={index}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
