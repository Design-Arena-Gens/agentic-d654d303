'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { ContentItem } from '../page'
import ContentCard from './ContentCard'

type SearchViewProps = {
  addToWatched: (item: ContentItem) => void
  addToTracking: (item: ContentItem) => void
  isWatched: (id: string) => boolean
  isTracking: (id: string) => boolean
}

export default function SearchView({
  addToWatched,
  addToTracking,
  isWatched,
  isTracking,
}: SearchViewProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<ContentItem[]>([])
  const [activeFilter, setActiveFilter] = useState<'all' | 'movie' | 'tv'>('all')

  const mockContent: ContentItem[] = [
    {
      id: 'tt0944947',
      title: 'Game of Thrones',
      type: 'tv',
      releaseDate: '2011-04-17',
      posterUrl: 'https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
      overview: 'Seven noble families fight for control of the mythical land of Westeros.',
    },
    {
      id: 'tt0111161',
      title: 'The Shawshank Redemption',
      type: 'movie',
      releaseDate: '1994-09-23',
      posterUrl: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
      overview: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption.',
    },
    {
      id: 'tt0903747',
      title: 'Breaking Bad',
      type: 'tv',
      releaseDate: '2008-01-20',
      posterUrl: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
      overview: 'A high school chemistry teacher diagnosed with cancer turns to manufacturing meth.',
    },
    {
      id: 'tt0468569',
      title: 'The Dark Knight',
      type: 'movie',
      releaseDate: '2008-07-18',
      posterUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      overview: 'When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest tests.',
    },
    {
      id: 'tt0417299',
      title: 'Avatar',
      type: 'movie',
      releaseDate: '2009-12-18',
      posterUrl: 'https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg',
      overview: 'A paraplegic Marine dispatched to the moon Pandora on a unique mission.',
    },
    {
      id: 'tt2861424',
      title: 'Rick and Morty',
      type: 'tv',
      releaseDate: '2013-12-02',
      posterUrl: 'https://image.tmdb.org/t/p/w500/gdIrmf2DdY5mgN6ycVP0XlzKzbE.jpg',
      overview: 'An animated series that follows the exploits of a super scientist and his not-so-bright grandson.',
    },
    {
      id: 'tt1475582',
      title: 'Sherlock',
      type: 'tv',
      releaseDate: '2010-07-25',
      posterUrl: 'https://image.tmdb.org/t/p/w500/7WTsnHkbA0FaG6R9twfFde0I9hl.jpg',
      overview: 'A modern update finds the famous sleuth and his doctor partner solving crime in 21st century London.',
    },
    {
      id: 'tt1853728',
      title: 'Django Unchained',
      type: 'movie',
      releaseDate: '2012-12-25',
      posterUrl: 'https://image.tmdb.org/t/p/w500/7oWY8VDWW7thTzWh3OKYRkWUlD5.jpg',
      overview: 'With the help of a German bounty hunter, a freed slave sets out to rescue his wife.',
    },
    {
      id: 'tt2306299',
      title: 'Vikings',
      type: 'tv',
      releaseDate: '2013-03-03',
      posterUrl: 'https://image.tmdb.org/t/p/w500/bQLrHIRNEkE3PdIWQrZHynQZazu.jpg',
      overview: 'The adventures of Ragnar Lothbrok: the greatest hero of his age.',
    },
    {
      id: 'tt10919420',
      title: 'Squid Game',
      type: 'tv',
      releaseDate: '2021-09-17',
      posterUrl: 'https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg',
      overview: 'Hundreds of cash-strapped contestants accept an invitation to compete in deadly games.',
    },
    {
      id: 'tt0816692',
      title: 'Interstellar',
      type: 'movie',
      releaseDate: '2014-11-07',
      posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    },
    {
      id: 'tt5491994',
      title: 'Planet Earth II',
      type: 'tv',
      releaseDate: '2016-11-06',
      posterUrl: 'https://image.tmdb.org/t/p/w500/3lT7L4pv7waWxIkjjh2RXyN0ITu.jpg',
      overview: 'David Attenborough returns with a new wildlife documentary.',
    },
  ]

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    if (searchQuery.trim() === '') {
      setResults([])
      return
    }

    const filtered = mockContent.filter((item) => {
      const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFilter = activeFilter === 'all' || item.type === activeFilter
      return matchesQuery && matchesFilter
    })
    setResults(filtered)
  }

  const filteredResults = activeFilter === 'all'
    ? results
    : results.filter(r => r.type === activeFilter)

  return (
    <div className="p-4">
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search shows and movies..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-netflix-dark text-white px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-netflix-orange"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-netflix-gray" size={20} />
        </div>

        <div className="flex gap-2 mt-3">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === 'all'
                ? 'bg-netflix-orange text-white'
                : 'bg-netflix-dark text-netflix-gray-light'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter('tv')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === 'tv'
                ? 'bg-netflix-orange text-white'
                : 'bg-netflix-dark text-netflix-gray-light'
            }`}
          >
            TV Shows
          </button>
          <button
            onClick={() => setActiveFilter('movie')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === 'movie'
                ? 'bg-netflix-orange text-white'
                : 'bg-netflix-dark text-netflix-gray-light'
            }`}
          >
            Movies
          </button>
        </div>
      </div>

      {query === '' ? (
        <div className="text-center py-12 text-netflix-gray">
          <Search size={48} className="mx-auto mb-4 opacity-50" />
          <p>Search for your favorite shows and movies</p>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-12 text-netflix-gray">
          <p>No results found for "{query}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filteredResults.map((item) => (
            <ContentCard
              key={item.id}
              item={item}
              onAddToWatched={() => addToWatched(item)}
              onAddToTracking={() => addToTracking(item)}
              isWatched={isWatched(item.id)}
              isTracking={isTracking(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
