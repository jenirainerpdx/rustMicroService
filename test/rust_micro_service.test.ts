import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as RustMicroService from '../lib/rust_micro_service-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new RustMicroService.RustMicroServiceStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
