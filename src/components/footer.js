import React from "react";
import { MoneyFormat } from "../utilities/moneyFormat";
import { numberWithCommas } from "../utilities/numberWithCommas";
import { useSelector } from "react-redux/es/hooks/useSelector";

export function Footer() {
    const products = useSelector(state => state.products.items);
    const value = useSelector(state => state.products.wallet);

    return (
        <>
            {
                value !== 100000000000 ?
                    (
                        <div className="footer">
                            <div className="footer-headline">Your Receipt</div>
                            {
                                products.map(item => (
                                    <div className="footer-items" key={item.id}>
                                        <div
                                            className="footer-item-name"
                                        >
                                            {item.count ? item.name : ""}
                                        </div>
                                        <div
                                            className="footer-item-amount"
                                        >
                                            {item.count ? `x${MoneyFormat(item.count)}` : ""}
                                        </div>
                                        <div
                                            className="footer-item-cost"
                                        >
                                            {item.count ? MoneyFormat(item.count * item.price) : ""}
                                        </div>
                                    </div>
                                ))
                            }
                            <div className="footer-total">
                                <span>TOTAL</span>
                                <div
                                    className="footer-total-money"
                                >
                                    ${numberWithCommas(products.reduce((prev, item) => (prev + item.count * item.price), 0))}
                                </div>
                            </div>
                        </div>
                    ) :
                    ""
            }
        </>
    )


}
