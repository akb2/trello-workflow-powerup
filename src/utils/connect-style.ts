export const connectStyle = (href: string): HTMLLinkElement => {
  const absoluteHref = href.replace(/\\/g, "/");
  const existing = Array
    .from(document.head.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'))
    .find((link) => link.href === new URL(absoluteHref, window.location.href).href);

  if (existing) {
    return existing;
  }

  const link = document.createElement("link");

  link.rel = "stylesheet";
  link.href = absoluteHref;

  document.head.appendChild(link);

  return link;
};