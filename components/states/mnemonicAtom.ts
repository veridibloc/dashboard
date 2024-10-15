import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { decrypt, encrypt } from '@/common/webCrypto';

export const mnemonicAtom = atomWithStorage<string>(
  '@veridibloc/mnemonic',
  '',
  undefined,
  { getOnInit: true }
);

export const mnemonicLockAtom = atom(
  null,
  async (_, set, secureToken: string, mnemonic: string) => {
    const encryptedSeed = await encrypt(mnemonic, secureToken);
    set(mnemonicAtom, () => encryptedSeed);
  }
);

export const mnemonicUnlockAtom = (secureToken:string) => atom(
  async (get) => {
    const encrypted = get(mnemonicAtom);
    try {
      return await decrypt(encrypted, secureToken);
    } catch (e) {
      // console.error('Failed to decrypt');
      return '';
    }
  }
);
