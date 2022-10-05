import cross, { CorsOptions } from 'cors'
import "reflect-metadata"
import express from "express"
import * as bodyParser from "body-parser"
import { routes } from "./routes"

import "./database/db";

const host: CorsOptions = {
    origin: '*'
}

const app = express()

app.use(bodyParser.json())
app.use(cross(host))
app.use(routes)

app.listen(3333, () => {
    console.log("Server Connected")
})

