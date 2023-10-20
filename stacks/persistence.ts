import { RemovalPolicy } from "aws-cdk-lib"
import { StackContext, Table } from "sst/constructs"

export function persistence({ app, stack }: StackContext) {
  const dataTable = new Table(stack, "data", {
    cdk: {
      table: {
        removalPolicy:
          app.stage === "prod" ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
      },
    },
    fields: {
      pk: "string",
      sk: "string",
      GSI1PK: "string",
      GSI1SK: "string",
    },
    primaryIndex: { partitionKey: "pk", sortKey: "sk" },
    globalIndexes: {
      GSI1: {
        partitionKey: "GSI1PK",
        sortKey: "GSI1SK",
        projection: "all",
      },
    },
  })

  stack.addOutputs({
    TableName: dataTable.tableName,
  })

  return { dataTable }
}
