import fs from "fs"
import { getWebsiteUrlForStage } from "@/sst.config"
import { RemovalPolicy } from "aws-cdk-lib"
import {
  AccountRecovery,
  CfnUserPoolUICustomizationAttachment,
  Mfa,
  UserPoolDomain,
  VerificationEmailStyle,
} from "aws-cdk-lib/aws-cognito"
import { Cognito, Config, StackContext } from "sst/constructs"

export function auth({ app, stack }: StackContext) {
  const cognito = new Cognito(stack, "user-pool", {
    login: ["email"],
    cdk: {
      userPool: {
        removalPolicy:
          app.stage === "prod" ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
        signInAliases: {
          email: true,
          username: false,
          phone: false,
        },
        mfa: Mfa.OPTIONAL,
        mfaSecondFactor: {
          otp: true,
          sms: false,
        },
        accountRecovery: AccountRecovery.EMAIL_ONLY,
        selfSignUpEnabled: true,
        standardAttributes: {
          email: { required: true, mutable: false },
          fullname: { required: true, mutable: true },
        },
        userVerification: {
          emailSubject: "Verify your new Emoverse account",
          emailStyle: VerificationEmailStyle.CODE,
        },
      },
      userPoolClient: {
        userPoolClientName: "Emoverse",
        generateSecret: true,
        oAuth: {
          callbackUrls: [
            `${getWebsiteUrlForStage(app.stage)}/api/auth/callback/cognito`,
          ],
          logoutUrls: [`${getWebsiteUrlForStage(app.stage)}/logout`],
        },
      },
    },
  })

  const userPoolDomain = new UserPoolDomain(
    // @ts-expect-error
    cognito.cdk.userPool,
    `${app.stage}-emoverse-user-pool-domain`,
    {
      userPool: cognito.cdk.userPool,
      cognitoDomain: {
        domainPrefix: `${app.stage}-emoverse`,
      },
    }
  )

  const userPoolUICustomizationAttachment =
    new CfnUserPoolUICustomizationAttachment(
      // @ts-expect-error
      cognito.cdk.userPool,
      `${app.stage}-emoverse-user-pool-ui-customization-attachment`,
      {
        userPoolId: cognito.cdk.userPool.userPoolId,
        clientId: "ALL",
        css: fs.readFileSync("./styles/cognito-ui.css", "utf8"),
      }
    )
  userPoolUICustomizationAttachment.node.addDependency(userPoolDomain)

  const COGNITO_CLIENT_ID = new Config.Parameter(stack, "COGNITO_CLIENT_ID", {
    value: cognito.userPoolClientId,
  })
  const COGNITO_CLIENT_SECRET = new Config.Parameter(
    stack,
    "COGNITO_CLIENT_SECRET",
    {
      value: cognito.cdk.userPoolClient.userPoolClientSecret.toString(),
    }
  )
  const COGNITO_ISSUER = new Config.Parameter(stack, "COGNITO_ISSUER", {
    value: `https://cognito-idp.${app.region}.amazonaws.com/${cognito.userPoolId}`,
  })

  stack.addOutputs({
    UserPoolId: cognito.userPoolId,
    UserPoolClientId: cognito.userPoolClientId,
    Issuer: `https://cognito-idp.${app.region}.amazonaws.com/${cognito.userPoolId}`,
    IdentityPoolId: cognito.cognitoIdentityPoolId,
  })

  return { cognito, COGNITO_CLIENT_ID, COGNITO_CLIENT_SECRET, COGNITO_ISSUER }
}
