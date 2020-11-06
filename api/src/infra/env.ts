// All environment variables declared in .env.example are required
// to be present in process.env (or in .env). Other environment variables
// are optional.
import dotenvSafe = require("dotenv-safe");
dotenvSafe.load();

// Copy process.env environment variables into 'env'.
const env: { [key: string]: string; } = {};
for (const key in process.env) {
    if (!process.env.hasOwnProperty(key)) { continue; }
    const value = process.env[key];
    if (value != null) {
        env[key] = value;
    }
}

export default env;
