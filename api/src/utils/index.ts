import { NextFunction, Request, Response, Router } from "express";

type Wrapper = (router: Router) => void;

export const applyMiddleware = (
  middlewareWrappers: Wrapper[],
  router: Router
) => {
  for (const wrapper of middlewareWrappers) {
    wrapper(router);
  }
};

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

export class Route {
  public path: string;
  public method: "get" | "post" | "delete" | "put" | "option";
  public handler: Handler[];
  constructor(
    path: string,
    method: "get" | "post" | "delete" | "put" | "option",
    handler: Handler[]
  ) {
    this.path = path;
    this.method = method;
    this.handler = handler;
  }
}

export const applyRoutes = (routes: Route[], router: Router) => {
  for (const route of routes) {
    const { path, method, handler } = route;
    (router as any)[method](path, handler);
  }
};
