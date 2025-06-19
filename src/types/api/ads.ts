interface Location {
  type: string;
  coordinates: number[];
}

interface Category {
  created_at: string;
  _id: string;
  name: string;
  parent: string;
  has_children: boolean;
  image_url: string;
  slug: string;
  status: boolean;
  updated_at: string | null;
  deleted_at: string | null;
  __v: number;
  arabic_name: string;
}

interface User {
  current_location: Location;
  stripe_id: string;
  device_tokens: string[];
  _id: string;
  role: string;
  name: string;
  email: string;
  username: string;
  password: string;
  rating: number;
  reviews: number;
  image_url: string;
  license: string;
  mobile_no: string;
  delivery: boolean;
  online_status: boolean;
  profile_verified: boolean;
  payment_active: boolean;
  email_verified: boolean;
  mobile_no_verified: boolean;
  verification_code: string | null;
  reset_password_token: string;
  latitude: number;
  longitude: number;
  address: string;
  slug: string;
  status: boolean;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  __v: number;
  id_back: string;
  id_front: string;
  is_admin_approved: boolean;
}

interface Media {
  file: string;
  thumbnail: string | null;
  type: string;
  _id: string;
}

export type Advertisement = {
  location: Location;
  _id: string;
  title: string;
  brand: string;
  price_per_slot: number;
  price_per_day: number;
  peak_start_time: string;
  peak_end_time: string;
  peak_price_per_slot: number | null;
  peak_price_per_day: number | null;
  address: string;
  country: string;
  city: string;
  favorities: string[];
  latitude: number;
  longitude: number;
  tags: string[];
  description: string;
  ad_status: string;
  category: Category;
  user: User;
  featured: boolean;
  rating: number;
  reviews: number;
  delivery: string;
  media: Media[];
  start_time: string;
  end_time: string;
  slot_duration: number;
  advance_booking_duration: string;
  slug: string;
  created_at: string;
};
