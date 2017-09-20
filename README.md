[![Build Status](https://travis-ci.org/telemark/micro-portalen-content.svg?branch=master)](https://travis-ci.org/telemark/micro-portalen-content)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Greenkeeper badge](https://badges.greenkeeper.io/telemark/micro-portalen-content.svg)](https://greenkeeper.io/)

# micro-portalen-content

Microservice for portalen content

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

## License

[MIT](LICENSE)

![Robohash image of micro-portalen-content](https://robots.kebabstudios.party/micro-portalen-content.png "Robohash image of micro-portalen-content")
