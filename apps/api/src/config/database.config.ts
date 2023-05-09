import { registerAs } from "@nestjs/config";

export default registerAs('database',() => ({
    mongo_uri: process.env.mongo_uri,
    port: process.env.port,
    salt: process.env.salt 
}))