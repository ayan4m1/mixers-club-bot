import { getLogger } from 'modules/logging';

const log = getLogger('match');

const getRandomIndex = (list) => Math.floor(Math.random() * list.length);

const pickMatch = (targetUser, matches, edges) => {
  const eligibleUsers = edges.filter(([user]) => user !== targetUser);
  const [user] = eligibleUsers[getRandomIndex(eligibleUsers)];
  const timesMatched = edges.filter(([, innerMatches]) =>
    innerMatches.includes(user)
  );

  if (timesMatched.length > 1 || matches.includes(user)) {
    return pickMatch(targetUser, matches, edges);
  } else {
    return user;
  }
};

export const pickMatches = (stashes) => {
  const edges = stashes.map((stash) => [stash.user, []]);

  for (const [user, matches] of edges) {
    matches.push(pickMatch(user, matches, edges));
    matches.push(pickMatch(user, matches, edges));

    log.info(`${user} was assigned ${matches[0]} and ${matches[1]}`);
  }

  log.info('Finished assigning users.');
  return edges;
};
