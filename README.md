# PodcasterZ

[![Netlify Status](https://api.netlify.com/api/v1/badges/e6f59394-03f8-47eb-8626-f56c2a54c892/deploy-status)](https://app.netlify.com/sites/podcasterz/deploys)

This is an exercise done as part of a selection process where the requirements were to build a web app that can show the top 100 podcasts on iTunes and play them with whatever technology you wanted. The design was provided and the end result needed to match it as close as possible.

Since it was pretty freestyle I decided to go out of the traditional stack then and use vanilla JS and added a Web Worker to explore how something like this will wokr with offline support. I added a very simple lambda to have a nice abstraction on top of the fetch so it can deal with any potential CORS issues.

The end result was pretty fun and I think the worker proved to be quite useful by improving the experience and making the app feel extrmely fast, specially on load.

## Live site

The app is currently live on Netlify at [https://podcasterz.netlify.app/](https://podcasterz.netlify.app/).


## Run local instance

In order to run the local the project locally it only needs to have its dependencies intall and then run the start script:

```js
$ npm ci
$ npm start
```

It uses the Netlify dev server to run the lambda and the static server locally and shouled be accesible by default at `http://localhost:8888/`.

**Please note that the service worker will be disabled in the local version fo the app in order to facilitate the development**
In order to test the request caching please check the live site or change the `app/lib/bootstrap.js` file to not ignore localhost.
