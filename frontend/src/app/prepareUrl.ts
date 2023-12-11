import { urls } from "../data-types/constants.ts";
import { FilterParams } from "../data-types/datatypes.ts";

export default function prepareUrl(
  filterParams: FilterParams,
  searchTerm: string,
  type: string
) {
  let url: string = urls[type as keyof typeof urls];

  if (filterParams.categories.length > 0) {
    url = url.replace(":categories", filterParams.categories.join(","));
  } else {
    url = url.replace(":categories", "all");
  }

  if (type === "secondhand") {
    if (filterParams.prices.min && filterParams.prices.max) {
      url = url.replace(
        ":price",
        filterParams.prices.min + "*" + filterParams.prices.max
      );
    } else if (filterParams.prices.min) {
      url = url.replace(":price", filterParams.prices.min + "*" + "all");
    } else if (filterParams.prices.max) {
      url = url.replace(":price", "all" + "*" + filterParams.prices.max);
    } else {
      url = url.replace(":price", "all");
    }
  }

  if (type === "lostfound") {
    url = url.replace(":status", filterParams.status);
  }

  if (filterParams.dates.startDate && filterParams.dates.endDate) {
    url = url.replace(
      ":date",
      filterParams.dates.startDate.toISOString() +
        "*" +
        filterParams.dates.endDate.toISOString()
    );
  } else if (filterParams.dates.startDate) {
    url = url.replace(
      ":date",
      filterParams.dates.startDate.toISOString() + "*" + "all"
    );
  } else if (filterParams.dates.endDate) {
    url = url.replace(
      ":date",
      "all" + "*" + filterParams.dates.endDate.toISOString()
    );
  } else {
    url = url.replace(":date", "all");
  }

  if (searchTerm) {
    url = url.replace(":search", searchTerm);
  } else {
    url = url.replace(":search", "all");
  }

  return url;
}
