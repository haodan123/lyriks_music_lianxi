import { useNavigate } from 'react-router-dom';

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/artists/${track?.artists[0].adamid}`)}
      className=" p-4 bg-white/5 flex flex-col w-[250px] bg-opacity-80 backdrop-blur-sm animate-slideup cursor-pointer"
    >

      <img
        src={track?.images?.coverart}
        alt="img"
        className="w-full h-5/6 rounded-lg"
      />
      <p className="mt-4 font-semibold text-lg text-white truncate">
        {track?.subtitle}
      </p>
    </div>
  );
};

export default ArtistCard;
