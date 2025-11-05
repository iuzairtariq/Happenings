'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { CalendarDays, MapPin, Clock } from 'lucide-react'
import FilterDialog from '@/components/FilterDialog'
import SearchBox from '@/components/SearchBox'
import EventDetailDialog from '@/components/EventDetailDialog'

const EventsDisplay = () => {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [filterOpen, setFilterOpen] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [selectedEventFromSearch, setSelectedEventFromSearch] = useState(null)

    const [filters, setFilters] = useState({
        category: 'anything',
        tags: [],
        timeFilter: 'anytime',
        startDate: '',
        endDate: '',
        location: '',
        page: 1,
        limit: 20
    })

    // Utility function to normalize image URLs
    const normalizeImageUrls = (event) => {
        if (!event) return []

        const imgs = event.imageUrls ?? event.imageUrl ?? null

        if (!imgs) return []

        if (Array.isArray(imgs)) {
            return imgs.filter(img => img && typeof img === 'string')
        }

        if (typeof imgs === 'string') {
            try {
                const parsed = JSON.parse(imgs)
                if (Array.isArray(parsed)) {
                    return parsed.filter(img => img && typeof img === 'string')
                }
                return [parsed].filter(img => img && typeof img === 'string')
            } catch {
                return [imgs]
            }
        }

        return []
    }

    // Get the first valid image URL
    const getFirstImage = (event) => {
        const normalizedImages = normalizeImageUrls(event)
        return normalizedImages.length > 0 ? normalizedImages[0] : null
    }

    const fetchEvents = async (currentFilters = filters) => {
        setLoading(true)
        try {
            const queryParams = new URLSearchParams()

            Object.entries(currentFilters).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== '' && value !== 'anything' && value !== 'anytime') {
                    if (key === 'tags' && Array.isArray(value) && value.length > 0) {
                        queryParams.append('tags', JSON.stringify(value))
                    } else if (key !== 'tags') {
                        queryParams.append(key, String(value))
                    }
                }
            })

            const response = await fetch(`/api/filter?${queryParams.toString()}`)
            const result = await response.json()

            if (result.success) {
                // Normalize images for all events when fetched
                const normalizedEvents = result.data.events.map(event => ({
                    ...event,
                    imageUrls: normalizeImageUrls(event)
                }))
                setEvents(normalizedEvents)
            } else {
                console.error('Error fetching events:', result.error)
                setEvents([])
            }
        } catch (error) {
            console.error('Error fetching events:', error)
            setEvents([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
            page: 1
        }))
    }

    const clearAllFilters = () => {
        const resetFilters = {
            category: 'anything',
            tags: [],
            timeFilter: 'anytime',
            startDate: '',
            endDate: '',
            location: '',
            page: 1,
            limit: 20
        }
        setFilters(resetFilters)
        fetchEvents(resetFilters)
    }

    const onApplyFilters = () => {
        fetchEvents(filters)
    }

    const getActiveFiltersCount = () => {
        let count = 0
        if (filters.category && filters.category !== 'anything') count++
        if (filters.tags && filters.tags.length > 0) count++
        if (filters.timeFilter && filters.timeFilter !== 'anytime') count++
        if (filters.location && filters.location.trim()) count++
        return count
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const formatTime = (dateTimeString) => {
        return new Date(dateTimeString).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
    }

    const handleEventClick = (event) => {
        setSelectedEvent(event)
        setDialogOpen(true)
    }

    const handleEventSelect = (eventData) => {
        if (eventData.searchQuery) {
            setSelectedEventFromSearch(null)
            console.log('Searching for:', eventData)
            return
        }

        // Normalize the selected event's images
        const normalizedEvent = {
            ...eventData,
            imageUrls: normalizeImageUrls(eventData)
        }

        setSelectedEventFromSearch(normalizedEvent)
        // Scroll to top to show the selected event
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Organize events with selected event at top
    const organizedEvents = () => {
        if (!selectedEventFromSearch) return events

        // Try to find full event object in events list
        const found = events.find(ev => ev.id === selectedEventFromSearch.id)

        // Prefer the full one from events list, else use selectedEventFromSearch
        const selected = found || selectedEventFromSearch
        const otherEvents = events.filter(event => event.id !== selected.id)

        return [selected, ...otherEvents]
    }

    const renderEventCard = (event, isSelected = false) => {
        const firstImage = getFirstImage(event)

        return (
            <Card
                key={event.id}
                className={`hover:shadow-lg transition-all duration-300 cursor-pointer ${isSelected
                        ? 'bg-green-50 border-l-4 border-l-green-500 hover:border-l-green-600'
                        : 'border-l-4 border-l-blue-500 hover:border-l-blue-600'
                    }`}
                onClick={() => handleEventClick(event)}
            >
                <div className="flex flex-col sm:flex-row items-center">
                    <div className="flex-1 w-full">
                        <CardContent className="py-6">
                            {isSelected && (
                                <div className="mb-3">
                                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                                        Selected from search
                                    </Badge>
                                </div>
                            )}
                            <div>
                                <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2">
                                    {event.title}
                                </CardTitle>
                                <CardDescription className="text-gray-600 mt-1 truncate">
                                    Organizer: {event.organizer}
                                </CardDescription>
                                <CardDescription className="text-gray-600 mt-2 line-clamp-3 sm:line-clamp-none max-w-3xl">
                                    {event.description}
                                </CardDescription>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-600 mt-4">
                                <div className="flex items-center gap-2 min-w-0">
                                    <CalendarDays className={`h-4 w-4 flex-shrink-0 ${isSelected ? 'text-green-500' : 'text-blue-500'}`} />
                                    <span className="truncate">{formatDate(event.startDateTime)}</span>
                                </div>
                                {event.startDateTime && (
                                    <div className="flex items-center gap-2 min-w-0">
                                        <Clock className={`h-4 w-4 flex-shrink-0 ${isSelected ? 'text-green-600' : 'text-green-500'}`} />
                                        <span className="truncate">{formatTime(event.startDateTime)}</span>
                                    </div>
                                )}
                                {event.venue && (
                                    <div className="flex items-center gap-2 min-w-0 sm:col-span-2 xl:col-span-1">
                                        <MapPin className="h-4 w-4 text-red-500 flex-shrink-0" />
                                        <span className="truncate">{event.venue}</span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </div>

                    <div className="relative w-full sm:w-64 h-48 flex-shrink-0 mt-4 sm:mt-0 px-4 sm:px-0">
                        {firstImage ? (
                            <div className="relative w-full h-full">
                                <img
                                    src={firstImage}
                                    alt={event.title}
                                    className="w-full h-full object-cover rounded-xl"
                                    onError={(e) => {
                                        // Fallback if image fails to load
                                        e.target.style.display = 'none'
                                        e.target.nextSibling.style.display = 'flex'
                                    }}
                                />
                                <div
                                    className="w-full h-full bg-gray-200 rounded-xl items-center justify-center absolute inset-0"
                                    style={{ display: 'none' }}
                                >
                                    <CalendarDays className="h-12 w-12 text-gray-400" />
                                </div>
                                {event.category && (
                                    <Badge variant="secondary" className="absolute top-2 right-2 capitalize">
                                        {event.category.toLowerCase()}
                                    </Badge>
                                )}
                            </div>
                        ) : (
                            <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center relative">
                                <CalendarDays className="h-12 w-12 text-gray-400" />
                                {event.category && (
                                    <Badge variant="secondary" className="absolute top-2 right-2 capitalize">
                                        {event.category.toLowerCase()}
                                    </Badge>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        )
    }

    const EventSkeleton = () => (
        <Card className="border-l-4 border-l-gray-300">
            <div className="flex flex-col sm:flex-row items-center">
                <div className="flex-1 w-full">
                    <CardContent className="py-6">
                        <div>
                            <Skeleton className="h-6 w-2/3 mb-2" />
                            <Skeleton className="h-4 w-1/4 mb-3" />
                            <Skeleton className="h-4 w-2/3 mb-2" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4 rounded" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4 rounded" />
                                <Skeleton className="h-4 w-16" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4 rounded" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        </div>
                    </CardContent>
                </div>
                <div className="w-full sm:w-64 h-48 flex-shrink-0 mt-4 sm:mt-0 px-4 sm:px-0">
                    <Skeleton className="w-full h-full rounded-xl" />
                </div>
            </div>
        </Card>
    )

    return (
        <div className="container mx-auto max-w-7xl px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="nav-sentinel text-4xl mb-4">
                    Discover Amazing Events
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Find and join events that match your interests, schedule, and location
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1">
                    <SearchBox onEventSelect={handleEventSelect} />
                </div>
                <div className="flex-shrink-0">
                    <FilterDialog
                        filterOpen={filterOpen}
                        setFilterOpen={setFilterOpen}
                        filters={filters}
                        handleFilterChange={handleFilterChange}
                        clearAllFilters={clearAllFilters}
                        activeFiltersCount={getActiveFiltersCount()}
                        onApply={onApplyFilters}
                    />
                </div>
            </div>

            {selectedEventFromSearch && (
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                        <h2 className="text-lg font-semibold text-green-700">Selected Event</h2>
                        <button
                            onClick={() => setSelectedEventFromSearch(null)}
                            className="text-sm text-green-600 hover:text-green-800 cursor-pointer"
                        >
                            Clear selection
                        </button>
                    </div>
                </div>
            )}

            {getActiveFiltersCount() > 0 && (
                <div className="p-4 bg-gray-50 rounded-lg mb-4">
                    <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-sm font-medium text-gray-700">Active filters:</span>
                        {filters.category && filters.category !== 'anything' && (
                            <Badge variant="secondary" className="capitalize">
                                {filters.category}
                            </Badge>
                        )}
                        {filters.tags && filters.tags.map(tag => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                        {filters.timeFilter && filters.timeFilter !== 'anytime' && (
                            <Badge variant="secondary" className="capitalize">
                                {filters.timeFilter.replace(/([A-Z])/g, ' $1')}
                            </Badge>
                        )}
                        {filters.location && (
                            <Badge variant="secondary">
                                📍 {filters.location}
                            </Badge>
                        )}
                        <button
                            onClick={clearAllFilters}
                            className="text-sm text-blue-600 hover:text-blue-800 ml-2 cursor-pointer"
                        >
                            Clear all
                        </button>
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-3 mx-auto my-16">
                <div className="space-y-8">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, index) => (
                            <EventSkeleton key={index} />
                        ))
                    ) : organizedEvents().length > 0 ? (
                        organizedEvents().map((event, index) => {
                            const isSelected = selectedEventFromSearch && event.id === selectedEventFromSearch.id
                            return renderEventCard(event, isSelected)
                        })
                    ) : (
                        <div className="text-center py-12">
                            <CalendarDays className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-500 mb-2">No events found</h3>
                            <p className="text-gray-400">
                                {getActiveFiltersCount() > 0
                                    ? "Try adjusting your filters to see more events."
                                    : "Check back later for upcoming events!"
                                }
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <EventDetailDialog
                event={selectedEvent}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
            />
        </div>
    )
}

export default EventsDisplay