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
  getValidationProps,
  correctCertificate,
  isLastFive,
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
    vote > 0 ? 'border-2 border-violet-primary !text-black' : null;

  return (
    <div
      className={`flex items-center w-full max-w-md gap-3 ${
        !correctCertificate ? 'grayscale opacity-50' : ''
      }`}
    >
      <img
        src={logo}
        alt="logo"
        className={`self-start w-12 h-12 ${isLastFive ? 'p-2' : ''}`}
      />

      <div className="flex flex-col justify-start items-start w-2/3 mr-1">
        {' '}
        {/* Para subtitle y title */}
        <label className={` ${titleColor[type]} text-xl text-left font-bold`}>
          {subTitle}
        </label>
        <label className="text-gray-darker text-left">{title}</label>
      </div>

      <div className="flex items-center w-1/3 justify-end text-center">
        {/* Para el TextField */}
        <TextField
          id="inaccessibleInput"
          type="number"
          {...getValidationProps()}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleVoteChange(Number(e.target.value))
          }
          InputLabelProps={{
            style: { opacity: '0.6' },
          }}
          InputProps={{
            style: { borderRadius: '8px' },
          }}
          value={vote === 0 ? '' : vote}
          placeholder="000"
          disabled={!correctCertificate ? edit : !edit}
          className={` border-gray-300 outline-none cursor-default bg-white text-neutral-700 font-bold h-12 w-20 border-rounded-2xl ${selectedInputStyle}`}
          style={{ display: 'flex', justifyContent: 'center' }}
        />
      </div>
    </div>
  );
};

export default FlatList;
