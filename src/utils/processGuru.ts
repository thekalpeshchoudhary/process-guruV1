import Link from 'next/link';

export const returnReply = (caputredInput: string) => {
  let reply;

  switch (true) {
    // case (caputredInput.includes('pdf') ||
    //   caputredInput.includes('document')) &&
    //   caputredInput.includes('mediclaim'):
    //   reply = `<div>
    //       Here is the link to the Mediclaim Process PDF you asked for : <br />
    //       <a
    //       class='underline'
    //         href={
    //           'https://extranet.who.int/lqsi/sites/default/files/attachedfiles/LQMS%205-4%20Sample%20Processing.pdf'
    //         }
    //       >
    //         Mediclaim Process PDF
    //       </a>
    //     </div>`;
    //   break;
    // case caputredInput.includes('pdf') && caputredInput.includes('agency'):
    //   reply = `<div>
    //       I found 2 matching document results : <br />
    //       <ul class="list-decimal	pl-5 ">
    //         <li>
    //           <a class='underline'
    //             target="_blank"
    //             href={
    //               'https://extranet.who.int/lqsi/sites/default/files/attachedfiles/LQMS%205-4%20Sample%20Processing.pdf'
    //             }
    //           >
    //             Agency Claim
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //           class='underline'
    //             target="_blank"
    //             href={
    //               'https://extranet.who.int/lqsi/sites/default/files/attachedfiles/LQMS%205-4%20Sample%20Processing.pdf'
    //             }
    //           >
    //             Agency Sales
    //           </a>
    //         </li>
    //       </ul>
    //     </div>`;
    //   break;
    // case caputredInput.includes('hello'):
    //   reply = 'Wassup!';
    //   break;
    case caputredInput.includes('explain') || caputredInput.includes('what is'):
      reply = false;
      break;
    default:
      reply = true;
      // reply = `I could not understand your query, try to add more keywords for the process to be more specific`;
      break;
  }

  return reply;
};

// give me the Partial withdrawal pdf doc
// give me the investment management document
// what is Claims Investigation Process
