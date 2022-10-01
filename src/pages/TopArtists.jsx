import { useSelector } from 'react-redux';
import { Error, Loader, ArtistCard } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopArtists = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  // const key = 'at_62MxjIQI1nu51JA6eQ5GoLxbcvomC';

  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader title="正在加载歌曲" />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        发现顶级歌手
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((track) => (
          <ArtistCard
            track={track}
            key={track.key}
          />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
