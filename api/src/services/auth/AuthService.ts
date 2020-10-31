import { Request, Response } from "express";
import _ from "lodash";
import { Route } from "../../utils";
import {CognitoUserPool, CognitoUserAttribute, AuthenticationDetails, CognitoUser} from 'amazon-cognito-identity-js';
import request from 'request';
import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';

export const poolData = {
    UserPoolId: "us-east-1_v05I4y159",
    ClientId: "4rq699s1p2c3sa5vb6s0veft05"
 };
 export const pool_region = "us-east-1";
 
 const userPool = new CognitoUserPool(poolData);

export default class AuthService {
    
  constructor() {
    console.log(`initializing ${this.constructor.name}...`);
  }

  public getRoutes() {
    return [
        new Route("/auth/register","post",[
            async (req: Request, res: Response) => {
                const email = req.body.email;
                const password = req.body.password;
                const attributeList = [];
            
                attributeList.push(new CognitoUserAttribute({ Name: "email", Value: email }));
                userPool.signUp(email, password, attributeList, [], (err: any, result:any)=>{
                    if(err){
                        res.status(503).json({ message: err });
                    } else{
                        const cognitoUser = result.user;
                        res.status(200).json({
                                      user: cognitoUser
                                    });
                    }
            })

            }
        ]),
        new Route("/auth/login","post",[
            async (req: Request, res: Response) => {
                const userName = req.body.name;
                const password = req.body.password;
                const authenticationDetails = new AuthenticationDetails({
                    Username: userName,
                    Password: password
                });
                const userData = {
                    Username: userName,
                    Pool: userPool
                }
                const cognitoUser = new CognitoUser(userData);
                cognitoUser.authenticateUser(authenticationDetails, {
                    onSuccess: (result) => {
                        var accesstoken = result.getAccessToken().getJwtToken();
                        res.status(200).json({
                            token: accesstoken
                          });
                    },
                    onFailure: ((err:any)=>{
                        res.status(503).json({ message: err });
                    })
                })
                

            }
        ]),
        new Route("/auth/validate","post",[
            async (req: Request, res: Response) => {
                request({
                    url : `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
                    json : true
                 }, (error, response, body)=>{
                    if (!error && response.statusCode === 200) {
                        const pems: any = {};
                        const keys = body['keys'];
                        for(var i = 0; i < keys.length; i++) {
                            const key_id = keys[i].kid;
                            const modulus = keys[i].n;
                            const exponent = keys[i].e;
                            const key_type = keys[i].kty;
                            const jwk = { kty: key_type, n: modulus, e: exponent};
                            const pem = jwkToPem(jwk);
                             pems[key_id] = pem;
                        }
                        const decodedJwt = jwt.decode(req.body.token, {complete: true});
                             if (!decodedJwt) {
                                 console.log("Not a valid JWT token");
                                 res.status(503).json({ message: 'Not a valid JWT token' });
                             }
                             const kid = (decodedJwt as any).header.kid;
                             const pem = pems[kid];
                             if (!pem) {
                                 console.log('Invalid token');
                                 res.status(503).json({ message: 'Invalid token' });
                             }
                            jwt.verify(req.body.token, pem, (err: any, payload: any) => {
                                 if(err) {
                                     console.log("Invalid Token.");
                                     res.status(503).json({ message: 'Invalid token' });
                                 } else {
                                      console.log("Valid Token.");
                                      res.status(200).json({ message: "Valid token" });
                                 }
                            });
                    } else {
                        console.log(error, response, body)
                          console.log("Error! Unable to download JWKs");
                          res.status(503).json({ message: "Error! Unable to download JWKs" });
                    }
                });
            }
        ]),
    ];
  }
}
