import { Request, Response } from 'express';

type TControllerMethods = (
  request: Request,
  response: Response,
) => Promise<Response>;

interface IController {
  create?: TControllerMethods;
  delete?: TControllerMethods;
  index?: TControllerMethods;
  show?: TControllerMethods;
  update?: TControllerMethods;
}

export { IController };
