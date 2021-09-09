import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';

export class RustMicroServiceStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const target = 'x86_64-unknown-linux-musl';
        const tempConverter = new lambda.Function(this,
            'TempConverterFunction',
            {
                code: lambda.Code.fromAsset('lambda/converter', {
                    bundling: {
                        command: [
                            'bash', '-c',
                            `rustup target add ${target} && cargo build --release --target ${target} && cp target/${target}/release/converter /asset-output/bootstrap`
                        ],
                        image: cdk.DockerImage.fromRegistry('rust:1.53-slim')
                    }
                }),
                functionName: 'converter',
                handler: 'main', // this is unneeded because we have custom runtime.  Will CDK support removing this?
                runtime: lambda.Runtime.PROVIDED_AL2
            });

        const gw = new apigw.LambdaRestApi(this, 'TempConvertEndpoint', {
            handler: tempConverter
        });
    }
}
