import { Response } from "express";
import { IRequestInterface } from "../interfaces/RequestInterfaces";

/**
 * Wrapper function to send response with given dto and status
 * @param res REST response
 * @param serviceResponse result from service
 */
export const wrapServiceResponse = async (
  res: Response,
  serviceResponse: Promise<IRequestInterface<any>>
) => {
  const { status, dto } = await serviceResponse;

  res.status(status).send(dto);
};

/**
 * Wrapper function to catch errors inside flows and call given errorhandler on catch
 * @param callback flow to bo committed
 * @param errorHandleCallback error handler of flow
 */
export const withErrorHandler = async (
  callback: () => Promise<any>,
  errorHandleCallback: (error: any) => void
) => {
   try {
    return await callback();
   } catch (err) {
     await errorHandleCallback(err);
   }
};
