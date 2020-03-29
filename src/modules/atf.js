import axios from 'axios';
import cheerio from 'cheerio';

import { atf as config } from 'modules/config';
import { getLogger } from 'modules/logging';

const log = getLogger('atf');

const getStash = async (mixer) => {
  const url = `https://alltheflavors.com/users/${mixer}/flavors`;

  log.debug(`Requesting stash from ${url}`);

  try {
    const response = await axios({
      url,
      method: 'GET'
    });

    if (response.status !== 200) {
      throw new Error(`Got HTTP ${response.status} in response!`);
    }

    const $ = cheerio.load(response.data);

    const results = $('tr[id^="flavor-row"]')
      .not('tr[id^="flavor-row-details"]')
      .map((i, v) => $(v).find('td:nth-child(1)').text().trim())
      .get();

    results.sort();

    return results;
  } catch (error) {
    log.error(error.message);
    log.error(error.stack);
  }

  return [];
};

export const getStashes = async () => {
  const results = [];

  for (const user of config.users) {
    log.info(`Fetching stash for ${user}`);
    const stash = await getStash(user);

    if (stash.length) {
      log.info(`Got ${stash.length} flavors for ${user}`);
      results.push({
        user,
        stash
      });
    } else {
      log.info(`${user} has no flavors!`);
    }
  }

  log.info(`Fetched all stashes. ${results.length} users had a stash.`);
  return results;
};
