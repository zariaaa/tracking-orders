export interface CheckpointFromCsv {
	tracking_number: string;
	location: string;
	timestamp: string;
	status: string;
	status_text: string;
	status_details: string;
}

export interface TrackingFromCsv {
	orderNo: string;
	tracking_number: string;
	courier: string;
	street: string;
	zip_code: string;
	city: string;
	destination_country_iso3: string;
	email: string;
	articleNo: string;
	articleImageUrl: string;
	quantity: string;
	product_name: string;
}

export interface CsvData {
	trackings: TrackingFromCsv[];
	checkpoints: CheckpointFromCsv[];
}

export interface Article {
	articleNo: string;
	articleImageUrl: string;
	product_name: string;
	quantity: string;
}

export interface OrderResponse {
	id: string;
	tracking_number: string;
	orderNo: string;
	courier: string;
	street: string;
	zip_code: string;
	city: string;
	destination_country_iso3: string;
	email: string;
	checkpoints: CheckpointFromCsv[];
	articles: Article[];
}