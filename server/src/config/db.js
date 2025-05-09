import { createClient } from '@libsql/client'
import dotenv from 'dotenv'

dotenv.config()

export const db = createClient({
  url: 'libsql://banco-comunal-williamp0403.aws-us-east-1.turso.io',
  authToken: process.env.DB_TOKEN
})