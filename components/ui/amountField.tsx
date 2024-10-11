import { Amount } from '@signumjs/util';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement>{
  planck: string
}

export function AmountField({ planck, ...props }: Props) {

  let amount = `Invalid Amount: (${planck})`
  try {
    amount = Amount.fromPlanck(planck).toString()
  }catch(e){
  }

  return <div {...props}>{
    amount
  }</div>
}