import * as cdk from 'aws-cdk-lib';
import {
  CodeBuildStep,
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { PipelineStage } from './PipelineStage';

export class CicdAwsCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'AwesomePipeline', {
      pipelineName: 'AwesomePipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('UserName/RepoName', 'BranchName'),
        commands: ['npm ci', 'npx cdk synth'],
      }),
    });

    const firtsStage = pipeline.addStage(
      new PipelineStage(this, 'PipelineFirstStage', { stageName: 'First' })
    );
    const secondStage = pipeline.addStage(
      new PipelineStage(this, 'PipelineSecondStage', { stageName: 'Second' })
    );
    firtsStage.addPre(
      new CodeBuildStep('unit-test', {
        commands: ['npm ci', 'npm test'],
      })
    );
  }
}
