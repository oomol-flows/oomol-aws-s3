//#region generated meta
type Inputs = {
    s3Client: any;
    bucket: string;
    dir: string;
    key: string;
};
type Outputs = {
    output: any;
};
//#endregion

import type { Context } from "@oomol/types/oocana";
import type { S3 } from "@aws-sdk/client-s3";
import {promises as fs, createReadStream} from "fs";
import path from "path";

async function getFiles(dir: string): Promise<string | string[]> {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
      })
    );
    return Array.prototype.concat(...files);
}

export default async function(
    params: Inputs,
    context: Context<Inputs, Outputs>
): Promise<Partial<Outputs> | undefined | void> {
    const client = params.s3Client as S3
    const files = await getFiles(params.dir) as string[]
    
    const uploads = files.map((filePath) => {
        const key = path.join(params.key, path.relative(params.dir, filePath))
        return client.putObject({
            Key: key,
            Bucket: params.bucket,
            Body: createReadStream(filePath),
        }).then(() => {
            return key
        }).catch((err) => {
            console.error(err);
            throw err;
        })
    });
    const result = await Promise.all(uploads);

    return { output: result};
};
