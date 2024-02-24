import React from 'react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import Image from 'next/image';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Transition from '@components/Animation/Transition';
import Lottie from 'react-lottie';
import animationData from '@components/animateThinking.json';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

type MessageFlow = {
  type: 'guru' | 'user';
  msg: string;
}[];

const initialFlow: MessageFlow = [
  { type: 'guru', msg: 'Welcome to Process Guru' },
];

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export default function ChatPopup() {
  const [popupShow, setPopupShow] = useState(false);
  const [messageFlow, setMessageFlow] = useState<MessageFlow>([
    { type: 'guru', msg: 'Welcome to Process Guru' },
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);

  const handleLinkClick = (e: MouseEvent) => {
    e?.preventDefault();

    window.open(
      'https://extranet.who.int/lqsi/sites/default/files/attachedfiles/LQMS%205-4%20Sample%20Processing.pdf',
      '_blank'
    );
  };
  useEffect(() => {
    document.querySelectorAll('a').forEach((anchor) => {
      anchor.addEventListener('click', (e) => handleLinkClick(e));
    });
  }, [messageFlow]);

  const handleReply = async (caputredInput: string) => {
    let reply = await getAnAnswer(caputredInput.toLowerCase());
    const receiveAudio = new Audio('/audio/receiveMsg.mp3');
    setTimeout(() => {
      setThinking(false);
      setMessageFlow([
        ...messageFlow,
        {
          type: 'user',
          msg: caputredInput,
        },
        {
          type: 'guru',
          msg: JSON.parse(reply),
        },
      ]);
      receiveAudio.play();
    }, 3000);
  };

  const submitHandler = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const sendAudio = new Audio('/audio/sendMsg.mp3');
    sendAudio.play();
    const caputredInput = input;
    if (caputredInput != '') {
      setMessageFlow([
        ...messageFlow,
        {
          type: 'user',
          msg: input,
        },
      ]);
      setInput('');
      setThinking(true);
      handleReply(caputredInput);
    }
  };

  const getAnAnswer = async (query: string) => {
    const res = await fetch('/api/generateAnswer', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ query }),
    }).then((res) => res.json());
    return res.gptResult;
  };

  const { transcript, listening } = useSpeechRecognition();

  useEffect(() => {
    if (transcript != '') {
      setInput(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    if (!listening && transcript != '') {
      submitHandler();
    }
  }, [listening]);

  return (
    <div
      className={`fixed h-screen w-full flex justify-end items-end p-3 z-10`}
    >
      {popupShow ? (
        <Transition type="fadeIn" classOverrides="h-[40rem]">
          <div
            className="h-[40rem] rounded-2xl border border-gray-200 w-[30rem] flex flex-col"
            style={{
              backdropFilter: 'blur(30px)',
            }}
          >
            <div
              className="h-[4rem] rounded-t-2xl shadow-lg flex flex-row justify-between items-center"
              style={{
                backgroundColor: 'rgb(86 54 149 / 50%)',
              }}
            >
              <p className="p-5 text-white text-xl flex flex-row gap-3 items-center">
                <Image
                  src={'/images/processGuruLogo.png'}
                  width={50}
                  height={50}
                  alt="icon"
                />
                Process Guru
              </p>
              <div>
                <button
                  className="hover:scale-105"
                  onClick={() => {
                    setMessageFlow(initialFlow);
                  }}
                >
                  <RestartAltRoundedIcon className="text-6xl text-white mr-4" />
                </button>
                <button
                  className="hover:scale-105"
                  onClick={() => {
                    setPopupShow(false);
                  }}
                >
                  <CloseRoundedIcon className="text-6xl text-white mr-4" />
                </button>
              </div>
            </div>
            <div className="h-[32rem] p-5 overflow-hidden flex flex-col justify-end relative">
              {messageFlow.map((eachMsg, ind) => {
                return (
                  <Transition
                    type="grow"
                    classOverrides={`flex flex-row z-10 ${eachMsg.type == 'guru' ? 'justify-start' : 'justify-end'} `}
                    key={ind}
                  >
                    <p
                      style={{
                        overflowWrap: 'anywhere',
                      }}
                      className={`px-4 py-2 drop-shadow-xl border ${eachMsg.type == 'user' ? 'bg-green-400' : 'bg-blue-400'} rounded-2xl my-1 text-sm`}
                      dangerouslySetInnerHTML={{
                        __html: eachMsg.msg,
                      }}
                    ></p>
                  </Transition>
                );
              })}
              {/* </div> */}
              {thinking ? (
                <div className="absolute bottom-0 left-0 w-full z-0 opacity-45">
                  <Lottie options={defaultOptions} height={400} width={400} />
                </div>
              ) : null}
            </div>
            <form
              onSubmit={(e) => submitHandler(e)}
              className="h-[4rem] border-t border-grey-300 p-2 relative"
            >
              <button
                type="button"
                className="h-full pb-3 flex items-center justify-center absolute right-5"
                onClick={() => {
                  submitHandler();
                }}
              >
                <SendRoundedIcon className="text-sky-800 text-6xl" />
              </button>
              <button
                type="button"
                className={`h-full pb-3 flex items-center justify-center absolute right-16 ${listening ? 'animate-pulse' : ''}`}
                onClick={() => {
                  if (listening) {
                    SpeechRecognition.stopListening();
                  } else {
                    SpeechRecognition.startListening();
                  }
                }}
              >
                <MicRoundedIcon
                  className={`${listening ? 'text-red-600' : 'text-gray-700'} text-6xl`}
                />
              </button>
              <input
                placeholder="Type your query"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                type="text"
                className="h-full text-base rounded-xl border border-slate-300 shadow-inner bg-gray-200 w-full px-5"
              />
            </form>
          </div>
        </Transition>
      ) : (
        <button
          onClick={() => setPopupShow(true)}
          style={{
            backdropFilter: 'blur(30px)',
          }}
          className="rounded-full size-20 p-2 bg-sky-500 animate-bounce"
        >
          <Image
            src={'/images/processGuruLogo.png'}
            width={80}
            height={80}
            alt="icon"
          />
        </button>
      )}
    </div>
  );
}
