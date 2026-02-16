import { FunctionComponent, ReactElement, useState } from "react";
import './Orders.css'
import { Trackings } from "../../../interfaces/InitialData.interface";
import OrdersList from "../order-details/OrdersList";
import Tracking from "../tracking/Tracking";
import { motion, AnimatePresence } from "framer-motion"

export type Props = {
    data: Trackings[],
}

const pageTransition = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
};

const titleVariants = {
    initial: { opacity: 0, y: -20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" }
    },
};

const Orders: FunctionComponent<Props> = ({data}): ReactElement =>{
    const [selectedOrder, setSelectedOrder] = useState<Trackings | null>(null);

    const handleCallbackButton = () => {
        setSelectedOrder(null);
    };
    const handleOrderClick = (order: Trackings) => {
      setSelectedOrder(order);
    };

    return (
      <div className="order-view">
          <motion.div
              className="title"
              key={selectedOrder ? 'tracking' : 'orders'}
              variants={titleVariants}
              initial="initial"
              animate="animate"
          >
              <span>{selectedOrder ? ' Tracking Information ': ' Your Orders' }</span>
          </motion.div>

          <div className="order-cards">
              <AnimatePresence mode="wait">
                  {selectedOrder ? (
                  <motion.div
                      key="tracking-detail"
                      className="trackings"
                      initial={pageTransition.initial}
                      animate={pageTransition.animate}
                      exit={pageTransition.exit}
                      transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  >
                      <Tracking trackingInformation={selectedOrder} handleCallbackButton={() => handleCallbackButton()} />
                  </motion.div>
                  ) : (
                    <motion.div
                        key="orders-list"
                        className="orders"
                        style={{backgroundColor: "transparent", border: "none"}}
                        initial={pageTransition.initial}
                        animate={pageTransition.animate}
                        exit={pageTransition.exit}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    >
                        <OrdersList orders={data} onOrderClick={handleOrderClick} />
                    </motion.div>
                  )}
              </AnimatePresence>
          </div>
      </div>
    )
}

export default Orders;