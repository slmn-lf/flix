import type { MediaBase } from "./common";

export interface Movie extends MediaBase {
  title: string;
  original_title: string;
  release_date: string;
}
