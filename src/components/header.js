import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/exports";
import CountUp from "react-countup";

export function Header() {

  const value = useSelector(state => state.products.wallet);
  const [prevMoney, setPrevMoney] = useState(0);

  useEffect(() => {
    let timer = setTimeout(() => setPrevMoney(value), 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return (
    <>

      <div className="header">
        <img src="/images/billgates.jpg" alt="billgates" />
        Spend Bill Gates' Money
      </div>
      <div className="billgates-money">
        <CountUp
          start={prevMoney}
          end={value}
          duration={2}
          separator=","
          prefix="$"
        />
      </div>
    </>
  );
}
