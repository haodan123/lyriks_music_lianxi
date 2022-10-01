import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  // 获取歌曲的基本信息
  const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery({ artistId });

  // console.log(songData);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (isFetchingArtistDetails) return <Loader title="搜索歌手中" />;
  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      {/* 歌曲基本信息 */}
      <DetailsHeader artistId={artistId} artistData={artistData} artsitId="" />

      {/* 歌曲的相关信息 */}
      <RelatedSongs
        isPlaying={isPlaying}
        activeSong={activeSong}
        data={Object.values(artistData?.songs)}
        artistId={artistId}
      />
    </div>
  );
};

export default ArtistDetails;
