import type { MediaBase } from "./common";

export interface TV extends MediaBase {
  name: string;
  original_name: string;
  first_air_date: string;
}

export interface Season {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  episode_count: number;
  air_date: string | null;
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  still_path: string | null;
  episode_number: number;
  season_number: number;
  air_date: string | null;
  vote_average: number;
  runtime: number | null;
}

export interface TVDetail extends TV {
  seasons: Season[];
  number_of_seasons: number;
  number_of_episodes: number;
  status: string;
  tagline: string;
  type: string;
}
