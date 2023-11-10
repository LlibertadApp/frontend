export interface Desk {
  id: number;
  name: string;
  description: string;
  status: {
    normal?: boolean;
    warning?: string;
  };
  votes: number;
  envelopes: number;
  circuit: number;
  electors: number;
  candidate1: {
    name: string;
    votes: number;
  };
  candidate2: {
    name: string;
    votes: number;
  };
  nullVotes: number;
  recurredVotes: number;
  impugnedVotes: number;
  commandVotes: number;
  blankVotes: number;
  totalVotes: number;
}
