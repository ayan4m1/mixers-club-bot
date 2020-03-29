import 'dotenv/config';

export const logging = {
  level: process.env.BOT_LOG_LEVEL || 'info',
  timestampFormat: process.env.BOT_LOG_TIME_FMT
};

export default {
  logging
};
