import { FunctionComponent, ReactElement } from "react";
import './OrderDetailsTrackingInformation.css';
import { Checkpoints } from "../../../../../interfaces/InitialData.interface";

export type Props = {
    trackingNumber: string,
    checkpoints: Checkpoints[],
}

const OrderDetailsTrackingInformation: FunctionComponent<Props> = ({ checkpoints }): ReactElement =>{

    const getLastCheckpoint = checkpoints[checkpoints.length - 1];
    return (
        <>
            <div className="order-information">
                <div className="tracking-number">
                    <div className="subtitle">
                        <span>Tracking number</span>
                    </div>
                    <div className="subtext">
                        <span>{getLastCheckpoint?.tracking_number}</span>
                    </div>
                </div>
                <div className="current-status">
                    <div className="subtitle">
                        <span>Current status</span>
                    </div>
                    <div className="subtext">
                        <span>{getLastCheckpoint?.status}</span>
                    </div>
                </div>
            </div>
            <div className="description">
                <span>{getLastCheckpoint?.status_details} </span>
            </div>
        </>
    )
}

export default OrderDetailsTrackingInformation;