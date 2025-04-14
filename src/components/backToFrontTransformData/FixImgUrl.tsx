export const FixImgUrl = (url: string | null | undefined) => {
  if (!url) return "no-profilePicture-default-image.jpg"; // Защита от null и undefined
  if (url.includes("imgur.com") && !url.includes("i.imgur.com")) {
    return url.replace("imgur.com", "i.imgur.com") + ".jpg";
  }
  return url;
};

//не удалять
export const FixArrayImgUrls = (urls: string[]): string[] => {
  return urls.map((url) =>
    url.includes("imgur.com") && !url.includes("i.imgur.com")
      ? url.replace("imgur.com", "i.imgur.com") + ".jpg"
      : url
  );
};

//не удалять
export const FixAllImgUrl = (
  params: { array?: string[]; url?: string },
  switcher: "array" | "picture" = "array"
): string | string[] => {
  if (switcher === "array" && params.array) {
    return params.array.map((url) =>
      url.includes("imgur.com") && !url.includes("i.imgur.com")
        ? url.replace("imgur.com", "i.imgur.com") + ".jpg"
        : url
    );
  }

  if (switcher === "picture" && params.url) {
    return params.url.includes("imgur.com") &&
      !params.url.includes("i.imgur.com")
      ? params.url.replace("imgur.com", "i.imgur.com") + ".jpg"
      : params.url;
  }

  return switcher === "array"
    ? []
    : `${import.meta.env.BASE_URL}gallery-default-picture.jpg`;
};
