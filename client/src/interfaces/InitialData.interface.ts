export interface Trackings {
	id: string;
	tracking_number: string;
	orderNo: string;
	courier: string;
	street: string;
	zip_code: string;
	city: string;
	destination_country_iso3: string;
	email: string;
	checkpoints: Checkpoints[];
	articles: Article[];
}

export interface Checkpoints {
	id: string,
	location: string;
	timestamp: string;
	status: string;
	status_text: string;
	status_details: string;
	tracking_number: string;
}

export interface Article {
	articleNo: string;
	articleImageUrl: string;
	product_name: string;
  	quantity: number;
}	

export interface TrackingsInitial {
    uid: string;
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
    quantity: number;
    product_name: string;
  }

  export interface CheckpointsInitial {
    tracking_number: string;
    location: string;
    timestamp: string;
    status: string;
    status_text: string;
    status_details: string;
  }
  