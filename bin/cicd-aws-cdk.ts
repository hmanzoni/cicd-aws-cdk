#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CicdAwsCdkStack } from '../lib/cicd-aws-cdk-stack';

const app = new cdk.App();
new CicdAwsCdkStack(app, 'CicdAwsCdkStack', {});
