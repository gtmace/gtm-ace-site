export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Extract slug
  const slug = url.pathname.replace("/blog/", "");

  // If it's exactly /blog or empty → serve blog list
  if (!slug || slug === "") {
    return context.env.ASSETS.fetch(new Request(url.origin + "/blog.html"));
  }

  // Otherwise → serve post page
  return context.env.ASSETS.fetch(new Request(url.origin + "/blog/post-page.html"));
}
