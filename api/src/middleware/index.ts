import {
  handleBodyRequestParsing,
  // handleCompression,
  handleCors,
  handleOptions
} from "./common";

export default [
  handleCors,
  handleBodyRequestParsing,
  handleOptions
];
