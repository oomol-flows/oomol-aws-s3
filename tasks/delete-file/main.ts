//#region generated meta
type Inputs = {
    s3Client: any;
    bucket: string;
    key: string;
};
type Outputs = {
    deletedKey: string;
};
//#endregion

import type { Context } from "@oomol/types/oocana";
import type { S3 } from "@aws-sdk/client-s3";

export default async function(
    params: Inputs,
    context: Context<Inputs, Outputs>
): Promise<Partial<Outputs> | undefined | void> {
    const client = params.s3Client as S3
    const result = await client.deleteObject({
        Bucket: params.bucket,
        Key: params.key
    })

    return { deletedKey: params.key };
};
