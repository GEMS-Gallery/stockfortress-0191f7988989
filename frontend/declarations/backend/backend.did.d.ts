import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Stock {
  'purchasePrice' : number,
  'quantity' : number,
  'symbol' : string,
}
export interface _SERVICE {
  'addStock' : ActorMethod<[string, number, number], undefined>,
  'getAllStocks' : ActorMethod<[], Array<Stock>>,
  'init' : ActorMethod<[], undefined>,
  'removeStock' : ActorMethod<[string], boolean>,
  'updateStockQuantity' : ActorMethod<[string, number], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
