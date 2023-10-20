# Emoverse Setup Instructions

## Prerequisites

- Setup AWS CLI and AWS Credentials

  - Install the AWS CLI

    [https://docs.aws.amazon.com/cli/latest/userguide/getting-started-quickstart.html](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-quickstart.html)

  - Setup the AWS Credentials using CLI

    ```sh
    aws configure
    ```

- Install Node.js v18.18.0 or above from:

  [https://nodejs.org/en](https://nodejs.org/en)

- Install and activate `pnpm` package manager

  ```sh
  corepack enable
  ```

  ```sh
  corepack prepare pnpm@latest --activate
  ```

- Install the project dependencies using `pnpm`

  ```sh
  pnpm install
  ```

---

## Common Pitfalls

- Using a stage name that is not unique

  For this guide, the default stage name used is `shubham`. But make sure to use your own stage name otherwise you will encounter deployment issues.

---

## Instructions for Local Development

- Copy `.env.example` to `.env.shubham.local` and update the environment variables

  ```sh
  cp .env.example .env.shubham.local
  ```

> [!TIP]
> For NEXTAUTH_SECRET, refer the section on `Generate a random value for NEXTAUTH_SECRET` in [Additional Help](#additional-help)

- Load the environment variables to AWS SSM Parameter Store

  ```sh
  pnpm sst secrets load .env.shubham.local
  ```

- Start the SST development server and keep it running

  If this is your first time, this command will install SSTBootstrap and CDKToolkit stacks in AWS CloudFormation.

  ```sh
  pnpm sst dev
  ```

- Choose the default stage name, or enter your own:

  ```txt
  shubham
  ```

> [!NOTE]
> This will store the default stage name `shubham` in `.sst/stage` location for future reference.

- Start the Next.js development server in another terminal window

  ```sh
  pnpm run dev
  ```

- Open the app in a web browser

  ```sh
  http://localhost:3000
  ```

---

## Instructions for Production Deployment to AWS

- Copy `.env.example` to `.env.shubham.local` and update the environment variables

  ```sh
  cp .env.example .env.shubham.local
  ```

> [!TIP]
> For NEXTAUTH_SECRET, refer the section on `Generate a random value for NEXTAUTH_SECRET` in [Additional Help](#additional-help)

- Load the environment variables to AWS SSM Parameter Store

  ```sh
  pnpm sst secrets load .env.shubham.local --stage shubham
  ```

- Start the SST development server

  ```sh
  pnpm sst dev --stage shubham
  ```

> [!IMPORTANT]
> Skip this step if your application is already running in development mode using the same stage name, `shubham` in this case.
> This step is only required once before the deploying in production mode for the first time.

- Stop the SST development server after all assets are completly deployed.

- Start the production deployment on AWS

  ```sh
  pnpm sst deploy --stage shubham
  ```

  Note the value of `SiteUrl` variable printed in the outputs, for example:

  ```txt
  https://d34abq0dnwt19t.cloudfront.net
  ```

- Update the `getWebsiteUrlForStage` function in `sst.config.ts` for the right stage name, `shubham` in this case

  ```ts
  case "shubham":
  return "https://d34abq0dnwt19t.cloudfront.net"
  ```

> [!IMPORTANT]
> Doing this updates the correct domain in the authentication stack. Until this step is completed, authentication will fail.

- Re-deploy the application to production environment on AWS

  ```sh
  pnpm sst deploy --stage shubham
  ```

- Open the app in a web browser

  After deployment is successful, output will have the site url:

  ```txt
  https://d34abq0dnwt19t.cloudfront.net
  ```

---

## Additional Help

- Generate a random value for NEXTAUTH_SECRET

  ```sh
  openssl rand -base64 32
  ```

- List the secret available in AWS SSM Parameter Store

  ```sh
  pnpm sst secrets list --stage <STAGE_NAME>
  ```

- Set a secret in AWS SSM Parameter Store

  ```sh
  pnpm sst secrets set NEXTAUTH_SECRET <RANDOM_VALUE> --stage <STAGE_NAME>
  ```

- Remove a secret from AWS SSM Parameter Store

  ```sh
  pnpm sst secrets remove NEXTAUTH_SECRET --stage <STAGE_NAME>
  ```

## Amazon DynamoDB — Single Table Design

| Field             | Type   |
| ----------------- | ------ |
| pk                | string |
| sk                | string |
| access_token      | string |
| content           | string |
| createdAt         | string |
| email             | string |
| emailVerified     | string |
| expires_at        | string |
| id                | string |
| id_token          | string |
| provider          | string |
| providerAccountId | string |
| refresh_token     | string |
| title             | string |
| token_type        | string |
| type              | string |
| updatedAt         | string |
| userId            | string |
| GSI1PK            | string |
| GSI1SK            | string |

| Index | Type          |
| ----- | ------------- |
| pk    | partition key |
| sk    | sort key      |

## Project Struture

```txt
.
├── README.md
├── app                     -> Next.js App Router which holds all application pages and apis
│   ├── (auth)
│   │   ├── login           -> Login page
│   │   └── register        -> Registration page
│   ├── (editor)
│   │   ├── editor          -> Private editor page
│   │   └── playground      -> Public editor page (for guests)
│   ├── (journal)
│   │   └── journal         -> Private journal page with all journal entries created by logged in user
│   │       └── settings    -> Private account settings page
│   ├── (marketing)
│   │   ├── privacy         -> Privacy page written in markdown
│   │   └── terms           -> Terms of Service page written in markdown
│   ├── api
│   │   ├── auth            -> /auth api route with authentication operations
│   │   ├── journal         -> /journal api route with journal entry operations
│   │   └── users           -> /users api route with user operations
├── assets
│   ├── fonts
│   └── logo
├── buildspec.yml           -> CI-CD pipeline configuration
├── components              -> React components
│   ├── ui                  -> UI library from shadcn/ui
├── config                  -> Frontend configuration files
├── hooks
├── lib
├── next.config.mjs         -> Next.js application configuration
├── package.json            -> Project package and dependencies
├── prettier.config.js      -> Prettier config with rules for well-formatted code
├── public                  -> Static assets for the frontend such as images
│   ├── images
├── sst-env.d.ts
├── sst.config.ts           -> SST framework configuration
├── stacks                  -> Infrastructure-as-code files and infrastructure unit tests
│   ├── auth.test.ts
│   ├── auth.ts
│   ├── persistence.test.ts
│   ├── persistence.ts
│   └── web.ts
├── styles                  -> Frontend CSS files
│   ├── cognito-ui.css
│   ├── editor.css
│   └── globals.css
├── tailwind.config.js      -> TailwindCSS configuration
├── tsconfig.json           -> Typescript configuration
└── vitest.config.js        -> Vitest configuration for running unit tests
```