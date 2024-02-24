// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PDFExtract, PDFExtractOptions } from 'pdf.js-extract';
import OpenAI from 'openai';
import { returnReply } from '@utils/processGuru';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
type Data = {
  gptResult: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const query = req.body.query;
  const reply = returnReply(query);
  let response: any = '';

  if (typeof reply === 'boolean') {
    const pdfExtract = new PDFExtract();
    const options: PDFExtractOptions = {}; /* see below */
    const data = await pdfExtract.extract(
      './public/pdf/ProcessPDF.pdf',
      options
    );
    let pdfData = '';

    data.pages.forEach((eachPage) => {
      eachPage.content.forEach((eachContent) => {
        pdfData += eachContent.str;
      });
    });
    response = await openai.chat.completions
      .create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: reply
              ? `${query}`
              : `${query} in less than 50 words or less from the following : ${pdfData}`,
          },
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((value) => {
        return value.choices[0].message.content;
      })
      .catch((error) => {
        return 'Oops! Something went wrong on our end. Please try again';
      });
  } else {
    response = reply;
  }

  res.status(200).json({ gptResult: JSON.stringify(response) });
}
