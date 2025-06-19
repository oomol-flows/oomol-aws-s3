//#region generated meta
type Inputs = {
    s3Client: any;
    bucket: string;
    prefix: string;
    saveAs: string;
};
type Outputs = {
    output: any;
};
//#endregion

import type { Context } from "@oomol/types/oocana";
import { S3 } from "@aws-sdk/client-s3";
import fs from "fs"
import path from "path";

async function downloadFile(client: S3, bucket: string, key: string, saveAs: string) : Promise<string> {
    const result = await client.getObject({
        Bucket: bucket,
        Key: key,
    })
    if (!result.Body) {
        throw new Error('No data found in S3')
    }
    const body = await result.Body.transformToByteArray()

    
    if (!fs.existsSync(path.dirname(saveAs))) {
        fs.mkdirSync(path.dirname(saveAs), { recursive: true });
    }
    fs.writeFileSync(saveAs, body, { flag: 'wx' })
    return saveAs
}

export default async function(
    params: Inputs,
    context: Context<Inputs, Outputs>
): Promise<Partial<Outputs> | undefined | void> {
    const client = params.s3Client as S3
    const result = await client.listObjectsV2({
        Bucket: params.bucket,
        Prefix: params.prefix || undefined
    })

    if (!result.Contents) {
        return { output: [] };
    }
    const keys: Promise<string>[] = []
    for (const item of result.Contents) {
        if (item.Key) {
            const relativePath = path.relative(params.prefix , item.Key)
            const file = downloadFile(client, params.bucket, item.Key, path.join(params.saveAs, relativePath))
            keys.push(file)
        }
    }
    const ks = await Promise.all(keys)

    return { output: ks };
};
