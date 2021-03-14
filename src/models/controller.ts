import { Request, Response } from 'express';

export type Controller<Req = {}, Res = any, Params = {}, QueryParams = {}> =
  (req: Request<Params, {}, Req, QueryParams>, res: Response<Res>) => Promise<void>;
