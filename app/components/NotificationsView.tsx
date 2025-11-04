'use client'

import { formatDistanceToNow, parseISO, isFuture, differenceInDays } from 'date-fns'
import { Bell, Calendar, TrendingUp } from 'lucide-react'
import { ContentItem } from '../page'

type NotificationsViewProps = {
  notifications: Array<{ id: string; message: string; date: string }>
  trackingContent: ContentItem[]
}

export default function NotificationsView({ notifications, trackingContent }: NotificationsViewProps) {
  const upcomingReleases = trackingContent
    .filter((item) => {
      try {
        const releaseDate = parseISO(item.releaseDate)
        return isFuture(releaseDate) && differenceInDays(releaseDate, new Date()) <= 30
      } catch {
        return false
      }
    })
    .sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime())

  const allNotifications = [
    ...upcomingReleases.map((item) => ({
      id: `upcoming-${item.id}`,
      type: 'upcoming' as const,
      message: `${item.title} releases soon`,
      date: item.releaseDate,
      item,
    })),
    ...notifications.map((notif) => ({
      id: notif.id,
      type: 'activity' as const,
      message: notif.message,
      date: notif.date,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>

      {allNotifications.length === 0 ? (
        <div className="text-center py-12 text-netflix-gray">
          <Bell size={48} className="mx-auto mb-4 opacity-50" />
          <p>No notifications yet</p>
          <p className="text-sm mt-2">Track shows to get release notifications</p>
        </div>
      ) : (
        <div className="space-y-3">
          {allNotifications.map((notif) => (
            <div
              key={notif.id}
              className="bg-netflix-dark p-4 rounded-lg flex items-start gap-3 hover:bg-netflix-dark hover:bg-opacity-70 transition-colors"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-netflix-orange bg-opacity-20 rounded-full flex items-center justify-center">
                {notif.type === 'upcoming' ? (
                  <Calendar size={20} className="text-netflix-orange" />
                ) : notif.type === 'activity' ? (
                  <TrendingUp size={20} className="text-netflix-orange" />
                ) : (
                  <Bell size={20} className="text-netflix-orange" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium">{notif.message}</p>
                {notif.type === 'upcoming' && 'item' in notif && (
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs bg-netflix-orange bg-opacity-20 text-netflix-orange px-2 py-0.5 rounded-full">
                      {notif.item.type === 'tv' ? 'TV Show' : 'Movie'}
                    </span>
                    <span className="text-xs text-netflix-gray-light">
                      in {differenceInDays(parseISO(notif.date), new Date())} days
                    </span>
                  </div>
                )}
                <p className="text-sm text-netflix-gray-light mt-1">
                  {formatDistanceToNow(parseISO(notif.date), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {upcomingReleases.length > 0 && (
        <div className="mt-6 p-4 bg-netflix-orange bg-opacity-10 rounded-lg border border-netflix-orange border-opacity-30">
          <h3 className="font-bold mb-2 text-netflix-orange flex items-center gap-2">
            <Calendar size={20} />
            Upcoming This Month
          </h3>
          <p className="text-sm text-netflix-gray-light">
            You have {upcomingReleases.length} show{upcomingReleases.length !== 1 ? 's' : ''} releasing in the next 30 days
          </p>
        </div>
      )}
    </div>
  )
}
