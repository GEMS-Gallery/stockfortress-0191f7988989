import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const addStockForm = document.getElementById('addStockForm');
    const stockTable = document.getElementById('stockTable').getElementsByTagName('tbody')[0];

    addStockForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const symbol = document.getElementById('symbol').value;
        const quantity = parseFloat(document.getElementById('quantity').value);
        const purchasePrice = parseFloat(document.getElementById('purchasePrice').value);

        await backend.addStock(symbol, quantity, purchasePrice);
        addStockForm.reset();
        await updateStockTable();
    });

    async function updateStockTable() {
        const stocks = await backend.getAllStocks();
        stockTable.innerHTML = '';

        stocks.forEach(stock => {
            const row = stockTable.insertRow();
            row.innerHTML = `
                <td>${stock.symbol}</td>
                <td>${stock.quantity}</td>
                <td>${stock.purchasePrice}</td>
                <td>
                    <button onclick="updateStock('${stock.symbol}')">Update</button>
                    <button onclick="removeStock('${stock.symbol}')">Remove</button>
                </td>
            `;
        });
    }

    window.updateStock = async (symbol) => {
        const newQuantity = parseFloat(prompt(`Enter new quantity for ${symbol}:`));
        if (!isNaN(newQuantity)) {
            await backend.updateStockQuantity(symbol, newQuantity);
            await updateStockTable();
        }
    };

    window.removeStock = async (symbol) => {
        if (confirm(`Are you sure you want to remove ${symbol} from your portfolio?`)) {
            await backend.removeStock(symbol);
            await updateStockTable();
        }
    };

    await updateStockTable();
});