if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET || !process.env.DB_CONNECTION_STRING) {
  throw new Error('Missing necessary environment variables')
}

export const Config = {
  port: parseInt(process.env.PORT || '8080'),
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  dbConnectionString: process.env.DB_CONNECTION_STRING,
  // any other configuration variables you might need
}
