/**
 * Image Utility Types
 * Public types for image handling throughout the app
 */

export const IMAGE_SIZES = {
  small: "w342",
  medium: "w500",
  large: "w780",
  original: "original",
} as const;

export type ImageSize = keyof typeof IMAGE_SIZES;
export type ImageType = "poster" | "backdrop" | "profile";
