export interface Creator {
  x_handle: string;
  display_name: string;
  profile_image: string;
  verified: boolean;
  pending_amount_sol: number;
  pending_amount_usd: number;
  total_received_sol: number;
  total_received_usd: number;
}

export interface TipRecord {
  id: string;
  creator_x_handle: string;
  amount_sol: number;
  amount_usd: number;
  status: 'pending' | 'confirmed' | 'failed';
  tx_sig?: string;
  created_at: string;
}

export interface TipperDashboard {
  profile: {
    wallet: string;
    x_handle?: string;
    verified: boolean;
  };
  balance: {
    sol: number;
    usd: number;
  };
  tips_sent: TipRecord[];
}

export interface TipReceivedRecord {
  id: string;
  from_x_handle?: string;
  amount_usd: number;
  status: 'pending' | 'claimed';
  created_at: string;
}

export interface CreatorDashboard {
  profile: {
    x_handle: string;
    verified: boolean;
  };
  pending_balance: {
    sol: number;
    usd: number;
  };
  tips_received: TipReceivedRecord[];
}
