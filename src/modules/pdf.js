import { createWriteStream } from 'fs';
import { intersectionOf } from 'intersection-of';
import PDFDocument from 'pdfkit';
import mkdirp from 'mkdirp';

export const createPdf = async ({ user, stash }, matches, stashes) => {
  const doc = new PDFDocument();

  await mkdirp('output');

  doc.pipe(createWriteStream(`output/${user}.pdf`));

  doc
    .font('Courier-Bold')
    .text('You are: ')
    .font('Courier')
    .text(user)
    .moveDown(1);

  for (const match of matches) {
    doc
      .font('Courier-Bold')
      .text('Assignee: ')
      .font('Courier')
      .text(match)
      .moveDown(2);

    const matchStash = stashes.find((innerStash) => innerStash.user === match);
    const intersection = await intersectionOf(stash, matchStash.stash);

    doc
      .font('Courier-Bold')
      .text('Shared flavors: ')
      .font('Courier')
      .text(intersection.length)
      .moveDown(1);

    for (const flavor of intersection) {
      doc.text(flavor);
    }

    doc.moveDown(2);
  }

  doc.end();
};
