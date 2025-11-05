import React from 'react'

const CTA = () => {
    return (
        <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Ready to Start Your Journey?
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                    Join thousands of event enthusiasts and organizers who are already creating amazing experiences
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                        Get Started Free
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
                        Create Event
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default CTA