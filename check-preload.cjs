const fs = require('fs');
const html = fs.readFileSync('.next/server/app/index.html', 'utf8');
const preloads = html.match(/<link[^>]*rel="preload"[^>]*>/g);
if (preloads) {
  preloads.forEach(p => console.log(p));
} else {
  console.log("No preloads found");
}
