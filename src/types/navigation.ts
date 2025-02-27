export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  Profile: undefined;
  Chat: undefined;
  Transfer: undefined;
  TransactionDetail: {
    status: 'success' | 'failed';
    amount: number;
    beneficiary: {
      name: string;
      avatar: string;
    };
    transactionId: string;
    date: string;
    reason?: string;
  };
};

export type TabParamList = {
  Home: undefined;
  Transfer: undefined;
  Actions: undefined;
  Chat: undefined;
  Profile: undefined;
}; 