import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const options = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': 'b747d24540msh0b17f6bf51a8cecp132addjsn03818e6bd865',
//     'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com',
//   },
// };
// 接口网站地址： https://rapidapi.com/zh/tipsters/api/shazam-core/
export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
    prepareHeaders: (header) => {
      header.set('X-RapidAPI-Key', 'b747d24540msh0b17f6bf51a8cecp132addjsn03818e6bd865');
      return header;
    },
  }),
  endpoints: (builder) => ({
    // 搜索页面
    getSongsBySearch: builder.query({ query: (searchTerm) => `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}` }),
    // 下拉框
    getSongsByGenre: builder.query({ query: (genre) => `/charts/genre-world?genre_code=${genre}` }),
    // 获取首页歌曲
    getTopCharts: builder.query({ query: () => '/charts/world' }),
    // 根据id获取歌曲
    getSongDetails: builder.query({ query: ({ songid }) => `/tracks/details?track_id=${songid}` }),
    // 获取歌曲的相似歌曲
    getSongRelated: builder.query({ query: ({ songid }) => `/tracks/related?track_id=${songid}` }),
    // 获取歌手的相关信息
    getArtistDetails: builder.query({ query: ({ artistId }) => `/artists/details?artist_id=${artistId}` }),
    // 根据所在的国家获取歌曲
    getSongsByCountry: builder.query({ query: (countryCode) => `/charts/country?country_code=${countryCode}` }),

  }),
});

export const {
  useGetSongsBySearchQuery,
  useGetSongsByGenreQuery,
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongsByCountryQuery,

} = shazamCoreApi;
