import { imageUrls } from "../../data-types/constants";

export default class BackgroundManager {
  private static instance: BackgroundManager | null = null;

  public constructor() {
    if (BackgroundManager.instance) {
      return BackgroundManager.instance;
    }

    BackgroundManager.instance = this;
    return this;
  }

  getRandomImageUrl = () => {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
  };
}
