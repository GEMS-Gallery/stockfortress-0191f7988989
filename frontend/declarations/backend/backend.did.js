export const idlFactory = ({ IDL }) => {
  const Stock = IDL.Record({
    'purchasePrice' : IDL.Float64,
    'quantity' : IDL.Float64,
    'symbol' : IDL.Text,
  });
  return IDL.Service({
    'addStock' : IDL.Func([IDL.Text, IDL.Float64, IDL.Float64], [], []),
    'getAllStocks' : IDL.Func([], [IDL.Vec(Stock)], ['query']),
    'init' : IDL.Func([], [], []),
    'removeStock' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'updateStockQuantity' : IDL.Func([IDL.Text, IDL.Float64], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
