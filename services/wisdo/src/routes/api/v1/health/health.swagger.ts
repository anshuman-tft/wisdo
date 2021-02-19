
const healthCheck = {
    get: {
        tags: ['health'],
        description: "Health check API",
        operationId: 'healthCheck',
        security: [
            // Providing security as blank array because we dont need to authorize health check api
            // {
            //     bearerAuth: []
            // }
        ],
        responses: {
            "200": {
                description: "Health check",
            }
        }
    }
}

export default healthCheck