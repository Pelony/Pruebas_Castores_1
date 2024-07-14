import React, { useState } from 'react';
import axios from 'axios';

export default function DashboardView() {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const apiKey = 'AIzaSyC-sMbuwrWNdZ9YcIIlOXvuqKx-wQbKe2A';  // Reemplaza con tu clave de API de YouTube

  const handleSearch = async () => {
    if (!query) return;

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=5&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      setVideos(response.data.items);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <h1 className="text-5xl font-black">Buscar Videos</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">Busca y administra videos desde YouTube</p>

      <div className="my-5 flex">
        <input
          type="text"
          className="border-2 border-gray-300 p-3 w-full text-xl"
          placeholder="Buscar videos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold transition-colors ml-3"
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>

      <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
        {videos.map((video) => (
          <li key={video.id.videoId} className="flex justify-between gap-x-6 px-5 py-10">
            <div className="flex min-w-0 gap-x-4">
              <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} className="w-24 h-24" />
              <div className="min-w-0 flex-auto space-y-2">
                <p className="text-gray-600 text-3xl font-bold">{video.snippet.title}</p>
                <p className="text-sm text-gray-400">{video.snippet.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {videos.length === 0 && (
        <p className="text-center py-20">
          No hay videos aún.
        </p>
      )}
    </>
  );
}
