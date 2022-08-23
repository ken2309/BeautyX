import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy, { ProxyResCallback } from "http-proxy";

const proxy = httpProxy.createProxyServer();
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
    if (req.method !== "POST") {
        return res.status(404).json({ message: "This api support only method POST" });
    }


    return new Promise((resolved) => {
        req.headers.cookie = "";
        const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
            let body = "";
            proxyRes.on("data", function (chunk) {
                body += chunk
            })
            proxyRes.on("end", function () {
                const resp = JSON.parse(body);
                console.log(resp)
                res.end("my cli")
            })
        }

        proxy.once('proxyRes', handleLoginResponse)
        proxy.web(req, res, {
            target: "https://devapi.myspa.vn",
            changeOrigin: true,
            selfHandleResponse: true,
        })
    })
}