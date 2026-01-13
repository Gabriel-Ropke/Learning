export const verifyImageUrl = (str) => {
  if (typeof str != "string") return false;

  const normalizedStr = str.toLowerCase();

  const urlWithoutQuery = normalizedStr.split("?")[0];

  const startsWithHttp = urlWithoutQuery.startsWith("http");
  const validExtensions = [".jpg", ".png", ".jpeg", ".webp", ".avif", ".gif"];

  const endsWithValidExtension = validExtensions.some((ext) =>
    normalizedStr.endsWith(ext)
  );

  return startsWithHttp && endsWithValidExtension;
};
