'use client'

import { ContentItem } from '../page'
import ContentCard from './ContentCard'
import { useEffect, useState } from 'react'

type HomeViewProps = {
  watchedContent: ContentItem[]
  trackingContent: ContentItem[]
  addToWatched: (item: ContentItem) => void
  addToTracking: (item: ContentItem) => void
  removeFromWatched: (id: string) => void
  removeFromTracking: (id: string) => void
}

export default function HomeView({
  watchedContent,
  trackingContent,
  addToWatched,
  addToTracking,
  removeFromWatched,
  removeFromTracking,
}: HomeViewProps) {
  const [suggestions, setSuggestions] = useState<ContentItem[]>([])

  useEffect(() => {
    // Generate suggestions based on watched content
    const genres = ['action', 'comedy', 'drama', 'thriller', 'sci-fi']
    const randomGenre = genres[Math.floor(Math.random() * genres.length)]

    const mockSuggestions: ContentItem[] = [
      {
        id: 'suggest-1',
        title: 'Breaking Bad',
        type: 'tv',
        releaseDate: '2008-01-20',
        posterUrl: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
        overview: 'A high school chemistry teacher turned meth manufacturer.',
      },
      {
        id: 'suggest-2',
        title: 'The Shawshank Redemption',
        type: 'movie',
        releaseDate: '1994-09-23',
        posterUrl: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
        overview: 'Two imprisoned men bond over a number of years.',
      },
      {
        id: 'suggest-3',
        title: 'Stranger Things',
        type: 'tv',
        releaseDate: '2016-07-15',
        posterUrl: 'https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg',
        overview: 'When a young boy vanishes, a small town uncovers a mystery.',
      },
      {
        id: 'suggest-4',
        title: 'Inception',
        type: 'movie',
        releaseDate: '2010-07-16',
        posterUrl: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
        overview: 'A thief who steals corporate secrets through dream-sharing technology.',
      },
    ]

    setSuggestions(mockSuggestions)
  }, [watchedContent])

  return (
    <div className="p-4 space-y-6">
      <section>
        <h2 className="text-xl font-bold mb-4">Continue Watching</h2>
        {trackingContent.length === 0 ? (
          <div className="text-netflix-gray text-center py-8">
            No shows or movies being tracked. Search to add some!
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {trackingContent.map((item) => (
              <ContentCard
                key={item.id}
                item={item}
                onAddToWatched={() => addToWatched(item)}
                onAddToTracking={() => removeFromTracking(item.id)}
                isWatched={false}
                isTracking={true}
              />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Recommended For You</h2>
        <div className="grid grid-cols-2 gap-3">
          {suggestions.map((item) => {
            const isWatched = watchedContent.some(w => w.id === item.id)
            const isTracking = trackingContent.some(t => t.id === item.id)
            return (
              <ContentCard
                key={item.id}
                item={item}
                onAddToWatched={() => addToWatched(item)}
                onAddToTracking={() => addToTracking(item)}
                isWatched={isWatched}
                isTracking={isTracking}
              />
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Watched</h2>
        {watchedContent.length === 0 ? (
          <div className="text-netflix-gray text-center py-8">
            No watched content yet. Mark shows as watched!
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {watchedContent.map((item) => (
              <ContentCard
                key={item.id}
                item={item}
                onAddToWatched={() => removeFromWatched(item.id)}
                onAddToTracking={() => addToTracking(item)}
                isWatched={true}
                isTracking={false}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
