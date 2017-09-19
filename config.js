'use strict'

module.exports = {
  contentUrl: process.env.CONTENT_URL || 'https://info.portalen.t-fk.no/artikler.json',
  PAPERTRAIL_HOSTNAME: process.env.PAPERTRAIL_HOSTNAME || 'portalen',
  PAPERTRAIL_HOST: process.env.PAPERTRAIL_HOST || 'logs.papertrailapp.com',
  PAPERTRAIL_PORT: process.env.PAPERTRAIL_PORT || 12345
}
