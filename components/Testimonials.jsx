import React from 'react'

const Testimonials = () => {
    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Event Organizer",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80",
            content: "This platform transformed how I manage events. The interface is intuitive and my attendees love the seamless experience.",
            rating: 5
        },
        {
            name: "Mike Chen",
            role: "Music Enthusiast",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
            content: "I've discovered so many amazing concerts and festivals through this platform. The recommendations are spot-on!",
            rating: 5
        },
        {
            name: "Emily Rodriguez",
            role: "Community Leader",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
            content: "The community features helped me connect with like-minded people. I've made lasting friendships through events here.",
            rating: 5
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        What Our Users Say
                    </h2>
                    <p className="text-xl text-gray-600">
                        Don't just take our word for it - hear from our community
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardContent className="p-8">
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                                <div className="flex items-center">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <div className="font-semibold">{testimonial.name}</div>
                                        <div className="text-gray-500 text-sm">{testimonial.role}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};


export default Testimonials