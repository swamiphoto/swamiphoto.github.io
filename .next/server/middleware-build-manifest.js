self.__BUILD_MANIFEST = {
  "polyfillFiles": [
    "static/chunks/polyfills.js"
  ],
  "devFiles": [
    "static/chunks/react-refresh.js"
  ],
  "ampDevFiles": [],
  "lowPriorityFiles": [],
  "rootMainFiles": [],
  "pages": {
    "/_app": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_app.js"
    ],
    "/_error": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_error.js"
    ],
    "/galleries": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/galleries.js"
    ],
    "/galleries/[gallerySlug]": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/galleries/[gallerySlug].js"
    ],
    "/image/[imageId]": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/image/[imageId].js"
    ],
    "/portfolio": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/portfolio.js"
    ],
    "/portfolio/landscapes": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/portfolio/landscapes.js"
    ]
  },
  "ampFirstPages": []
};
self.__BUILD_MANIFEST.lowPriorityFiles = [
"/static/" + process.env.__NEXT_BUILD_ID + "/_buildManifest.js",
,"/static/" + process.env.__NEXT_BUILD_ID + "/_ssgManifest.js",

];