import { 
  Creator, 
  TipperDashboard, 
  CreatorDashboard, 
  TipRecord 
} from './types';

export const getCreator = async (handle: string): Promise<Creator> => {
  return {
    x_handle: handle,
    display_name: handle.charAt(0).toUpperCase() + handle.slice(1),
    profile_image: `https://unavatar.io/twitter/${handle}`,
    verified: false,
    pending_amount_sol: 0,
    pending_amount_usd: 0,
    total_received_sol: 0,
    total_received_usd: 0,
  };
};

export const logTip = async (data: {
  tipper_wallet: string;
  creator_x_handle: string;
  amount_sol: number;
  tx_sig_inbound: string;
}) => {
  console.log('Logging tip to API:', data);
  return { success: true, id: `tip_${Math.random().toString(36).substr(2, 9)}` };
};

export const getTipperDashboard = async (wallet: string): Promise<TipperDashboard> => {
  return {
    profile: {
      wallet,
      x_handle: '',
      verified: false,
    },
    balance: {
      sol: 0,
      usd: 0,
    },
    tips_sent: [],
  };
};

export const getCreatorDashboard = async (handle: string): Promise<CreatorDashboard> => {
  return {
    profile: {
      x_handle: handle,
      verified: false,
    },
    pending_balance: {
      sol: 0,
      usd: 0,
    },
    tips_received: [],
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
