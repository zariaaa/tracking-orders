import { Route, Routes } from "react-router-dom"
import { FunctionComponent, ReactElement} from "react";
import LogInForm from "./pages/login-form/LogInForm";
import { Trackings} from "../interfaces/InitialData.interface";
import { motion  } from "framer-motion"

export type Props = {
    data: Trackings[],
} 

const RoutesMode: FunctionComponent<Props> = ({data}): ReactElement => {
    let boxVariants = {};
    const isMobile = window.innerWidth < 1025; //Add the width you want to check for here (now 768px)
    if (!isMobile) {
      boxVariants = {
        hover: {
          scale: 0.7,
        //   rotate: 10
        }
      };
    }
    return ( 
        <motion.div
            variants={boxVariants}
            // initial={ !isMobile ? { rotate: 180 } : { rotate: 0 }}
        >
            <div className="form">
                <div className="form-content">
                    <Routes>
                        <Route path="/" element={<LogInForm data={data}/> } />
                    </Routes> 
                </div>
            </div>
        </motion.div>
        )
}

export default RoutesMode;