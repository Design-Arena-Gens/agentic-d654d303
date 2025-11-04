'use client'

import { useState, useMemo } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, parseISO } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ContentItem } from '../page'

type CalendarViewProps = {
  trackingContent: ContentItem[]
}

export default function CalendarView({ trackingContent }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const contentByDate = useMemo(() => {
    const map = new Map<string, ContentItem[]>()
    trackingContent.forEach((item) => {
      try {
        const date = parseISO(item.releaseDate)
        const key = format(date, 'yyyy-MM-dd')
        if (!map.has(key)) {
          map.set(key, [])
        }
        map.get(key)!.push(item)
      } catch (e) {
        // Invalid date
      }
    })
    return map
  }, [trackingContent])

  const getContentForDay = (day: Date) => {
    const key = format(day, 'yyyy-MM-dd')
    return contentByDate.get(key) || []
  }

  const startDayOfWeek = monthStart.getDay()

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          className="p-2 hover:bg-netflix-dark rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-bold">{format(currentDate, 'MMMM yyyy')}</h2>
        <button
          onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          className="p-2 hover:bg-netflix-dark rounded-full transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm font-semibold text-netflix-gray-light py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startDayOfWeek }).map((_, idx) => (
          <div key={`empty-${idx}`} className="aspect-square" />
        ))}
        {daysInMonth.map((day) => {
          const content = getContentForDay(day)
          const isToday = isSameDay(day, new Date())

          return (
            <div
              key={day.toISOString()}
              className={`aspect-square border border-netflix-dark rounded-lg p-1 ${
                !isSameMonth(day, currentDate) ? 'opacity-50' : ''
              } ${isToday ? 'bg-netflix-orange bg-opacity-20 border-netflix-orange' : 'bg-netflix-darker'}`}
            >
              <div className="flex flex-col h-full">
                <div className={`text-xs font-semibold mb-1 ${isToday ? 'text-netflix-orange' : ''}`}>
                  {format(day, 'd')}
                </div>
                {content.length > 0 && (
                  <div className="flex-1 overflow-hidden">
                    {content.slice(0, 2).map((item, idx) => (
                      <div
                        key={item.id}
                        className="text-[8px] leading-tight mb-0.5 bg-netflix-orange bg-opacity-70 px-1 py-0.5 rounded truncate"
                        title={item.title}
                      >
                        {item.title}
                      </div>
                    ))}
                    {content.length > 2 && (
                      <div className="text-[8px] text-netflix-gray-light">+{content.length - 2}</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {trackingContent.length === 0 && (
        <div className="text-center py-12 text-netflix-gray">
          <p>Start tracking shows to see release dates</p>
        </div>
      )}

      {trackingContent.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-3">Upcoming Releases</h3>
          <div className="space-y-2">
            {trackingContent
              .sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime())
              .slice(0, 10)
              .map((item) => (
                <div key={item.id} className="bg-netflix-dark p-3 rounded-lg flex items-center gap-3">
                  <div className="w-12 h-16 bg-netflix-darker rounded overflow-hidden flex-shrink-0">
                    <img
                      src={item.posterUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">{item.title}</h4>
                    <p className="text-sm text-netflix-gray-light">
                      {format(parseISO(item.releaseDate), 'MMM d, yyyy')}
                    </p>
                    <span className="text-xs bg-netflix-orange bg-opacity-20 text-netflix-orange px-2 py-0.5 rounded-full inline-block mt-1">
                      {item.type === 'tv' ? 'TV Show' : 'Movie'}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
