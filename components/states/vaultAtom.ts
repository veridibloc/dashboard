import {atom} from "jotai"
import {atomWithStorage} from "jotai/utils"

export interface VaultState {
  encryptedSeed: string
}
export const vaultAtom = atomWithStorage<VaultState>('@veridibloc/vault', {encryptedSeed:''}, undefined, {getOnInit: true});

export const vaultAtomWriter = atom(null, (_get, set, state: Partial<VaultState>) => {
  set(vaultAtom, (vault) => {
    return {
      ...vault,
      ...state
    }
  });
});
