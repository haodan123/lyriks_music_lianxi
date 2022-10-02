import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search/${searchText}`);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="p-2 text-gray-400 focus-within:text-gray-600">
      <label htmlFor="search-field" className="sr-only">
        搜索全部歌曲
      </label>
      <div className="flex flex-row justify-start items-center">
        <FiSearch />
        <input
          name='"search-field'
          autoComplete="off"
          type="search"
          placeholder="Search"
          value={searchText}
          id="search-field"
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-base text-white p-4"
        />
      </div>
    </form>
  );
};

export default Searchbar;
