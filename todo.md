# TODO

## Guidelines

- [x] Must be an SPA
- [x] Must have dev and production modes
- [x] Must have a README.md with instructions
- [x] Must be published on GitHub or Bitbucket

## Limitations

- [x] Clean URLs (no hashbangs)
- [x] Anything but Ember or AngularJS

## Views

- [x] Home

  - [x] Shows a list of 100 most popular podcasts from iTunes
  - [x] Caches the list for 24 hours
  - [x] Has filtering by name and author
  - [x] Filters are applied in real time
  - [x] Clicking on a podcast navigates to the podcast page

- [x] Podcast

  - [x] Shows the podcast details in an aside (name, author, image, description)
  - [x] Shows the podcast episodes and number of episodes
  - [x] Caches the podcast info for 24 hours
  - [x] Clicking on an episode navigates to the episode page

- [x] Episode

  - [x] Shows the podcast details (name, author, image, description)
    - [x] Image and title are clickable and navigate to the podcast page
  - [x] Shows the episode details (title and description)
  - [x] Shows the episode audio player
  - [x] Renders description as HTML

- [x] Header
  - [x] Title is a link to the home page
  - [x] Has a global loader indicator

## Other

- [x] Close all todos
- [x] Add styles
- [ ] Refactor to use better names
