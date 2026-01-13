import dotenv from 'dotenv'

dotenv.config()

export const env = {
    PORT: process.env.PORT,
    PORT: process.env.DB_URL
}