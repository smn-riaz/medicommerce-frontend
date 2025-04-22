import { IUserResponse } from "./user";

export type TReview = {
    title: string;
    description: string;
    userId: string;
    productId: string;
    rating: number;
  };

export type TReviewResponse = {
    _id:string
    title: string;
    description: string;
    userId: IUserResponse;
    productId: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };