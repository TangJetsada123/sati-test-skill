import { registerAs } from "@nestjs/config";

export default registerAs('upload',() => ({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: process.env.region,
    bucket:  process.env.bucket,
    acl: process.env.acl
}))