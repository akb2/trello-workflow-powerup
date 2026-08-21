export const connectStyle = (href: string): HTMLLinkElement => {
  const existing = Array
    .from(document.head.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'))
    .find((link) => link.href === new URL(href, window.location.href).href);

  if (existing) {
    return existing;
  }

  const link = document.createElement("link");

  link.rel = "stylesheet";
  link.href = href;

  document.head.appendChild(link);

  return link;
};