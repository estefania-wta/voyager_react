interface Request {
  method: string;
  url: string;
}

interface Response {
  status: number;
}

async function loggingMiddleware(
  { request }: { request: Request },
  next: () => Promise<Response>,
) {
  console.log(
    `${new Date().toISOString()} ${request.method} ${request.url}`,
  );
  const start = performance.now();
  const response = await next();
  const duration = performance.now() - start;
  console.log(
    `${new Date().toISOString()} Response ${response.status} (${duration}ms)`,
  );
  return response;
}

export const middleware = [loggingMiddleware];
