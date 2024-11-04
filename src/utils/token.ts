import { 
  Connection, 
  PublicKey, 
  Transaction, 
  SystemProgram,
  Keypair,
  sendAndConfirmTransaction
} from '@solana/web3.js';
import {
  TOKEN_PROGRAM_ID,
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from '@solana/spl-token';

// Your token mint address (after you create the token)
export const MLM_TOKEN_MINT = new PublicKey('YOUR_TOKEN_MINT_ADDRESS');
const MINT_AUTHORITY = new PublicKey('YOUR_MINT_AUTHORITY_ADDRESS');

export async function claimTokens(
  connection: Connection,
  userPublicKey: PublicKey,
  amount: number = 10 // Default amount to claim
) {
  try {
    // Get or create the user's token account
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      userPublicKey, // Payer
      MLM_TOKEN_MINT,
      userPublicKey // Token account owner
    );

    // Create mint instruction
    const mintTx = await mintTo(
      connection,
      userPublicKey, // Payer
      MLM_TOKEN_MINT,
      tokenAccount.address,
      MINT_AUTHORITY,
      amount * (10 ** 9) // Assuming 9 decimals
    );

    return {
      success: true,
      signature: mintTx,
      tokenAccount: tokenAccount.address.toString()
    };
  } catch (error) {
    console.error('Error claiming tokens:', error);
    return {
      success: false,
      error: error.message
    };
  }
}