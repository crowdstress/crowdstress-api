import http from 'http';

import { Request } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { MATH_SERVICE_ENDPOINT } from '@/config';

export const mathService = createProxyMiddleware({
  changeOrigin: true,
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
  target: MATH_SERVICE_ENDPOINT,
});
