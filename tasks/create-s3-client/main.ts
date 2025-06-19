//#region generated meta
type Inputs = {
    region: string;
    accessKey: string;
    secretAccessKey: string;
    endpoint: string | null;
};
type Outputs = {
    client: any;
};
//#endregion

import type { Context } from "@oomol/types/oocana";
import { S3 } from "@aws-sdk/client-s3"

export default async function(
    params: Inputs,
    context: Context<Inputs, Outputs>
): Promise<Partial<Outputs> | undefined | void> {
    const client = new S3({
        region: params.region,
        credentials: {
            accessKeyId: params.accessKey,
            secretAccessKey: params.secretAccessKey,
        },
        endpoint: params.endpoint || undefined
    });

    return { client: client };
};
