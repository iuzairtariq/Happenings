import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { User, ExternalLink, Heart, Share2, MapPin, CalendarDays, Clock } from 'lucide-react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

const EventDetailDialog = ({ event, open, onOpenChange }) => {

    const formatFullDateTime = (dateTimeString) => {
        if (!dateTimeString) return '—'
        const d = new Date(dateTimeString)
        if (Number.isNaN(d.getTime())) return dateTimeString || '—'
        return d.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
    }

    const normalizeTags = (raw) => {
        if (!raw) return []
        if (Array.isArray(raw)) return raw
        if (typeof raw === 'string') {
            try {
                const parsed = JSON.parse(raw)
                if (Array.isArray(parsed)) return parsed
            } catch (e) { }
            return raw.split?.(',').map(t => t.trim()).filter(Boolean) || []
        }
        return []
    }

    const normalizeImages = (raw) => {
        if (!raw) return []
        if (Array.isArray(raw)) return raw
        if (typeof raw === 'string') {
            try {
                const parsed = JSON.parse(raw)
                if (Array.isArray(parsed)) return parsed
            } catch (e) { }
            // allow comma-separated string of urls
            return raw.split?.(',').map(u => u.trim()).filter(Boolean) || []
        }
        return []
    }

    if (!event) return null

    const tags = normalizeTags(event?.tags)
    const images = normalizeImages(event?.imageUrls)

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="space-y-4">
                    <div className="flex justify-between items-start">
                        <DialogTitle className="text-2xl font-bold text-gray-900 pr-8">
                            {event.title}
                        </DialogTitle>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                        <User className="h-4 w-4" />
                        <span>Organized by {event.organizer || '—'}</span>
                    </div>
                </DialogHeader>

                <div className="space-y-6">
                    {images.length > 0 && (
                        <div className="relative w-full h-64">
                            <img
                                src={images[0]}
                                alt={event.title}
                                className="w-full h-full object-cover rounded-xl"
                            />
                        </div>
                    )}

                    {/* Category and Tags */}
                    <div className="flex flex-wrap gap-2">
                        {event.category && (
                            <Badge variant="default" className="capitalize text-sm">
                                {event.category.toLowerCase()}
                            </Badge>
                        )}

                        {tags.length > 0 ? tags.map((tag, index) => (
                            <Badge key={tag + index} variant="secondary" className="text-sm">
                                {tag}
                            </Badge>
                        )) : (
                            <span className="text-sm text-gray-500">No tags</span>
                        )}
                    </div>

                    {/* Date and Time Info */}
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div className="flex items-start gap-3">
                            <CalendarDays className="h-5 w-5 text-blue-500 mt-0.5" />
                            <div>
                                <p className="font-medium text-gray-900">Start Date & Time</p>
                                <p className="text-gray-600">{formatFullDateTime(event.startDateTime)}</p>
                            </div>
                        </div>

                        {event.endDateTime && (
                            <div className="flex items-start gap-3">
                                <Clock className="h-5 w-5 text-green-500 mt-0.5" />
                                <div>
                                    <p className="font-medium text-gray-900">End Date & Time</p>
                                    <p className="text-gray-600">{formatFullDateTime(event.endDateTime)}</p>
                                </div>
                            </div>
                        )}

                        {event.venue && (
                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-red-500 mt-0.5" />
                                <div>
                                    <p className="font-medium text-gray-900">Venue</p>
                                    <p className="text-gray-600">{event.venue}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Event</h3>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {event.description || 'No description available.'}
                        </p>
                    </div>

                    {/* Additional Images */}
                    {images.length > 1 && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Event Gallery</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {images.slice(1).map((imageUrl, index) => (
                                    <div key={imageUrl + index} className="h-32 rounded-lg overflow-hidden">
                                        <img
                                            src={imageUrl}
                                            alt={`${event.title} ${index + 2}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t">
                        {event.ticketLink && (
                            <Button className="flex-1 min-w-fit">
                                <ExternalLink className="h-4 w-4" />
                                Get Tickets
                            </Button>
                        )}

                        <Button
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <Share2 className="h-4 w-4" />
                            Share
                        </Button>

                        <Button
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <Heart className="h-4 w-4" />
                            Save
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default EventDetailDialog
