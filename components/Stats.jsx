import React from 'react'

const Stats = () => {
    const stats = [
        { number: "50K+", label: "Active Users", icon: <Users className="h-8 w-8" /> },
        { number: "10K+", label: "Events Hosted", icon: <Calendar className="h-8 w-8" /> },
        { number: "100+", label: "Cities Covered", icon: <MapPin className="h-8 w-8" /> },
        { number: "4.9", label: "Average Rating", icon: <Star className="h-8 w-8" /> }
    ];

    return (
        <section className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center text-white">
                            <div className="flex justify-center mb-4 text-white/80">
                                {stat.icon}
                            </div>
                            <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                            <div className="text-white/90">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};



export default Stats