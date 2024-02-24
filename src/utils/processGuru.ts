import Link from 'next/link';

export const returnReply = (caputredInput: string) => {
  let reply;

  switch (true) {
    case caputredInput.includes('explain') || caputredInput.includes('what is'):
      reply = false;
      break;
    default:
      reply = true;
      break;
  }

  return reply;
};
