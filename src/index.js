import { getStashes } from 'modules/atf';
import { pickMatches } from 'modules/match';
import { createPdf } from 'modules/pdf';

const execute = async () => {
  const stashes = await getStashes();
  const matches = pickMatches(stashes);

  for (const stash of stashes) {
    const [, innerMatches] = matches.find(([user]) => user === stash.user);

    await createPdf(stash, innerMatches, stashes);
  }
};

execute();
