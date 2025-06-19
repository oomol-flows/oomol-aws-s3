//#region generated meta
type Inputs = {
    s3Client: any;
    bucket: string;
    file: string;
    key: string;
};
type Outputs = {
    output: string;
};
//#endregion

import type { Context } from "@oomol/types/oocana";
import type { S3 } from "@aws-sdk/client-s3";
import fs from "fs";

export default async function(
    params: Inputs,
    context: Context<Inputs, Outputs>
): Promise<Partial<Outputs> | undefined | void> {
    const client = params.s3Client as S3
    const fileStream = fs.createReadStream(params.file)

    await client.putObject({
        Bucket: params.bucket,
        Body: fileStream,
        Key: params.key
    })

    return { output: params.key };
};
