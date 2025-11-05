'use client'

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  MapPin,
  Users,
  Search,
  Star,
  ArrowRight,
  Play,
  CheckCircle,
  Globe,
  Shield,
  Zap,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

// Hero Section Component
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&q=80",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <img
              src={img}
              alt={`Event ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}
      </div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-blue-600/20 to-teal-600/30 animate-pulse" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Discover
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            {" "}Amazing{" "}
          </span>
          Events
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Connect with your community, explore new experiences, and create unforgettable memories
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/events">
            <Button size="lg" variant="secondary">
              Explore Events
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

    </section >
  );
};

// Features Section Component
const FeaturesSection = () => {
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

// Stats Section Component
const StatsSection = () => {
  const [isInView, setIsInView] = useState(false);
  const [counts, setCounts] = useState({ users: 0, events: 0, cities: 0, rating: 0 });
  const sectionRef = React.useRef(null);

  const stats = [
    { key: 'users', number: 50000, display: "50K+", label: "Active Users", icon: <Users className="h-8 w-8" /> },
    { key: 'events', number: 10000, display: "10K+", label: "Events Hosted", icon: <Calendar className="h-8 w-8" /> },
    { key: 'cities', number: 100, display: "100+", label: "Cities Covered", icon: <MapPin className="h-8 w-8" /> },
    { key: 'rating', number: 4.9, display: "4.9", label: "Average Rating", icon: <Star className="h-8 w-8" /> }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isInView]);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds
    const frameRate = 60;
    const totalFrames = Math.round(duration / (1000 / frameRate));
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounts({
        users: Math.round(50000 * easeOut),
        events: Math.round(10000 * easeOut),
        cities: Math.round(100 * easeOut),
        rating: +(4.9 * easeOut).toFixed(1)
      });

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, 1000 / frameRate);

    return () => clearInterval(counter);
  }, [isInView]);

  const formatNumber = (num, key) => {
    if (key === 'rating') return num;
    if (key === 'users' && num >= 1000) return `${Math.floor(num / 1000)}K+`;
    if (key === 'events' && num >= 1000) return `${Math.floor(num / 1000)}K+`;
    if (key === 'cities') return `${num}+`;
    return num;
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600">
      <div className="container px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white transform hover:scale-110 transition-all duration-300">
              <div className="flex justify-center mb-4 text-white/80 animate-bounce" style={{ animationDelay: `${index * 0.2}s` }}>
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {isInView ? formatNumber(counts[stat.key], stat.key) : '0'}
              </div>
              <div className="text-white/90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Component
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Event Organizer",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&q=80",
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
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

// CTA Section Component
const CTASection = () => {
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
          <a href="/events">
            <Button size="lg" variant="secondary">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
          <a href="/events">
            <Button size="lg" variant="default">
              Create Event
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const footerLinks = {
    "Platform": ["Browse Events", "Create Event", "Pricing", "API"],
    "Support": ["Help Center", "Contact Us", "Community", "Status"],
    "Company": ["About", "Careers", "Blog", "Press"],
    "Legal": ["Privacy", "Terms", "Cookies", "Security"]
  };

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "#", name: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", name: "Twitter" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", name: "Instagram" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", name: "LinkedIn" }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto max-w-7xl px-4 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              EventsPlatform
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Connecting people through amazing experiences. Discover, create, and share events that matter.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4 text-white">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="font-semibold mb-2">Stay updated</h4>
              <p className="text-gray-400">Get the latest events and updates delivered to your inbox</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Input
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 md:w-80"
              />
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 py-6 mt-8 text-center text-gray-400">
          <p>&copy; 2024 EventsPlatform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Page Component
const EventsLandingPage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default EventsLandingPage;