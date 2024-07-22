"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orederTepm = void 0;
const orederTepm = ({ products }) => {
    let html = '';
    let total = 0;
    products.forEach((item) => {
        total += +item.product.price;
        html += `
      <div>
        <h4>${item.product.name}</h4>
        <p>price: ${item.product.price}</p>
        <img style="width: 150px; height: 150px;" src="${item.product.img}" src="${item.name}"/>
      </div>
      `;
    });
    return `
    <h1>Create order</h1>
    <p>products: </p>
    <div style="display: flex; flex-wrap: wrap;">
    ${html}
    </div>

    <p>total pricee: ${total}</p>
`;
};
exports.orederTepm = orederTepm;
//# sourceMappingURL=order.templet.js.map