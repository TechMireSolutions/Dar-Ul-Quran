const { createClient } = require('@sanity/client');
const client = createClient({
  projectId: 'ga01p6l0',
  dataset: 'production',
  apiVersion: '2023-11-20',
  useCdn: true
});
client.fetch('*[_type == "course"]{title, "slug": slug.current}').then(d => {
  const c = d.find(x => x.title === 'معلمات کلاس');
  console.log(JSON.stringify(c.slug));
  console.log(c.slug.length);
  for(let i=0; i<c.slug.length; i++) console.log(c.slug.charCodeAt(i));
});
