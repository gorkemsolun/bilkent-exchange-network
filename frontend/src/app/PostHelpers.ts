import Resizer from "react-image-file-resizer";
import { defaultImage, urlsGet } from "../data-types/constants.ts";
import { FilterParams } from "../data-types/datatypes.ts";

/**
 * Prepares the URL for making a request based on the provided parameters.
 *
 * @param sortType - The sort type for the request.
 * @param searchTerm - The search term for the request.
 * @param type - The type of the request.
 * @param filterParams - The filter parameters for the request.
 * @returns The prepared URL.
 */
export function prepareUrl(
  sortType: string,
  searchTerm: string,
  type: string,
  filterParams: FilterParams
) {
  let url: string = urlsGet[type as keyof typeof urlsGet];
  if (filterParams) {
    if (type !== "sectionexchange") {
      if (filterParams.categories.length > 0) {
        url = url.replace(":categories", filterParams.categories.join(","));
      } else {
        url = url.replace(":categories", "All");
      }
    }

    if (type === "secondhand" || type === "sectionexchange") {
      if (filterParams.prices.min && filterParams.prices.max) {
        url = url.replace(
          ":price",
          filterParams.prices.min + "*" + filterParams.prices.max
        );
      } else if (filterParams.prices.min) {
        url = url.replace(":price", filterParams.prices.min + "*" + "All");
      } else if (filterParams.prices.max) {
        url = url.replace(":price", "All" + "*" + filterParams.prices.max);
      } else {
        url = url.replace(":price", "All");
      }
    }

    if (type === "sectionexchange") {
      url = url.replace(":offeredCourse", filterParams.offeredCourse);
      url = url.replace(":desiredCourse", filterParams.desiredCourse);
      url = url.replace(":offeredSection", String(filterParams.offeredSection));
      url = url.replace(":desiredSection", String(filterParams.desiredSection));
    }

    if (type === "lostfound") {
      url = url.replace(":status", filterParams.status);
    }

    if (filterParams.dates.startDate && filterParams.dates.endDate) {
      url = url.replace(
        ":date",
        new Date(Date.parse(filterParams.dates.startDate)).toISOString() +
          "*" +
          new Date(Date.parse(filterParams.dates.endDate)).toISOString()
      );
    } else if (filterParams.dates.startDate) {
      url = url.replace(
        ":date",
        new Date(Date.parse(filterParams.dates.startDate)).toISOString() +
          "*" +
          "All"
      );
    } else if (filterParams.dates.endDate) {
      url = url.replace(
        ":date",
        "All" +
          "*" +
          new Date(Date.parse(filterParams.dates.endDate)).toISOString()
      );
    } else {
      url = url.replace(":date", "All");
    }
  }

  if (filterParams && filterParams.limit) {
    url = url.replace(":limit", String(filterParams.limit));
  } else {
    url = url.replace(":limit", "10");
  }

  if (filterParams && filterParams.page) {
    url = url.replace(":page", String(filterParams.page - 1));
  } else {
    url = url.replace(":page", "0");
  }

  if (searchTerm) {
    url = url.replace(":search", searchTerm);
  } else {
    url = url.replace(":search", "All");
  }

  if (sortType) {
    url = url.replace(":sort", sortType);
  } else {
    url = url.replace(":sort", "All");
  }

  return url;
}

/* Not used but may be used in the future
export async function getBase64Image(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result as string);
    };
    reader.onerror = function (error) {
      reject(error);
    };
  });
}
*/

/**
 * Checks if a file is an image.
 * @param file - The file to check.
 * @returns `true` if the file is an image, `false` otherwise.
 */
export function isFileImage(file: File) {
  if (file && file.type.includes("image")) {
    return true;
  }
  return false;
}

/**
 * Resizes an image file to a specified width and height.
 * If the file is not an image, it returns a default image.
 * @param file The image file to be resized.
 * @returns A promise that resolves to the resized image URI as a base64 string.
 */
export async function resizeImageFile(file: File) {
  if (isFileImage(file) === false) {
    return defaultImage;
  }
  return new Promise<string>((resolve) => {
    Resizer.imageFileResizer(
      file,
      400,
      400,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri as string);
      },
      "base64"
    );
  });
}
