# aws-s3
This project is developed based on [@aws-sdk/client-s3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/).

It is mainly used to provide some common S3 operation methods, including file upload, download, deletion, etc.

It also encapsulates some batch operations not provided by the original SDK, such as operating files based on prefixes.

Since there are too many methods in `aws-sdk`, the methods provided by this project are limited. If you need more, you are welcome to submit a PR or Issue.