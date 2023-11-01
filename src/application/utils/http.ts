import { BAD_REQUEST, SUCCESS } from "../constants";
import { Responsebody } from "../interfaces";

export const success = (data: any): Responsebody => {
  return {
    code: SUCCESS,
    content: data,
  };
};

export const error = (data: any): Responsebody => {
  return {
    code: BAD_REQUEST,
    content: data,
  };
};

export const noContent = (): void => {
  return;
};
