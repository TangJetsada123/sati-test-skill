import { registerAs } from "@nestjs/config";

export default registerAs('authen',() => ({
    secret: process.env.secret,
    expiresIn: process.env.expire_in
}))