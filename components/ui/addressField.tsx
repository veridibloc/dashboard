import { ExternalLink } from '@/components/ui/externalLink';
import { Address } from '@signumjs/core';
import { addressPrefix } from '@/common/addressPrefix';

interface Props {
  accountId: string
  fallbackLabel?: string
}

export function AddressField({ accountId, fallbackLabel = 'Emtpy Address' }: Props) {
  return (
    accountId !== '0' ? (
      <ExternalLink
        href={`${process.env.NEXT_PUBLIC_LEDGER_EXPLORER_URL}/address/${accountId}`}
      >
        {Address.fromNumericId(
          accountId,
          addressPrefix()
        ).getReedSolomonAddress()}
      </ExternalLink>
    ) : (
      fallbackLabel
    )
  );
}