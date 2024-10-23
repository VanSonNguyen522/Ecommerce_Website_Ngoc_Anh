const axios = require('axios');

const productIds = ['66ff984bed7925246f414cfa']; // Danh sách productId
// Định nghĩa các API bạn muốn kiểm tra
const apis = [
    {
      name: "Get Products",
      url: "http://localhost:3000/api/products",
      method: "GET" // hoặc "POST" nếu cần
    },
    {
      name: "Get Users",
      url: "http://localhost:3000/api/users",
      method: "GET"
    }
];

// Kiểm tra các API đã định nghĩa trước
apis.forEach(api => {
    axios({ method: api.method, url: api.url })
      .then(response => {
        console.log(`${api.name} - Status: ${response.status}`);
      })
      .catch(error => {
        console.error(`${api.name} - Error: ${error.message}`);
      });
});

// Kiểm tra API cho từng productId
productIds.forEach(productId => {
  const api = {
    name: `Get product ${productId}`,
    url: `http://localhost:3000/api/products/${productId}`,
    method: "GET"
  };

  axios({ method: api.method, url: api.url })
    .then(response => {
      console.log(`${api.name} - Status: ${response.status}`);
    })
    .catch(error => {
      console.error(`${api.name} - Error: ${error.message}`);
    });
});
