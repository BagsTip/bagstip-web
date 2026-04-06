import { 
  Creator, 
  TipperDashboard, 
  CreatorDashboard, 
  TipRecord 
} from './types';

// Mock data generator for creators
export const getCreator = async (handle: string): Promise<Creator> => {
  return {
    x_handle: handle,
    display_name: handle.charAt(0).toUpperCase() + handle.slice(1),
    profile_image: `https://unavatar.io/twitter/${handle}`,
    verified: true,
    pending_amount_sol: 1.25,
    pending_amount_usd: 215.50,
    total_received_sol: 15.4,
    total_received_usd: 2650.00,
  };
};

export const logTip = async (data: {
  tipper_wallet: string;
  creator_x_handle: string;
  amount_sol: number;
  tx_sig_inbound: string;
}) => {
  console.log('Logging tip to mock API:', data);
  return { success: true, id: `tip_${Math.random().toString(36).substr(2, 9)}` };
};

export const getTipperDashboard = async (wallet: string): Promise<TipperDashboard> => {
  return {
    profile: {
      wallet,
      x_handle: 'tipper_x',
      verified: true,
    },
    balance: {
      sol: 5.2,
      usd: 895.50,
    },
    tips_sent: [
      {
        id: '1',
        creator_x_handle: 'nevan',
        amount_sol: 0.5,
        amount_usd: 86.25,
        status: 'confirmed',
        tx_sig: '5thH...3jK',
        created_at: '2026-04-01T10:22:00Z',
      },
      {
        id: '2',
        creator_x_handle: 'bags_dev',
        amount_sol: 1.0,
        amount_usd: 172.50,
        status: 'confirmed',
        tx_sig: '9gR...1pM',
        created_at: '2026-04-03T14:45:00Z',
      },
    ],
  };
};

export const getCreatorDashboard = async (handle: string): Promise<CreatorDashboard> => {
  return {
    profile: {
      x_handle: handle,
      verified: true,
    },
    pending_balance: {
      sol: 2.15,
      usd: 371.40,
    },
    tips_received: [
      {
        id: 'rec_1',
        from_x_handle: 'anon_user',
        amount_usd: 25.00,
        status: 'pending',
        created_at: '2026-04-05T09:12:00Z',
      },
      {
        id: 'rec_2',
        from_x_handle: 'tipper_pro',
        amount_usd: 150.00,
        status: 'claimed',
        created_at: '2026-04-06T11:30:00Z',
      },
    ],
  };
};

export const initVerification = async (data: { wallet: string; x_handle: string }) => {
  return { success: true, auth_url: 'https://twitter.com/oauth/authorize?mock=true' };
};

export const confirmVerification = async (data: { wallet: string; oauth_token: string }) => {
  return { success: true, verified: true };
};

export const releaseClaim = async (data: { handle: string; wallet: string }) => {
  return { success: true, tx_sig_outbound: 'out_7gR...1pM' };
};

export const depositTipperBalance = async (data: { wallet: string; amount_sol: number; tx_sig: string }) => {
  return { success: true, new_balance_sol: 10.0 };
};
