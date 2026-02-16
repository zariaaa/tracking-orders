import { FunctionComponent, ReactElement } from "react";
import './OrderDetails.css';
import { Trackings } from "../../../interfaces/InitialData.interface";
import { motion } from "framer-motion";

export type Props = {
    order: Trackings;
    onOrderClick: (order: Trackings) => void;
    index?: number;
}

const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 12,
        },
    },
};

const OrderDetails: FunctionComponent<Props> = ({ order, onOrderClick }): ReactElement =>{

    const handleClick = () => {
        onOrderClick(order);
      };

      return (
        <motion.div
            variants={itemVariants}
        >
            <div onClick={handleClick} className="order-card">
                <div key={order.id}>
                    <div className="order-card-information">
                        <div className="order-information">
                            <div className="order-number">
                                <div className="subtitle">
                                    <span>Order number</span>  
                                </div>
                                <div className="subtext">
                                    <span>{order.orderNo}</span>
                                </div>
                            </div>
                            <div className="current-status">
                                <div className="subtitle">
                                    <span>Current status</span>
                                </div>
                                <div className="subtext">
                                    <span>{order.checkpoints[0].status_text}</span>
                                </div>
                            </div>
                        </div>

                        <div className="delivery-address">
                            <div className="subtitle">
                                <span>Delivery address</span>
                            </div>
                            <div className="subtext">
                                <span>{`${order!.street}, ${order!.zip_code} ${order!.city}` }</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
      );
}

export default OrderDetails;
