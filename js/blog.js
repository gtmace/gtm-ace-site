async function fetchPosts() {
  try {
    const res = await fetch('/content/blog/index.json');
    if (!res.ok) throw new Error('Failed to fetch posts');
    return await res.json();
  } catch (err) {
    console.error('Error loading posts:', err);
    return [];
  }
}

// Render blog list
async function renderBlogList(id) {
  const posts = await fetchPosts();
  const el = document.getElementById(id);

  if (!posts.length) {
    el.innerHTML = "<p>No blog posts found.</p>";
    return;
  }

  el.innerHTML = "";

  posts.forEach(p => {
    el.innerHTML += `
      <div style="background:#fff; padding:25px; border-radius:12px; margin-bottom:20px; border:1px solid #E5EAF2;">
        <h2 style="margin-bottom:10px;">${p.title}</h2>
        <p style="color:#555;">${p.description || ""}</p>
        <a href="/blog/post-page.html?slug=${p.slug}" style="color:#1A6FD4; font-weight:600; text-decoration:none;">
          Read →
        </a>
      </div>
    `;
  });
}

// Render individual post
async function renderPost() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  // 🔒 Guard clause (critical)
  if (!slug) {
    document.body.innerHTML = "<h2>Invalid post URL</h2>";
    return;
  }

  try {
    const res = await fetch(`/content/blog/${slug}.json`);

    if (!res.ok) {
      throw new Error("Post file not found");
    }

    const post = await res.json();

    // 🔒 Validate content
    if (!post || !post.title) {
      throw new Error("Invalid post data");
    }

    document.getElementById('title').innerText = post.title;
    document.getElementById('content').innerHTML = post.body || "";
    document.title = post.title + " | GTM Ace";

    const meta = document.getElementById("meta-desc");
if (meta && post.description) {
  meta.setAttribute("content", post.description);
}

  } catch (err) {
    console.error("BLOG ERROR:", err);
    document.body.innerHTML = "<h2>Post not found</h2>";
  }
}
