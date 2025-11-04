'use client'

import { useState, useEffect } from 'react'
import { Home, Search, Calendar, Bell, Plus, Check, X } from 'lucide-react'
import HomeView from './components/HomeView'
import SearchView from './components/SearchView'
import CalendarView from './components/CalendarView'
import NotificationsView from './components/NotificationsView'

export type ContentItem = {
  id: string
  title: string
  type: 'movie' | 'tv'
  releaseDate: string
  posterUrl: string
  overview: string
  status?: 'watched' | 'tracking'
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'calendar' | 'notifications'>('home')
  const [watchedContent, setWatchedContent] = useState<ContentItem[]>([])
  const [trackingContent, setTrackingContent] = useState<ContentItem[]>([])
  const [notifications, setNotifications] = useState<Array<{ id: string; message: string; date: string }>>([])

  useEffect(() => {
    const stored = localStorage.getItem('showtracker_data')
    if (stored) {
      const data = JSON.parse(stored)
      setWatchedContent(data.watched || [])
      setTrackingContent(data.tracking || [])
      setNotifications(data.notifications || [])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('showtracker_data', JSON.stringify({
      watched: watchedContent,
      tracking: trackingContent,
      notifications
    }))
  }, [watchedContent, trackingContent, notifications])

  const addToWatched = (item: ContentItem) => {
    setWatchedContent(prev => {
      const exists = prev.find(i => i.id === item.id)
      if (exists) return prev
      return [...prev, { ...item, status: 'watched' }]
    })
    setTrackingContent(prev => prev.filter(i => i.id !== item.id))
  }

  const addToTracking = (item: ContentItem) => {
    setTrackingContent(prev => {
      const exists = prev.find(i => i.id === item.id)
      if (exists) return prev
      const newItem = { ...item, status: 'tracking' as const }

      // Add notification for new tracked content
      const notifDate = new Date()
      setNotifications(prevNotifs => [...prevNotifs, {
        id: `${item.id}-${Date.now()}`,
        message: `Started tracking ${item.title}`,
        date: notifDate.toISOString()
      }])

      return [...prev, newItem]
    })
    setWatchedContent(prev => prev.filter(i => i.id !== item.id))
  }

  const removeFromWatched = (id: string) => {
    setWatchedContent(prev => prev.filter(i => i.id !== id))
  }

  const removeFromTracking = (id: string) => {
    setTrackingContent(prev => prev.filter(i => i.id !== id))
  }

  const isWatched = (id: string) => watchedContent.some(i => i.id === id)
  const isTracking = (id: string) => trackingContent.some(i => i.id === id)

  return (
    <div className="min-h-screen bg-netflix-black text-white flex flex-col">
      <header className="bg-netflix-darker border-b border-netflix-dark sticky top-0 z-50">
        <div className="px-4 py-3">
          <h1 className="text-2xl font-bold text-netflix-orange">ShowTracker</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-20">
        {activeTab === 'home' && (
          <HomeView
            watchedContent={watchedContent}
            trackingContent={trackingContent}
            addToWatched={addToWatched}
            addToTracking={addToTracking}
            removeFromWatched={removeFromWatched}
            removeFromTracking={removeFromTracking}
          />
        )}
        {activeTab === 'search' && (
          <SearchView
            addToWatched={addToWatched}
            addToTracking={addToTracking}
            isWatched={isWatched}
            isTracking={isTracking}
          />
        )}
        {activeTab === 'calendar' && (
          <CalendarView trackingContent={trackingContent} />
        )}
        {activeTab === 'notifications' && (
          <NotificationsView notifications={notifications} trackingContent={trackingContent} />
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-netflix-darker border-t border-netflix-dark">
        <div className="flex justify-around items-center h-16">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
              activeTab === 'home' ? 'text-netflix-orange' : 'text-netflix-gray-light'
            }`}
          >
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
              activeTab === 'search' ? 'text-netflix-orange' : 'text-netflix-gray-light'
            }`}
          >
            <Search size={24} />
            <span className="text-xs mt-1">Search</span>
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
              activeTab === 'calendar' ? 'text-netflix-orange' : 'text-netflix-gray-light'
            }`}
          >
            <Calendar size={24} />
            <span className="text-xs mt-1">Calendar</span>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
              activeTab === 'notifications' ? 'text-netflix-orange' : 'text-netflix-gray-light'
            }`}
          >
            <Bell size={24} />
            {notifications.length > 0 && (
              <span className="absolute top-2 right-8 bg-netflix-orange text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications.length}
              </span>
            )}
            <span className="text-xs mt-1">Alerts</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
