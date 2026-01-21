import { FunctionComponent, ReactElement } from "react";
import './OrderDetails.css';
import { Trackings } from "../../../interfaces/InitialData.interface";
import OrderDetails from "./OrderDetails";
import { motion } from "framer-motion";

export type Props = {
    orders: Trackings[];
    onOrderClick: (order: Trackings) => void;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const OrdersList: FunctionComponent<Props> = ({ orders, onOrderClick}): ReactElement =>{

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {orders.map((order, index) => (
                <OrderDetails key={order.id} order={order} onOrderClick={onOrderClick} index={index} />
            ))}
        </motion.div>
    )
}

export default OrdersList;