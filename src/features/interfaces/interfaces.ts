export interface BookingsInterface {
  _id: string;
  guest: string;
  phone_number: string;
  order_date: string;
  check_in: string;
  check_out: string;
  special_request: string;
  room_id: string;
  room_type: string;
  room_number: string;
  status: string;
  photos: string[];
}

export interface IBookingsInitialState {
  data: BookingsInterface[],
  item: BookingsInterface | null,
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
}

export interface Iamenities {
  name: string,
  description: string,
}

export interface RoomsInterface {
  "_id"?: string,
  "room_number": string,
  "room_photo": string[],
  "room_type": string,
  "description": string,
  "amenities": Iamenities[],
  "price": number,
  "offer_price": boolean,
  "discount": number,
  "status": string
}

export interface IRoomsInitialState {
  data: RoomsInterface[],
  item: RoomsInterface | null,
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
}

export interface EmployeesInterface {
  "_id": string,
  "full_name": string,
  "email": string,
  "password": string,
  "photo": string,
  "start_date": string,
  "description": string,
  "phone_number": string,
  "status": string
}

export interface IEmployeesInitialState {
  data: EmployeesInterface[],
  item: EmployeesInterface | null,
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
}

export interface LoginInterface {
  username: string,
  password: string,
}

export interface ILoginInitialState{
  data: LoginInterface[],
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
  error: null | string
}

export interface ContactsInterface {
  "_id": string,
  "full_name": string,
  "email": string,
  "phone_number": string,
  "subject_of_review": string,
  "review_body": string,
  "dateTime": string,
  "status": string
}

export interface IContactsInitialState {
  data: ContactsInterface[],
  item: ContactsInterface | null,
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
}

export interface Errors {
  room_number?: { value: boolean; type: string; message: string };
  room_type?: { value: boolean; type: string; message: string };
  price?: { value: boolean; type: string; message: string };
}

export type bodyInterface = RoomsInterface | BookingsInterface | EmployeesInterface | ContactsInterface;