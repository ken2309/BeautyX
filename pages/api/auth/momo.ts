import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from "http-proxy";

const proxy = httpProxy.createProxyServer();
export const API_URL = process.env.API_URL
export const config = {
    api: {
        bodyParser: {
            sizeLimit: false,
        },
    },
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    return new Promise((resolved) => {
        req.headers.cookie = "";
        proxy.web(req, res, {
            target: API_URL,
            changeOrigin: true,
            selfHandleResponse: false,
        })
        proxy.once("proxyRes", () => {
            resolved(true)
        })
    })
}