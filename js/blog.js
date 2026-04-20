async function fetchPosts(){
 const res=await fetch('/content/blog/');
 const txt=await res.text();
 const matches=[...txt.matchAll(/href="(.*?\.json)"/g)];
 const files=matches.map(m=>m[1]);
 const posts=await Promise.all(files.map(f=>fetch('/content/blog/'+f).then(r=>r.json())));
 return posts.sort((a,b)=>new Date(b.date)-new Date(a.date));
}
async function renderBlogList(id){
 const posts=await fetchPosts();
 const el=document.getElementById(id);
 posts.forEach(p=>{el.innerHTML+=`<h2>${p.title}</h2><a href='/blog/${p.slug}'>Read</a>`});
}
async function renderPost(){
 const slug=location.pathname.split('/blog/')[1];
 const post=await fetch('/content/blog/'+slug+'.json').then(r=>r.json());
 document.getElementById('title').innerText=post.title;
 document.getElementById('content').innerHTML=post.body;
}
