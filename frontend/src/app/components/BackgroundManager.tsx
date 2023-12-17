import { imageUrls } from "../../data-types/constants";

/**
 * Class responsible for managing the background images.
 */
export default class BackgroundManager {
  private static instance: BackgroundManager | null = null;

  /**
   * Creates an instance of BackgroundManager.
   * If an instance already exists, returns the existing instance.
   */
  public constructor() {
    if (BackgroundManager.instance) {
      return BackgroundManager.instance;
    }

    BackgroundManager.instance = this;
    return this;
  }

  /**
   * Returns a random image URL from the available image URLs.
   * @returns A random image URL.
   */
  getRandomImageUrl = () => {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
  };
}
