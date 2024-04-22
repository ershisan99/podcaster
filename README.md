# Front-end test for INDITEX

## Instructions

1. Clone this repository
2. Run `pnpm install`. If you don't have `pnpm` installed, you can install it by running `npm install -g pnpm`.
3. For development, run `pnpm dev`. This will start the development server and open the browser. The assets served are
	 not optimized for production (not minimized)
4. For production, run `pnpm build`. This will generate the optimized assets in the `dist` folder. To serve the assets,
	 you can run `pnpm serve` or any other server of your choice.

## About the solution

### Caching requests

Requests are persisted for 24 hours in `IndexedDB`. It was chosen over `localstorage` due to
its asynchronous nature and better performance, as well as local storage's 5MB limit.

By default, all requests are cached, since it aligns with the requirements of the test.
However, this behaviour can be modified on per-request basis if needed.

### RSS Parsing instead of iTunes API

The requirements specify that the `description` field should be rendered as HTML.
The problem with using ITunes API is that it strips all HTML tags from the description field.

To circumvent this, the ITunes lookup API is only used to fetch the podcast details, from which the RSS feed URL is
extracted.
The RSS feed is then fetched and parsed to get the description field with HTML tags.

The description is later sanitized to remove any potentially harmful tags.

### Known issues

- The RSS feed is fetched and parsed on the client side. This can be a performance bottleneck if the feed is large.
- Due to RSS feed being fetch on the client side, CORS issues can arise if the feed is not properly configured. The
	current solution
	tries to fetch the feed directly first, and if it fails, it tries to fetch it through a proxy. The proxy in question
	is often times very slow
	and is not a good solution for production. A better solution would be to fetch and parse the feed on the server side.
- RSS feed in not very well standardized, so some feeds might not be parsed correctly. In a real-world scenario, this
	would be handled on a case-by-case basis and would require a lot of testing.