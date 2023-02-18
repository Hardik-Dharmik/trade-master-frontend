function WatchlistRow({ row }) {
  return (
    <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 cursor-pointer">
      <td class="px-4 py-4">{row.symbol}</td>
      <td class="px-4 py-4  truncate whitespace-normal">{row.stockName}</td>

      <td class="px-4 py-4">₹100</td>
      <td class="px-4 py-4">₹19883</td>
      <td class="px-4 py-4">1.27%</td>
    </tr>
  );
}

export default WatchlistRow;
