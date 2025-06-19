//#region generated meta
type Inputs = {
    s3Client: any;
    bucket: string;
    key: string;
    saveAs: string;
};
type Outputs = {
    output: any;
};
//#endregion

import type { Context } from "@oomol/types/oocana";
import type { S3 } from "@aws-sdk/client-s3";
import fs from "fs"

export default async function(
    params: Inputs,
    context: Context<Inputs, Outputs>
): Promise<Partial<Outputs> | undefined | void> {
    const client = params.s3Client as S3
    const result = await client.getObject({
        Bucket: params.bucket,
        Key: params.key,
    })
    if (!result.Body) {
        throw new Error('No data found in S3')
    }
    const body = await result.Body.transformToByteArray()
    fs.writeFile(params.saveAs, body, (err) => {
        throw err
    })

    return { output: params.saveAs };
};
