export const imageFormatConverter = (url: string, customParams = {}) => {
  if (!url.includes("imagekit.io")) {
    throw new Error("Not a valid ImageKit URL");
  }

  const transforms = Object.entries(customParams)
    .map(([key, value]) => `${key}-${value}`)
    .join(",");

  const urlParts = url.split("/");

  const domainIndex = urlParts.findIndex((part: string) =>
    part.includes("imagekit.io")
  );

  if (domainIndex === -1) return url;

  urlParts.splice(domainIndex + 2, 0, `tr:${transforms}`);

  return urlParts.join("/");
};
