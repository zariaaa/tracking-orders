import { FunctionComponent, ReactElement } from "react";
import './OrderDetailsArticleInformation.css';
import { motion } from "framer-motion";

export type Props = {
    articleNo: string,
    quantity: number,
    articleImageUrl: string,
    product_name: string,
    index?: number,
}

const articleVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (index: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: index * 0.1,
            type: "spring",
            stiffness: 100,
            damping: 12,
        },
    }),
};

const imageVariants = {
    hover: {
        scale: 1.1,
        rotate: 2,
        transition: { duration: 0.3 },
    },
};

const OrderDetailsArticleInformation: FunctionComponent<Props> = ({articleNo, quantity, articleImageUrl, product_name, index = 0 }): ReactElement =>{
    return (
        <motion.div
            key={articleNo}
            className="order-details-articles"
            variants={articleVariants}
            initial="hidden"
            animate="visible"
            custom={index}
            whileHover={{ backgroundColor: "rgba(108, 92, 231, 0.08)", borderRadius: "12px" }}
        >
            <div className="article-details">
                <motion.div
                    className="quantity-wrapper"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                >
                    <span className="field-label">Qty</span>
                    <div className="quantity">
                        <span>{quantity}</span>
                    </div>
                </motion.div>
                <div className="article-image-content">
                    <motion.div className="image-wrapper" whileHover="hover">
                        <span className="field-label">Image</span>
                        <motion.img
                            src={articleImageUrl}
                            width={80}
                            height={80}
                            alt={product_name}
                            variants={imageVariants}
                        />
                    </motion.div>
                    <div className="article-information">
                        <span className="field-label">Product</span>
                        <div className="article-title">
                            <span>{product_name}</span>
                        </div>
                    </div>
                    <div className="article-information">
                        <span className="field-label">Article #</span>
                        <div className="article-number">
                            <span>{articleNo}</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default OrderDetailsArticleInformation;