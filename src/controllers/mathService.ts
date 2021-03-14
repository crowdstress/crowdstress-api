import http from 'http';

import { Request } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

export const mathService = createProxyMiddleware({
  logLevel: 'error',
  onProxyReq: (proxyReq: http.ClientRequest, req: Request) => {
    if (req.body) {
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  },
  pathRewrite: { '^/math': '' },
  target: 'http://127.0.0.1:5000',
});
