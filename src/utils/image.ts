import { ENV } from "@/config/env";
import type { ImageSize, ImageType } from "@/types/image";
import { IMAGE_SIZES } from "@/types/image";

const PLACEHOLDER_IMAGES: Record<ImageType, string> = {
  poster: "/placeholder-poster.png",
  backdrop: "/placeholder-backdrop.png",
  profile: "/placeholder-profile.png",
};

export const getImageUrl = (
  path: string | null,
  size: keyof typeof IMAGE_SIZES = "medium",
  type: ImageType = "backdrop",
): string => {
  if (!path) {
    return PLACEHOLDER_IMAGES[type];
  }

  return `${ENV.TMDB_IMAGE_BASE_URL}/${IMAGE_SIZES[size]}${path}`;
};

export const getPosterUrl = (
  path: string | null,
  size: keyof typeof IMAGE_SIZES = "medium",
): string => {
  return getImageUrl(path, size, "poster");
};

export const getBackdropUrl = (
  path: string | null,
  size: keyof typeof IMAGE_SIZES = "large",
): string => {
  return getImageUrl(path, size, "backdrop");
};

export const getImageUrlByType = (
  path: string | null,
  type: ImageType = "backdrop",
  size?: ImageSize,
): string => {
  const defaultSizes: Record<ImageType, ImageSize> = {
    poster: "medium",
    backdrop: "large",
    profile: "medium",
  };

  return getImageUrl(path, size || defaultSizes[type]);
};

export const isValidImagePath = (path: string | null): path is string => {
  return path !== null && path !== undefined && path.trim() !== "";
};

export const getImagePlaceholder = (type: ImageType = "backdrop"): string => {
  return PLACEHOLDER_IMAGES[type];
};
