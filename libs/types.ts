export interface Chef {
  id: number | null;
  name: string;
  description: string | null;
  image_url: string | null;
  votes: number | null;
}

export interface Vote {
  chef_id: number;
  email: string;
  num_votes: number;
  amount_paid: number;
  reference: string;
};

export interface PaystackResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    status: string;
    reference: string;
    amount: number;
    // Add more fields as needed
  };
}

export interface AirtableAttachment {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
  size: number;
  type: string;
  thumbnails: {
    small: { url: string; width: number; height: number };
    large: { url: string; width: number; height: number };
    full: { url: string; width: number; height: number };
  };
}
