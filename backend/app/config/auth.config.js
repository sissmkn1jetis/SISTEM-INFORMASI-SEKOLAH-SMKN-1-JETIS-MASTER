module.exports = {
  secret: "hidden",
  jwtExpiration: 3600,         // 1 hour
  jwtRefreshExpiration: 86400, // 24 hours
  jwtExpirationMobile: 86400, // 24 jam

  /* for test */
  //jwtExpiration: 60,          // 1 minute
  //jwtRefreshExpiration: 120,  // 2 minutes
};