# The Shoppies - Movie Nomination Website
[![Netlify Status](https://api.netlify.com/api/v1/badges/8d81b9a4-ad67-41d0-9532-550a14241836/deploy-status)](https://app.netlify.com/sites/shoppies-rdtbui/deploys)

Netlify Demo [here](https://shoppies-rdtbui.netlify.app/)

## Table of Contents
- Tools Used
- Technical Requirements
- Extra Implementations
- Thoughts and Improvements

## Tools Used
- Axios
- Flicking
- Material UI (core, icons, and lab)
- Netlify
- OMDB API
- React.js
- ReactPlayer
- YouTube API from Google Cloud Platform
  - Note: The YouTube API daily quota might have been reached if someone has spent it all by spamming videos on my live demo website. In that case, the trailer won't appear. I'm too broke to pay for more quotas.

## Technical Requirements

### Each search result should list at least its title, year of release and a button to nominate that film.
![search and display results demo](https://github.com/RdtBui/beta-shoppies/blob/master/demo/search-movie.gif)

### Updates to the search terms should update the result list.
![update search update result demo](https://github.com/RdtBui/beta-shoppies/blob/master/demo/update-search.gif)

### Following demo covers these two points
- ### Movies in search results can be added and removed from the nomination list.
- ### If a search result has already been nominated, disable its nominate button.
![add remove demo](https://github.com/RdtBui/beta-shoppies/blob/master/demo/nominate-add-remove-disable.gif)

### Display a banner when the user has 5 nominations.
![display banner on 5 nominations demo](https://github.com/RdtBui/beta-shoppies/blob/master/demo/banner-5-nomination.gif)

## Extra Features

### Oscar the Penguin! You will see him from time to time during the demos.

### Display information sheet + trailer according to movie. **The YouTube API daily quota might have been reached if someone has spent it all by spamming videos. I'm too broke to pay for more quotas.**
![video trailer demo](https://github.com/RdtBui/beta-shoppies/blob/master/demo/trailer-youtube-api.gif)

### View summary of the 5 nominated movies. I'm pretty proud of this idea but I could have improved it by a lot if I had more time.
![summary carousel demo](https://github.com/RdtBui/beta-shoppies/blob/master/demo/summary.gif)

### Animation on page load, there is also animation when adding movies on the nomination list. Gif quality poorly portrays the animation.
![animation on page load demo](https://github.com/RdtBui/beta-shoppies/blob/master/demo/animation-intro.gif)

### Load more.
![load more demo](https://github.com/RdtBui/beta-shoppies/blob/master/demo/load-more.gif)

### And when you go all the way down, you can go back up with just a click of a button.
![scroll up button demo](https://github.com/RdtBui/beta-shoppies/blob/master/demo/scroll-up.gif)

### Screen resizing for mobile, notice here I ran out of quota, the video trailer doesn't load but the UI still looks fine. I wouldn't use a free YouTube API key if this was a real website. It was for the purpose of showing extra features.
![resizing screen](https://github.com/RdtBui/beta-shoppies/blob/master/demo/screen-resize.gif)

### Autocomplete search bar that suggests the top 100 imDb movies.
![autocomplete search bar demo](https://github.com/RdtBui/beta-shoppies/blob/master/demo/top-100-imdb-pre-search.gif)

### Search bar error handling. Catches
- ### null entries
- ### vague entries (Too many results.)
- ### no movies with such title
![search bar handling demo](https://github.com/RdtBui/beta-shoppies/blob/master/demo/handle-search-error.gif)

### Warn the user when they try adding a movie when their nomination list is full + poster placeholder if it doesn't exists
![warn alert nomination full demo](https://github.com/RdtBui/beta-shoppies/blob/master/demo/warning-add-limit.gif)

## Thoughts and Improvements
Some improvements I could do for the next time:
- improve the summary to display the movie information alongside the filmstrip. When you swipe to the next movie, the information also changes with a slide animation on the same side as the swipe.
- improve on the structure of the project
- use a issue tracking software like the Project feature on GitHub or ZenHub. Instead I used a pen and paper to keep track of the backlog and tasks + wireframe
- have system tests with Selenium so I don't have to manually test each functionality every time I write new snippets of code
- improve the summary carousel for mobile... it's currently not the greatest... but the rest is mobile-friendly!
- add skeletons during asynchronous renders such as API requests to OMDB or YouTube API
- test on Mozilla Firefox and Safari. This website has already been tested succesfully on both Chromium, and Google Chrome
- hide the API keys. Don't worry, the YouTube API key is a public one with a daily limit. You won't burn my wallet.

Thanks for reaching the bottom of this page!
