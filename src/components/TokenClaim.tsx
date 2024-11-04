import React, { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Loader2, X } from 'lucide-react';

const TokenClaim = () => {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleClaim = async () => {
    if (!publicKey) return;
    
    setIsClaiming(true);
    setError(null);
    
    try {
      // Simulate claiming process
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setIsModalOpen(false);
      }, 3000);
    } catch (err) {
      setError('Failed to claim MLM tokens. Please try again.');
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer mt-8 flex flex-col items-center"
      >
        <p className="text-yellow-400 font-semibold text-lg mb-4">
          Click to claim FREE $MLM
        </p>
        <div className="relative group transform transition-transform hover:scale-105">
          <div 
            className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300 animate-pulse"
            style={{ transform: 'scale(0.9)' }}
          />
          <div className="w-48 h-48 bg-white rounded-lg relative z-10 transition-transform duration-300 group-hover:scale-110" />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">Claim MLM Tokens</h3>
            
            <div className="flex flex-col items-center space-y-6">
              {!connected ? (
                <div className="flex flex-col items-center space-y-4">
                  <p className="text-gray-300">Connect your wallet to claim MLM tokens</p>
                  <WalletMultiButton className="!bg-yellow-500 hover:!bg-yellow-600 !transition-colors" />
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-4 w-full">
                  <button
                    onClick={handleClaim}
                    disabled={isClaiming || success}
                    className={`
                      w-full px-8 py-3 rounded-lg font-semibold text-lg
                      transition-all duration-300 transform hover:scale-105
                      ${isClaiming || success 
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-yellow-500 hover:bg-yellow-600 hover:shadow-lg hover:shadow-yellow-500/20'
                      }
                      disabled:opacity-50 disabled:hover:scale-100
                    `}
                  >
                    {isClaiming ? (
                      <span className="flex items-center justify-center">
                        <Loader2 className="animate-spin mr-2 h-5 w-5" />
                        Claiming...
                      </span>
                    ) : success ? (
                      'Claimed Successfully!'
                    ) : (
                      'Claim MLM'
                    )}
                  </button>
                  {error && (
                    <p className="text-red-400 text-sm">{error}</p>
                  )}
                  {success && (
                    <p className="text-green-400 text-sm">
                      10 MLM tokens have been sent to your wallet!
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TokenClaim;