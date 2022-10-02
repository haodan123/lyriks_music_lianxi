import { useDispatch, useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { genres } from '../assets/constants';
import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';
import { selectGenreListId } from '../redux/features/playerSlice';

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || 'POP');

  // console.log(data);
  if (isFetching) return <Loader title="加载中....." />;
  if (error) return <Error />;
  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

  return (
    <div className=" flex flex-col">
      <div className=" w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className=" font-bold text-3xl text-white text-left">Discover {genreTitle}</h2>
        <select
          onChange={(e) => { dispatch(selectGenreListId(e.target.value)); }}
          value={genreListId || 'Pop'}
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
