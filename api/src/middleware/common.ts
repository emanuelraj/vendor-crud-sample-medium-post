import parser from "body-parser";
import cors from "cors";
import { Router } from "express";

export const handleCors = (router: Router) =>
  router.use(cors({ credentials: true, origin: true }));

export const handleBodyRequestParsing = (router: Router) => {
  router.use(parser.urlencoded({ extended: true }));
  router.use(parser.json());
};

export const handleOptions = (router: Router) =>
  router.options("/*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", [
      "Content-Type",
      "Authorization",
      "Content-Length",
      "X-Requested-With"
    ]);
    res.send(200);
  });
