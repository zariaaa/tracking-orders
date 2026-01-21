import { FunctionComponent, ReactElement } from "react";
import './OrderDetailsHeader.css';
export type Props = {
    orderNo: string;
    address: string;
}

const OrderDetailsHeader: FunctionComponent<Props> = ({ orderNo, address}): ReactElement =>{
   
    return (
       <>
         <div className="order-header">
                <div className="subtitle">
                    <span>Order number</span>
                </div>
                <div className="subtext">
                    <span>{orderNo}</span>
                </div>
            </div>
            <div className="delivery-address">
                <div className="subtitle">
                    <span>Delivery address</span>
                </div>
                <div className="subtext">
                    <span>{address}</span>
                </div>
            </div>
       </>
    )
}

export default OrderDetailsHeader;