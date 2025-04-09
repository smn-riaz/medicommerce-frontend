export type TMedicine = {
  _id: string;
  name: string;
  description: string;
  type: string;
  manufacturer: string;
  price: number;
  quantity: number;
  discount: number;
  inStock: boolean;
  imageUrl: string[];
  expireDate: string;
  createdAt: string;
  updatedAt: string;
  requiredPrescription: boolean;
  __v: number;
};