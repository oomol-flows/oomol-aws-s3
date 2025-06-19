//#region generated meta
type Inputs = {
    s3Client: any;
    bucket: string;
    prefix: string | null;
};
type Outputs = {
    output: string[];
};
//#endregion

import type { Context } from "@oomol/types/oocana";
import type { S3 } from "@aws-sdk/client-s3"

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
    const keys: string[] = []
    for (const item of result.Contents) {
        if (item.Key) {
            keys.push(item.Key);
        }
    }

    return { output: keys };
};
