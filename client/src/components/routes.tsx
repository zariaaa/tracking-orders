import { Route, Routes } from "react-router-dom"
import { FunctionComponent, ReactElement} from "react";
import LogInForm from "./pages/login-form/LogInForm";
import { Trackings} from "../interfaces/InitialData.interface";
import { motion  } from "framer-motion"

export type Props = {
    data: Trackings[],
} 

const RoutesMode: FunctionComponent<Props> = ({data}): ReactElement => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
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