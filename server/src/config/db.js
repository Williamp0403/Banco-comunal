import { createClient } from '@libsql/client'

export const db = createClient({
  url: 'libsql://banco-comunal-williamp0403.aws-us-east-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NDQ4MjAxNTcsImlkIjoiYzY3ODdiN2UtZDI4NS00YWM4LWI2ZjMtNjdhNDhhM2YwMmQ2IiwicmlkIjoiYmQ2M2NhZDItZGIyZC00OTQ3LWE1YzYtZTcwZjcwNDZiYmY3In0.MqxEPCIppHeNoWy8-9iPdvi-p6N_3ApFPDwUZwhStXQgTfPaQHZHD-dDQSAKN5REW8Q1hxM98EfbVbsJkMIxAw'
})