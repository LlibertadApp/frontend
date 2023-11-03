import { useState } from 'react';
import { FlatListProps } from './types';
import { TextField } from '@mui/material';

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
      className={`flex p-4 items-center w-full max-w-md gap-4 ${
        !correctCertificate ? 'grayscale opacity-40' : ''
      }`}
    >
      <img src={logo} alt="logo" className="w-12 h-12 mt-1 self-start" />

      <div className="flex flex-col justify-start items-start w-2/3">
        {' '}
        {/* Para subtitle y title */}
        <label className={` ${titleColor[type]} text-xl text-left font-bold`}>
          {subTitle}
        </label>
        <label className="text-neutral-700 text-base text-left">{title}</label>
      </div>

      <div
        className="flex items-center w-1/3 justify-end text-center"
      >
        {/* Para el TextField */}
        <TextField
          id="inaccessibleInput"
          type="number"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleVoteChange(Number(e.target.value))
          }
          value={vote === 0 ? '' : vote}
          placeholder="0"
          disabled={!correctCertificate ? edit : !edit}
          className={` border-gray-300 outline-none cursor-default bg-white text-neutral-700 font-bold h-12 w-20 ${selectedInputStyle}`}
          style={{ display: 'flex', justifyContent: 'center'}}
        />
      </div>
    </div>
  );
};

export default FlatList;
