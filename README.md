[![Build Status](https://travis-ci.org/telemark/micro-portalen-content.svg?branch=master)](https://travis-ci.org/telemark/micro-portalen-content)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# micro-portalen-content

Microservice for portalen content.

Retrieves content from different services based on your roles.

## API

### `GET /api/content`

Returns content for roles

```bash
$ curl https://content.portalen.win/api/content?roles=alle|administrasjonen|skole
```

### `POST /api/content`

Returns content for roles

```bash
$ curl -d '{"roles": ["alle", "administrasjonen", "skole"]}' https://content.portalen.win/api/content
```
## About the service

The roles will be mapped to tags and then service will collect posts from different WP-instances based om those tags.

The results will be sorted by date. Cached based on the combination of tags and returned to the user.

## Development

Add a local `.env` file

```
NODE_ENV=development
CONTENT_URL=url-to-content
SHARED_CONTENT_URL=url-to-shared-content
PAPERTRAIL_HOST=papertrail-host
PAPERTRAIL_PORT=papertrail-port
PAPERTRAIL_HOSTNAME=portalen
```

## Deploy

Make sure all secrets required by [now.json](now.json) is available for the instance.

Run the deploy script.

```
$ npm run deploy
```

## License

[MIT](LICENSE)
