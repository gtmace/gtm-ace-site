async function fetchPosts(){
  return await fetch('/content/blog/index.json')
    .then(res => res.json());
}

async function renderBlogList(id){
  const posts = await fetchPosts();
  const el = document.getElementById(id);

  posts.forEach(p=>{
    el.innerHTML += `
      <div style="margin-bottom:20px;">
        <h2>${p.title}</h2>
        <p>${p.description}</p>
        <a href="/blog/${p.slug}">Read →</a>
      </div>`;
  });
}

async function renderPost(){
  const slug = window.location.pathname.split('/blog/')[1];
  const posts = await fetchPosts();
  const post = posts.find(p => p.slug === slug);

  document.getElementById('title').innerText = post.title;
  document.getElementById('content').innerHTML = post.body || '';
}
