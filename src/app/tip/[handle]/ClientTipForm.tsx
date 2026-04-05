"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { CheckCircle2, Loader2, AtSign, Wallet } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function ClientTipForm() {
  const params = useParams();
  const handle = params?.handle as string;

  const [tweetUrl, setTweetUrl] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!tweetUrl || !amount) {
      setError("Please fill out all fields");
      return;
    }

    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setLoading(true);

    // Simulate Fake API Call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  if (success) {
    return (
      <div className="glass-card w-full max-w-[420px] rounded-2xl p-8 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
        <div className="h-16 w-16 bg-brand-cyan/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="h-8 w-8 text-brand-cyan" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Tip Sent Successfully</h2>
        <p className="text-white/60 mb-8">
          You successfully tipped @{handle} {amount} SOL!
        </p>
        <button
          onClick={() => {
            setSuccess(false);
            setAmount("");
            setTweetUrl("");
          }}
          className="w-full bg-white/10 hover:bg-white/15 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200"
        >
          Send Another Tip
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[420px] animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight mb-3">
          <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
            @{handle || "creator"}
          </span>
        </h1>
        <p className="text-white/50 text-sm font-medium">
          Send a tip directly from X (Twitter)
        </p>
      </div>

      <div className="glass-card rounded-2xl p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white/70 uppercase tracking-widest pl-1">
              Tweet URL
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AtSign className="h-5 w-5 text-white/40 group-focus-within:text-brand-purple transition-colors" />
              </div>
              <input
                type="url"
                value={tweetUrl}
                onChange={(e) => setTweetUrl(e.target.value)}
                placeholder="https://x.com/elonmusk/status/123..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-brand-purple/50 focus:border-brand-purple/50 transition-all duration-200"
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-white/70 uppercase tracking-widest pl-1">
              Amount
            </label>
            <div className="relative group">
              <input
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-16 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-brand-cyan/50 focus:border-brand-cyan/50 transition-all text-xl font-medium"
                disabled={loading}
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <span className="text-white/50 font-bold tracking-wider">SOL</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl animate-in fade-in slide-in-from-top-2">
              <p className="text-red-400 text-sm font-medium text-center">{error}</p>
            </div>
          )}

          <div className="pt-2 space-y-3">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-transparent border border-white/15 hover:bg-white/5 text-white font-medium py-3.5 px-4 rounded-xl transition-all duration-200"
              disabled={loading}
            >
              <Wallet className="h-4 w-4" />
              Connect Wallet
            </button>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-purple to-brand-cyan text-black font-semibold py-3.5 px-4 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(20,241,149,0.3)] disabled:opacity-70 disabled:hover:scale-100 disabled:hover:shadow-none overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative flex items-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending Tip...
                  </>
                ) : (
                  "Send Tip"
                )}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
