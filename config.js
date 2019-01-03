module.exports = {
  contentUrl: process.env.CONTENT_URL || 'https://portaleninfo.com',
  sharedContentUrl: process.env.SHARED_CONTENT_URL || 'https://vtfylke.no',
  PAPERTRAIL_HOSTNAME: process.env.PAPERTRAIL_HOSTNAME || 'portalen',
  PAPERTRAIL_HOST: process.env.PAPERTRAIL_HOST || 'logs.papertrailapp.com',
  PAPERTRAIL_PORT: process.env.PAPERTRAIL_PORT || 12345
}
