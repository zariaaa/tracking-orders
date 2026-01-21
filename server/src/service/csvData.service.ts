import { autoInjectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';
import { TrackingFromCsv, CheckpointFromCsv, OrderResponse } from '../interfaces/TrackingFromCsv.interface';

@autoInjectable()
export default class CsvDataService {
    async getOrders(trackings: TrackingFromCsv[], checkpoints: CheckpointFromCsv[]): Promise<OrderResponse[]> {
        const groupedTrackings = new Map<string, TrackingFromCsv[]>();

        trackings.forEach(track => {
            const orderNo = track.orderNo;
            if (!groupedTrackings.has(orderNo)) {
                groupedTrackings.set(orderNo, []);
            }
            groupedTrackings.get(orderNo)!.push(track);
        });

        const orders: OrderResponse[] = Array.from(groupedTrackings, ([orderNo, group]) => {
            const orderCheckpoints = checkpoints
                .filter(check => check.tracking_number === group[0].tracking_number)
                .map(checkpoint => ({
                    tracking_number: checkpoint.tracking_number,
                    location: checkpoint.location,
                    timestamp: checkpoint.timestamp,
                    status: checkpoint.status,
                    status_text: checkpoint.status_text,
                    status_details: checkpoint.status_details,
                }));

            return {
                id: uuidv4(),
                tracking_number: group[0].tracking_number,
                orderNo: orderNo,
                courier: group[0].courier,
                street: group[0].street,
                zip_code: group[0].zip_code,
                city: group[0].city,
                destination_country_iso3: group[0].destination_country_iso3,
                email: group[0].email,
                checkpoints: orderCheckpoints,
                articles: group.map(article => ({
                    articleNo: article.articleNo,
                    articleImageUrl: article.articleImageUrl,
                    product_name: article.product_name,
                    quantity: article.quantity,
                })),
            };
        });

        return orders;
    }
}