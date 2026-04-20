async function fetchPosts(){
  const res = await fetch('/content/blog/');
  const text = await res.text();
  const matches = [...text.matchAll(/href="(.*?\.json)"/g)];
  const files = matches.map(m=>m[1]);

  const posts = await Promise.all(files.map(f=>fetch('/content/blog/'+f).then(r=>r.json())));
  return posts.sort((a,b)=> new Date(b.date||0)-new Date(a.date||0));
}

async function renderBlogPreview(elId,limit){
  const posts = await fetchPosts();
  const el = document.getElementById(elId);
  posts.slice(0,limit).forEach(p=>{
    el.innerHTML += `<div class="blog-card">
      <h3>${p.title}</h3>
      <p>${p.description||''}</p>
      <a href="/post.html?slug=${p.slug}">Read</a>
    </div>`;
  });
}

async function renderBlogList(elId){
  const posts = await fetchPosts();
  const el = document.getElementById(elId);
  posts.forEach(p=>{
    el.innerHTML += `<div class="blog-card">
      <h3>${p.title}</h3>
      <p>${p.description||''}</p>
      <a href="/post.html?slug=${p.slug}">Read</a>
    </div>`;
  });
}

async function renderPost(){
  const slug = new URLSearchParams(location.search).get('slug');
  const post = await fetch('/content/blog/'+slug+'.json').then(r=>r.json());

  document.title = post.title;
  document.getElementById('title').innerText = post.title;
  document.getElementById('content').innerHTML = post.body;

  if(post.description){
    document.getElementById('meta-desc').setAttribute('content',post.description);
  }
}
