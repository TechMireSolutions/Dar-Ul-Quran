import { renderToString } from 'react-dom/server';
import React from 'react';
const el1 = React.createElement('link', { rel: 'preload', as: 'image', imageSrcSet: 'foo' });
const el2 = React.createElement('link', { rel: 'preload', as: 'image', imagesrcset: 'bar' });
console.log(renderToString(React.createElement('div', null, el1, el2)));
