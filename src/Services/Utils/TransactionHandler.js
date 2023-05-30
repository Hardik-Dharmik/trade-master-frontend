export const buyStock = (purchaseInfo, token) => {
  console.log(purchaseInfo);

  const URL = `${process.env.REACT_APP_BACKEND_API_URL}/api/transaction/buy/`;

  fetch(URL, {
    method: "POST",

    body: JSON.stringify({
      purchaseInfo: purchaseInfo,
    }),

    headers: {
      "Content-type": "application/json",
      AUTH_TOKEN: token,
    },
  })
    .then((response) => response.json())
    .then((response) => console.log(response));
};
