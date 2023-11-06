import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import cors from 'cors'
import morgan from 'morgan'
const app = express()



const routes = {
    '/api/v1': "http://localhost:9001",
    '/api/v2': "http://localhost:9002",
    '/api/v3': "http://localhost:9003"
}

for (let route in routes) {
    const target = routes[route]

    app.use(route, createProxyMiddleware({
        target
    }))

}

app.use(cors({
    origin: "*"
}))
app.use(morgan('dev'))



app.listen(9000, () => {
    console.log(`Api gateway running on - 9000`)
})