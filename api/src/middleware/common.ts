import parser from "body-parser";
import cors from "cors";
import { Router } from "express";
import jwt from "jsonwebtoken";
import request from "request";
import jwkToPem from "jwk-to-pem";

import {poolData, pool_region} from "../services/auth/AuthService"


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

export const validate = (req: any, res:any, next: any) => {
  const token = req.headers['authorization'];
  request({ url : `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
      json : true
  }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
      const pems: any = {};
      const keys = body['keys'];
          for(let i = 0; i < keys.length; i++) {
          const key_id = keys[i].kid;
          const modulus = keys[i].n;
          const exponent = keys[i].e;
          const key_type = keys[i].kty;
          const jwk = { kty: key_type, n: modulus, e: exponent};
          const pem = jwkToPem(jwk);
              pems[key_id] = pem;
          }
          var decodedJwt = jwt.decode(token, {complete: true});
              if (!decodedJwt) {
                  console.log("Not a valid JWT token");
                  res.status(401);
                  return res.send("Invalid token");
              }
          var kid = (decodedJwt as any).header.kid;
              var pem = pems[kid];
              if (!pem) {
                  console.log('Invalid token');
                  res.status(401);
                  return res.send("Invalid token");              
              }
          jwt.verify(token, pem, function(err: any, payload: any) {
                  if(err) {
                      console.log("Invalid Token.");
                      res.status(401);
                      return res.send("Invalid tokern");
                  } else {
                        console.log("Valid Token.");
                        return next();
                  }
              });
      } else {
            console.log("Error! Unable to download JWKs");
            res.status(500);
            return res.send("Error! Unable to download JWKs");
      }
  });
}
