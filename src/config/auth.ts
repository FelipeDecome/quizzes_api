const authConfig = {
  jwt: {
    secret: process.env.APP_SECRET || 'secret',
    expiresIn: '1d',
  },
};

export { authConfig };
