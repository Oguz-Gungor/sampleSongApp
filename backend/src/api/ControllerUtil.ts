import { Response } from "express";
import { IRequestInterface } from "../interfaces/RequestInterfaces";

export const wrapServiceResponse = (
    res: Response,
  serviceResponse: IRequestInterface<any>
) => {
  const { status, dto } = serviceResponse;

  res.status(status).send(dto);
};
