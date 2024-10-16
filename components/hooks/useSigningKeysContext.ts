import { useContext } from 'react';
import { SigningKeysContext } from '../contexts/signingKeysProvider';

export function useSigningKeysContext() {
  const context = useContext(SigningKeysContext);
  if (context === undefined) {
    throw new Error('useSigningKeysContext must be used within a SigningKeysProvider');
  }
  return context;
}
