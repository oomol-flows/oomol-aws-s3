//#region generated meta
type Inputs = {
    s3Client: any;
    bucket: string;
    prefix: string;
};
type Outputs = {
    deletedKeys: string[];
};
//#endregion

import type { Context } from "@oomol/types/oocana";
import type { ObjectIdentifier, S3 } from "@aws-sdk/client-s3";

export default async function(
    params: Inputs,
    context: Context<Inputs, Outputs>
): Promise<Partial<Outputs> | undefined | void> {

    const client = params.s3Client as S3
    const list = await client.listObjectsV2({
        Bucket: params.bucket,
        Prefix: params.prefix || undefined
    })

    if (!list.Contents) {
        return { deletedKeys: [] };
    }

    const keys: ObjectIdentifier[] = []
    for (const item of list.Contents) {
        if (item.Key) {
            keys.push({ Key: item.Key })
        }
    }

    const res = await client.deleteObjects({
        Bucket: params.bucket,
        Delete: {
            Objects: keys,
        }
    })
    if (!res.Deleted) {
        return  { deletedKeys: [] };
    }
    const deletedKeys: string[] =[]
    for (const item of res.Deleted) {
        item.Key && deletedKeys.push(item.Key)
    }

    return { deletedKeys: deletedKeys};
};
