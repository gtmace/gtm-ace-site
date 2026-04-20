async function fetchPosts(){
  const res = await fetch('/content/blog/');
  const text = await res.text();
  const matches = [...text.matchAll(/href="(.*?\.json)"/g)];
  const files = matches.map(m=>m[1]);

  const posts = await Promise.all(files.map(f=>fetch('/content/blog/'+f).then(r=>r.json())));
  return posts.sort((a,b)=> new Date(b.date)-new Date(a.date));
}

async function renderBlogList(elId){
  const posts = await fetchPosts();
  const el = document.getElementById(elId);

  posts.forEach(p=>{
    el.innerHTML += `
      <div style="margin-bottom:20px;">
        <h2>${p.title}</h2>
        <p>${p.description || ''}</p>
        <a href="/blog/${p.slug}">Read →</a>
      </div>`;
  });
}

async function renderPost(){
  const slug = window.location.pathname.split("/blog/")[1];
  const post = await fetch('/content/blog/'+slug+'.json').then(r=>r.json());

  document.title = post.title;
  document.getElementById('title').innerText = post.title;
  document.getElementById('content').innerHTML = post.body;

  document.getElementById('meta-desc').setAttribute('content', post.description || '');
  document.getElementById('canonical').setAttribute('href','https://www.gtmace.com/blog/'+slug);
  document.getElementById('og-title').setAttribute('content',post.title);
  document.getElementById('og-desc').setAttribute('content',post.description || '');
}
