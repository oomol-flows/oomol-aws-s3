# aws-s3
该项目基于 [@aws-sdk/client-s3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/) 进行封装开发。

主要用于提供一些常用的 S3 操作方法，包括文件上传、下载、删除等。

同时封装了一些原 SDK 没有提供的批量操作，比如根据前缀操作文件。

由于 `aws-sdk` 的方法太多，所以该项目提供的方法有限，如果有需要，欢迎提 PR 或者 Issue。