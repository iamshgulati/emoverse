import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"
import { Config } from "sst/node/config"

const config: DynamoDBClientConfig = {
  credentials: {
    accessKeyId: Config.NEXT_AUTH_AWS_ACCESS_KEY,
    secretAccessKey: Config.NEXT_AUTH_AWS_SECRET_KEY,
  },
  region: Config.NEXT_AUTH_AWS_REGION,
}

export const db = DynamoDBDocument.from(new DynamoDB(config), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
})
