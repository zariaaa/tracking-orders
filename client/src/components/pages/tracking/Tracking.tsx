import { FunctionComponent, ReactElement } from "react";
import { Trackings } from "../../../interfaces/InitialData.interface";
import './Tracking.css';
import OrderDetailsArticleInformation from "../order-details/elements/article-information/OrderDetailsArticleInformation";
import OrderDetailsTrackingInformation from "../order-details/elements/tracking-information/OrderDetailsTrackingInformation";
import OrderDetailsHeader from "../order-details/elements/header/OrderDetailsHeader";
import { v4 } from 'uuid';
import { motion } from "framer-motion";

export type Props = {
    trackingInformation: Trackings;
    handleCallbackButton: () => void;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 12,
        },
    },
};

const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 0.8,
        // scale: 1,
        transition: { delay: 0.5, duration: 0.3 },
    },
    hover: {
        transition: { duration: 0.2 },
    },
    // tap: { scale: 0.95 },
};

const Tracking: FunctionComponent<Props> = ({ trackingInformation , handleCallbackButton}): ReactElement =>{

    const handleCallback = () => handleCallbackButton()

    const deliveryAddress = `${trackingInformation!.street}, ${trackingInformation!.zip_code} ${trackingInformation!.city}`

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ display: " flex", flexDirection: "column", gap: "2rem" }}
        >
            <motion.div
                key={trackingInformation.id}
                className="order-information"
                variants={sectionVariants}
            >
                <OrderDetailsHeader orderNo={trackingInformation.orderNo} address={deliveryAddress} />
            </motion.div>
            <motion.div className="order-card" variants={sectionVariants}>
                <OrderDetailsTrackingInformation
                    trackingNumber={trackingInformation.tracking_number}
                    checkpoints={trackingInformation.checkpoints}
                />
            </motion.div>
            <motion.div className="order-card articles" variants={sectionVariants}>
                {/* <div className="article-header">
                    <span className="header-label">Qty</span>
                    <span className="header-label">Image</span>
                    <span className="header-label">Product Name</span>
                    <span className="header-label">Article Number</span>
                </div> */}
            {
                trackingInformation.articles.map((article, index) => {
                    const isArticlesEmpty = Object.values(article).some(el => el === "")

                    if(isArticlesEmpty){
                        return  <div key={v4()} className="description">There are no products in the order</div>
                    }
                    else{
                        return (
                            <OrderDetailsArticleInformation
                                key={article.articleNo}
                                articleNo={article.articleNo}
                                quantity={article.quantity}
                                articleImageUrl={article.articleImageUrl}
                                product_name={article.product_name}
                                index={index}
                            />
                        )
                    }
                })
            }
            </motion.div>
            <motion.div
                className="form-button margin"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
            >
                <button className="backButton" id="back-button" type="button" onClick={() => handleCallback()}>BACK</button>
            </motion.div>
        </motion.div>
    )
}

export default Tracking;