import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { extractPdfIntoText } from '@utils/pdfExtract';

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
  const queryIntoPdf = query.includes('explain from pdf');
  let response: string = '';
  const extractedPdfText = extractPdfIntoText('./public/pdf/ProcessPDF.pdf');
  response = await openai.chat.completions
    .create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: queryIntoPdf
            ? `${query} in less than 50 words or less from the following : ${extractedPdfText}`
            : `${query}`,
        },
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((value) => {
      return value.choices[0].message.content as string;
    })
    .catch((error) => {
      console.log(error);
      return 'Oops! Something went wrong on our end. Please try again';
    });

  res.status(200).json({ gptResult: JSON.stringify(response) });
}
