import { DynamoDBAdapter } from "@auth/dynamodb-adapter"
import { NextAuthOptions } from "next-auth"
import CognitoProvider from "next-auth/providers/cognito"
import GoogleProvider from "next-auth/providers/google"
import { Config } from "sst/node/config"
import { Table } from "sst/node/table"

import { db } from "@/lib/db"

export const authOptions: NextAuthOptions = {
  // debug: true,
  secret: Config.NEXTAUTH_SECRET,
  adapter: DynamoDBAdapter(db, { tableName: Table.data.tableName }),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CognitoProvider({
      clientId: Config.COGNITO_CLIENT_ID,
      clientSecret: Config.COGNITO_CLIENT_SECRET,
      issuer: Config.COGNITO_ISSUER,
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: Config.GOOGLE_CLIENT_ID,
      clientSecret: Config.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    async jwt({ token, user }) {
      const { Item } = await db.get({
        TableName: Table.data.tableName,
        Key: {
          pk: `USER#${token.id}`,
          sk: `USER#${token.id}`,
        },
      })
      const dbUser = Item

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
  },
}
