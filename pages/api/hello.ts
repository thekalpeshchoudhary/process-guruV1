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
          // {
          //   role: 'user',
          //   content: reply
          //     ? 'Reply to me as a chat bot whose name is Process Guru on the HDFCLife Intranet that can serve me by helping me navigate through all of the Process Repository that exists on the Intranet to find the process i am looking for. All of the processes are : Core Processes Management Processes, Support Processes, Facility Management, Customer Acquisition, Sales Management, Sales Contest Management Sales Management - Agency Sales Management - Banacassurance, Sales Management - Direct Sales Management - EDM, Sales Management - Key Alliances, Sales Management - Digital Alliances, Group Scheme (CP, GTI) - Sales, Retail Sales Management - Strategic Alliances, Sales Management - Defence Channel, Management, Broca & Venue Partner process, New Business, Individual New Business Individual New Business - Life[Offline], Individual New Business - Life[Online], Individual New Business - QROPS, Individual New Business- International, Policy Servicing, Auto-Debit Activation & De- activation, Customer Communication & Engagement, Customer Complaint Management, Customer Digital Interaction Management, Aversion Methods Renewal & Revival Payment Collection - Branch, Renewal & Revival Payment, Collection Central Receipting, Renewal & Revival, Communication, Revival, Unit Linked Policy Servicing transaction, Segmental Services, HNI & NRI Segmental Service, Payouts, Maturity Life - Payout, Pension Maturity & Annuity, Payout, Survival Benefit & Recurring Payouts, Partial Withdrawal, Payout - Common Process, Refund Payout, Surrender, Branch Management Branch Opening, Closure, Relocation and Merger, Enterprise Risk, Regulatory and Audit Management, Audit Planning and Execution Internal Controls and Capabilities Regulatory Reporting, Risk Identification, Reporting and Action Plan, Investment Management, Investment Management - MO/BO, Investment Management - Front Desk, Investor Relations & Business Planning, Capex & Opex Evaluation Financial Performance and Reporting, Investor Relations Reporting, Product Management Product Development & Launch Day 2 Tracking, Review &, Closure of Products, Marketing & CSR, CSAT CSR Initiatives, Finance Actuarial & Tax, (FCM)., Financial Reporting and Consolidation Reinsurer Engagement & Reporting, Employee Facilities Management, Branch Management Branch Management, Finance - Accounts Accounts Payable Banking and Collections Commissions Payable, Human Resource Management, Employee Performance Management [CMS], Employee Query & Grievance Management, Employee Benefit &, Compensation, Employee Recruitment, On- boarding & Transfer, Employee Rewards & Recognition, Employee Termination / Exit Employee Training, Process Management Process Design, Review & Improvement, Record Management Record Management - Admin, Technology Management Technology Asset Management, Technology Capability Development & Support, Technology Infra & Ops Management, EDM-Tech Management, Robotics, Digital Labs DevOps & Data Labs, Vendor Management, Vendor Management - Medical Vendor Lifecycle - Procurement, Tax Collection, Payments & Accounting, Vendor Management - Services, Bangalore Unit Processes Bangalore Unit Processes, Vendor Management - Claims, Claims Management, Group Health Claim, Individual Death Claim, Individual Health Claim.'
          //     : '',
          // },
          // {
          //   role: 'user',
          //   content: reply
          //     ? `If i ask any thing outside of this domain, politely nudge me towards asking you to ask for any help regarding the process guru related work that you are for and if it is hi and hellos just reply with appropriate answer but nudge me towards asking you to ask for any help regarding the process guru related work that you are for. But do reply to compliments or appreciations from user and also if user asks about hdfc life, say only good things about it. And also if someone asks for some process pdf or document for anything from the above repo list reply in the html format given below only and if there are more than 5 matching processes also ask user to be more specific. Also change the names of the document inside the inner html of anchor tag in the html format below accordingly to match the process name that you found form the repo. And each match should be in the li tag as it is in the format below. This is the html format and dont modify the html tags just the text inside that you are supposed to: <br> <div>I found these matching documents results : <br />
          //     <ul class="list-decimal	pl-5 ">
          //       <li>
          //         <a class='underline'
          //         >
          //           Agency Claim
          //         </a>
          //       </li>
          //       <li>
          //         <a
          //         class='underline'
          //         >
          //           Agency Sales
          //         </a>
          //       </li>
          //     </ul>
          //   </div>`
          //     : '',
          // },
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
