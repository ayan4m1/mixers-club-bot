import 'dotenv/config';

export const logging = {
  level: process.env.BOT_LOG_LEVEL || 'info',
  timestampFormat: process.env.BOT_LOG_TIME_FMT
};

export const users = {
  userList: (process.env.BOT_USER_LIST || '').split(/,/)
};

export default {
  logging
};
