const HttpSuccessStatus = {
    GET: 200,
    POST: 201,
    DELETE: 204,
    PUT: 200,
    PATCH: 200
} as const;

type HttpMethod = keyof typeof HttpSuccessStatus;

type HttpRequest = {
    body: unknown,
    query: unknown,
    params: unknown,
    method: HttpMethod,
    path: string,
    headers: {
        'Content-Type': string,
        'User-Agent': string
    }
};

export { HttpRequest, HttpMethod, HttpSuccessStatus };