import { Response } from "express";
import { IRequestInterface } from "../interfaces/RequestInterfaces";

export const wrapServiceResponse = async (
  res: Response,
  serviceResponse: Promise<IRequestInterface<any>>
) => {
  const { status, dto } = await serviceResponse;

  res.status(status).send(dto);
};

export const withErrorHandler = async (
  callback: () => Promise<any>,
  errorHandleCallback: (error: any) => void
) => {
  // try {
    return await callback();
  // } catch (err) {
    // await errorHandleCallback(err);
  // }
};
