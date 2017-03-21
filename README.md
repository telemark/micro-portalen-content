[![Build Status](https://travis-ci.org/telemark/micro-sitemap-to-array.svg?branch=master)](https://travis-ci.org/telemark/micro-sitemap-to-array)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Greenkeeper badge](https://badges.greenkeeper.io/telemark/micro-sitemap-to-array.svg)](https://greenkeeper.io/)

# micro-portalen-content

Microservice for portalen content

## API

POST or GET roles for content

```bash
$ curl https://content.portalen.t-fk.win?roles=alle|administrasjonen|skole
```

```bash
$ curl -d '{"roles": ["alle", "administrasjonen", "skole"]}' https://content.portalen.t-fk.win
```

## License

[MIT](LICENSE)

![Robohash image of micro-portalen-content](https://robots.kebabstudios.party/micro-portalen-content.png "Robohash image of micro-portalen-content")
