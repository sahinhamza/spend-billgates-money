import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { numberWithCommas } from "../utilities/numberWithCommas";
import { buyProduct, sellProduct, changeCount } from "../redux/productSlice";

export function Content() {
   const products = useSelector(state => state.products.items);
   const value = useSelector(state => state.products.wallet);

   const dispatch = useDispatch();


   const handleChange = (e, item) => {
      let count = e.target.value;

      if (count[0] === "0") {
         count = Number(count.substring(1));
      } else if (count === "") {
         count = 0;
      }

      e.target.value = count;

      if (value + item.count * item.price < count * item.price) {
         count = Math.floor((value + item.count * item.price) / item.price);
      }

      dispatch(changeCount({ id: item.id, count: count }));
   }

   return (
      <div className="content">
         {products.map(item => (
            <div className="item-wrapper" key={item.id}>
               <img className="item-img" src={item.src} alt={item.name} />
               <div className="item-name">{item.name}</div>
               <div className="item-price">${numberWithCommas(item.price)}</div>
               <div className="item-controls">
                  <button
                     className="item-sell"
                     onClick={() => dispatch(sellProduct(item.id))}
                     disabled={item.count === 0}
                  >
                     Sell
                  </button>
                  <input
                     className="item-input"
                     type="number"
                     value={item.count}
                     min={0}
                     onChange={(e) => handleChange(e, item)}
                  />
                  <button
                     className="item-buy"
                     onClick={() => dispatch(buyProduct(item.id))}
                     disabled={value / item.price < 1}
                  >
                     Buy
                  </button>
               </div>
            </div>
         ))}
      </div>
   );
}