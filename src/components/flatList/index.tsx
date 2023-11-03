import { useState } from 'react';
import { FlatListProps } from './types';
import {TextField} from '@mui/material';

const FlatList = ({
  logo,
  type,
  subTitle,
  title,
  votes,
  edit = false,
  updateTotalVotes,
  correctCertificate,
}: FlatListProps) => {
  const [vote, setVote] = useState<number>(votes);

  const handleVoteChange = (value: number) => {
    const newValue: number = value;
    if (newValue >= 0) {
      setVote(newValue);
      updateTotalVotes(newValue - vote);
    }
  };

  const titleColor: any = {
    massa: 'text-sky-400',
    milei: 'text-violet-800',
    null: 'text-neutral-500',
    appealed: 'text-neutral-500',
    contested: 'text-neutral-500',
    electoralCommand: 'text-neutral-500',
    blank: 'text-neutral-500',
  };

  const selectedInputStyle: string | null =
    vote > 0 ? 'border-2 border-violet-brand !text-black' : null;

  return (
    <div
      className={`flex p-4 justify-between items-center w-full max-w-md gap-2  ${
        !correctCertificate ? 'grayscale opacity-40' : null
      }`}
    >
      <img src={logo} alt="logo" className="w-8 h-8" />
      <div className="flex flex-col justify-start items-start mt-3 ">
        <label
          className={` ${titleColor[type]} text-xl text-left font-bold`}
        >
          {subTitle}
        </label>
        <label
          className={`text-neutral-700 mt-1 text-base text-left mb-4`}
        >
          {title}
        </label>
      </div>
      <div>
      <TextField
      
      InputLabelProps={{ style: { fontFamily: 'Poppins' }}}
      InputProps={{ style: { borderRadius: '8px', fontFamily: 'Poppins',  } }}
      type="number"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        handleVoteChange(Number(e.target.value))
      }
      value={vote === 0 ? '' : vote}
      placeholder="0"
      disabled={!correctCertificate ? edit : !edit}
      className={`border-2 text-center border-gray-300 outline-none cursor-default bg-white text-neutral-700 font-bold rounded-xl h-14 w-14 flex text-2xl ${selectedInputStyle}`}
    />
      </div>

    </div>
  );
};

export default FlatList;
