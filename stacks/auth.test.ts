import { auth } from "@/stacks/auth"
import { Template } from "aws-cdk-lib/assertions"
import { App, getStack } from "sst/constructs"
import { initProject } from "sst/project"
import { it } from "vitest"

it("Test Auth Stack", async () => {
  await initProject({})
  const app = new App({ mode: "deploy" })
  // WHEN
  app.stack(auth)
  // THEN

  // Cognito User Pool Configuration
  // @ts-expect-error
  const userPoolTemplate = Template.fromStack(getStack(auth))
  userPoolTemplate.hasResourceProperties("AWS::Cognito::UserPool", {
    AccountRecoverySetting: {
      RecoveryMechanisms: [
        {
          Name: "verified_email",
          Priority: 1,
        },
      ],
    },
    AdminCreateUserConfig: {
      AllowAdminCreateUserOnly: false,
    },
    AutoVerifiedAttributes: ["email"],
    EnabledMfas: ["SOFTWARE_TOKEN_MFA"],
    MfaConfiguration: "OPTIONAL",
    Schema: [
      {
        Mutable: false,
        Name: "email",
        Required: true,
      },
      {
        Mutable: true,
        Name: "name",
        Required: true,
      },
    ],
    UsernameAttributes: ["email"],
    UsernameConfiguration: {
      CaseSensitive: false,
    },
    VerificationMessageTemplate: {
      DefaultEmailOption: "CONFIRM_WITH_CODE",
    },
  })

  // Congnito User Pool Domain
  // @ts-expect-error
  const userPoolDomain = Template.fromStack(getStack(auth))
  userPoolDomain.hasResourceProperties("AWS::Cognito::UserPoolDomain", {
    Domain: `${app.stage}-emoverse`,
  })

  //
})
