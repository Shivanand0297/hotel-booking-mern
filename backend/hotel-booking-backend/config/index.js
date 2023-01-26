import dotenv from "dotenv"
dotenv.config()

const config = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    v: process.env.v
}
export default config