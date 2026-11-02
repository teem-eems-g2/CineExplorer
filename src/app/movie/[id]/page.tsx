import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allMovies, featuredMovie, getMovieById, getSimilarMovies } from '@/data/Movies';
import { getLiveMovieDetails } from '@/lib/tmdb';
import { getOmdbMovieDetails } from '@/lib/omdb';
import MovieDetailClient from './MovieDetailClient';

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const ids = [...allMovies, featuredMovie].map((m) => ({ id: m.id.toString() }));
  return ids;
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const { id } = await params;
  let movie = getMovieById(id);

  if (!movie) {
    movie = (await getLiveMovieDetails(id)) || undefined;
  }
  if (!movie) {
    movie = (await getOmdbMovieDetails(id)) || undefined;
  }

  if (!movie) {
    return {
      title: 'Movie Not Found — CineExplorer',
    };
  }

  return {
    title: `${movie.title} (${movie.year}) — CineExplorer`,
    description: movie.synopsis,
    openGraph: {
      title: `${movie.title} (${movie.year})`,
      description: movie.synopsis,
      images: [movie.backdrop || movie.poster],
    },
  };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  let movie = getMovieById(id);

  if (!movie) {
    movie = (await getLiveMovieDetails(id)) || undefined;
  }
  if (!movie) {
    movie = (await getOmdbMovieDetails(id)) || undefined;
  }

  if (!movie) {
    notFound();
  }

  const similar = getSimilarMovies(movie.id, 6);

  return <MovieDetailClient movie={movie} similarMovies={similar} />;
}
