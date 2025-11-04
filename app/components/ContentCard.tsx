'use client'

import { Plus, Check, X } from 'lucide-react'
import { ContentItem } from '../page'
import { format, parseISO } from 'date-fns'

type ContentCardProps = {
  item: ContentItem
  onAddToWatched: () => void
  onAddToTracking: () => void
  isWatched: boolean
  isTracking: boolean
}

export default function ContentCard({
  item,
  onAddToWatched,
  onAddToTracking,
  isWatched,
  isTracking,
}: ContentCardProps) {
  return (
    <div className="bg-netflix-dark rounded-lg overflow-hidden group cursor-pointer hover:scale-105 transition-transform">
      <div className="relative aspect-[2/3] bg-netflix-darker">
        <img
          src={item.posterUrl}
          alt={item.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <div className="flex gap-2">
              {!isWatched && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onAddToWatched()
                  }}
                  className="flex-1 bg-white text-netflix-black py-2 px-3 rounded-md flex items-center justify-center gap-1 text-sm font-medium hover:bg-opacity-80 transition-colors"
                  title="Mark as watched"
                >
                  <Check size={16} />
                  Watched
                </button>
              )}
              {isWatched && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onAddToWatched()
                  }}
                  className="flex-1 bg-netflix-orange text-white py-2 px-3 rounded-md flex items-center justify-center gap-1 text-sm font-medium hover:bg-netflix-orange-dark transition-colors"
                  title="Remove from watched"
                >
                  <X size={16} />
                  Unwatch
                </button>
              )}
              {!isTracking && !isWatched && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onAddToTracking()
                  }}
                  className="flex-1 bg-netflix-orange text-white py-2 px-3 rounded-md flex items-center justify-center gap-1 text-sm font-medium hover:bg-netflix-orange-dark transition-colors"
                  title="Track this"
                >
                  <Plus size={16} />
                  Track
                </button>
              )}
              {isTracking && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onAddToTracking()
                  }}
                  className="flex-1 bg-netflix-gray text-white py-2 px-3 rounded-md flex items-center justify-center gap-1 text-sm font-medium hover:bg-opacity-80 transition-colors"
                  title="Stop tracking"
                >
                  <X size={16} />
                  Untrack
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm truncate">{item.title}</h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-netflix-gray-light">
            {item.type === 'tv' ? 'TV Show' : 'Movie'}
          </span>
          <span className="text-xs text-netflix-gray-light">
            {format(parseISO(item.releaseDate), 'yyyy')}
          </span>
        </div>
        {(isWatched || isTracking) && (
          <div className="mt-2">
            {isWatched && (
              <span className="text-xs bg-green-600 bg-opacity-20 text-green-400 px-2 py-1 rounded-full">
                Watched
              </span>
            )}
            {isTracking && (
              <span className="text-xs bg-netflix-orange bg-opacity-20 text-netflix-orange px-2 py-1 rounded-full">
                Tracking
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
