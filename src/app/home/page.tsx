import React from 'react';
import HeroSection from './components/HeroSection';
import TrendingSection from './components/TrendingSection';
import MoodMatcherSection from './components/MoodMatcherSection';
import DoubleFeatureSection from './components/DoubleFeatureSection';
import GenreSection from './components/GenreSection';
import MovieDetailSection from './components/MovieDetailSection';
import StatsSection from './components/StatsSection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollAnimationProvider from './components/ScrollAnimationProvider';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-cine-bg overflow-x-hidden">
      <ScrollAnimationProvider />
      <Header />
      <HeroSection />
      <TrendingSection />
      <MoodMatcherSection />
      <DoubleFeatureSection />
      <MovieDetailSection />
      <GenreSection />
      <StatsSection />
      <Footer />
    </main>
  );
}
