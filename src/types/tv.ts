import type { MediaBase } from "./common";

export interface TV extends MediaBase {
  name: string;
  original_name: string;
  first_air_date: string;
}
