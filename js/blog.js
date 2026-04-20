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
        <a href="/blog/post.html?slug=${p.slug}" style="color:#1A6FD4; font-weight:600; text-decoration:none;">
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

  try {
    const res = await fetch(`/content/blog/${slug}.json`);
    const post = await res.json();

    document.getElementById('title').innerText = post.title;
    document.getElementById('content').innerHTML = post.body || "";

  } catch (err) {
    document.body.innerHTML = "<h2>Post not found</h2>";
  }
}
