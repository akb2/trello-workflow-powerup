export const connectStyle = async (href: string): Promise<HTMLLinkElement> => new Promise<HTMLLinkElement>((resolve, reject) => {
  const absoluteHref = href.replace(/\\/g, "/");
  const existing = Array
    .from(document.head.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'))
    .find((link) => link.href === new URL(absoluteHref, window.location.href).href);

  if (existing) {
    resolve(existing);

    return;
  }

  const link = document.createElement("link");

  link.rel = "stylesheet";
  link.href = absoluteHref;

  document.head.appendChild(link);

  link.onload = () => resolve(link);
  link.onerror = (err) => reject(err);
});