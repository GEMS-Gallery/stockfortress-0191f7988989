import Bool "mo:base/Bool";
import Hash "mo:base/Hash";

import Array "mo:base/Array";
import Float "mo:base/Float";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Text "mo:base/Text";

actor StockPortfolio {
    // Define the Stock type
    public type Stock = {
        symbol: Text;
        quantity: Float;
        purchasePrice: Float;
    };

    // Create a stable variable to store the stocks
    private stable var stocksEntries : [(Text, Stock)] = [];
    private var stocks = HashMap.HashMap<Text, Stock>(10, Text.equal, Text.hash);

    // Initialize the stocks HashMap from the stable variable
    private func loadStocks() {
        for ((k, v) in stocksEntries.vals()) {
            stocks.put(k, v);
        };
    };

    // Constructor
    public func init() : async () {
        loadStocks();
    };

    // Add a new stock to the portfolio
    public func addStock(symbol: Text, quantity: Float, purchasePrice: Float) : async () {
        let stock : Stock = {
            symbol = symbol;
            quantity = quantity;
            purchasePrice = purchasePrice;
        };
        stocks.put(symbol, stock);
    };

    // Get all stocks in the portfolio
    public query func getAllStocks() : async [Stock] {
        Iter.toArray(stocks.vals())
    };

    // Update the quantity of a stock
    public func updateStockQuantity(symbol: Text, newQuantity: Float) : async Bool {
        switch (stocks.get(symbol)) {
            case (null) { false };
            case (?stock) {
                let updatedStock : Stock = {
                    symbol = stock.symbol;
                    quantity = newQuantity;
                    purchasePrice = stock.purchasePrice;
                };
                stocks.put(symbol, updatedStock);
                true
            };
        }
    };

    // Remove a stock from the portfolio
    public func removeStock(symbol: Text) : async Bool {
        switch (stocks.remove(symbol)) {
            case (null) { false };
            case (?_) { true };
        }
    };

    // System functions for upgrades
    system func preupgrade() {
        stocksEntries := Iter.toArray(stocks.entries());
    };

    system func postupgrade() {
        loadStocks();
    };
}