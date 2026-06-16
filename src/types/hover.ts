import type { MediaBase } from "./common";

export interface HoverCardData extends MediaBase {
  genres?: string[];
  rating?: string;
  runtime?: string;
  episodeCount?: number;
  trailerKey?: string | null;
}
