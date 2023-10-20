import { persistence } from "@/stacks/persistence"
import { Template } from "aws-cdk-lib/assertions"
import { App, getStack } from "sst/constructs"
import { initProject } from "sst/project"
import { it } from "vitest"

it("Test Persistence Stack", async () => {
  await initProject({})
  const app = new App({ mode: "deploy" })
  // WHEN
  app.stack(persistence)
  // THEN
  // @ts-expect-error
  const template = Template.fromStack(getStack(persistence))
  template.hasResourceProperties("AWS::DynamoDB::Table", {
    BillingMode: "PAY_PER_REQUEST",
    AttributeDefinitions: [
      {
        AttributeName: "pk",
        AttributeType: "S",
      },
      {
        AttributeName: "sk",
        AttributeType: "S",
      },
      {
        AttributeName: "GSI1PK",
        AttributeType: "S",
      },
      {
        AttributeName: "GSI1SK",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "pk",
        KeyType: "HASH",
      },
      {
        AttributeName: "sk",
        KeyType: "RANGE",
      },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: "GSI1",
        KeySchema: [
          {
            AttributeName: "GSI1PK",
            KeyType: "HASH",
          },
          {
            AttributeName: "GSI1SK",
            KeyType: "RANGE",
          },
        ],
        Projection: {
          ProjectionType: "ALL",
        },
      },
    ],
  })
})
