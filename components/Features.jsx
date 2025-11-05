import { Calendar, Globe, Search, Shield, Users, Zap } from 'lucide-react';
import React from 'react'

const Features = () => {
    const features = [
        {
            icon: <Search className="h-8 w-8" />,
            title: "Smart Discovery",
            description: "AI-powered recommendations help you find events that match your interests and preferences.",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: <Calendar className="h-8 w-8" />,
            title: "Easy Management",
            description: "Organize your events, track attendance, and manage bookings all in one place.",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: <Users className="h-8 w-8" />,
            title: "Community Building",
            description: "Connect with like-minded people and build lasting relationships through shared experiences.",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: <Globe className="h-8 w-8" />,
            title: "Global Reach",
            description: "Discover events worldwide or in your local area with our comprehensive event database.",
            color: "from-orange-500 to-red-500"
        },
        {
            icon: <Shield className="h-8 w-8" />,
            title: "Secure Payments",
            description: "Safe and secure payment processing with multiple payment options for your convenience.",
            color: "from-indigo-500 to-purple-500"
        },
        {
            icon: <Zap className="h-8 w-8" />,
            title: "Real-time Updates",
            description: "Get instant notifications about event changes, new recommendations, and special offers.",
            color: "from-yellow-500 to-orange-500"
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Why Choose Our Platform?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We're revolutionizing how people discover and experience events with cutting-edge technology and user-centric design
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {features.map((feature, index) => (
                        <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                            <CardContent className="p-8">
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features