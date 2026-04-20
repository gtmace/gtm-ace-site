async function fetchPosts(){
  try {
    const res = await fetch('/content/blog/index.json');
    return await res.json();
  } catch (e) {
    console.error("Blog fetch failed:", e);
    return [];
  }
}

async function renderBlogList(id){
  const posts = await fetchPosts();
  const el = document.getElementById(id);

  if (!posts.length) {
    el.innerHTML = "<p>No blog posts found.</p>";
    return;
  }

  posts.forEach(p=>{
    el.innerHTML += `
      <div style="margin-bottom:20px;">
        <h2>${p.title}</h2>
        <p>${p.description}</p>
        <a href="/blog/${p.slug}">Read Blog→</a>
      </div>`;
  });
}

function renderPost(){
  const slug = window.location.pathname.split('/blog/')[1];

  fetch('/content/blog/index.json')
    .then(res => res.json())
    .then(posts => {
      const post = posts.find(p => p.slug === slug);

      if (!post) {
        document.body.innerHTML = "<h2>Post not found</h2>";
        return;
      }

      document.getElementById('title').innerText = post.title;
      document.getElementById('content').innerHTML = post.body || "";
    });
}
