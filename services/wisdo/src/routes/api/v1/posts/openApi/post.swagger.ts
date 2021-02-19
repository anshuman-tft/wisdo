
const post = {
    get: {
        tags: [
            "Post"
        ],
        summary: "Get posts",
        responses: {
            200: {
                "description": "OK",
            }
        }
    },
    post: {
        tags: [
            "Post"
        ],
        summary: "Upload a new post",
        parameters: [
            {
                in: "path",
                name: "community_id",
                required: true
            }
        ],
        requestBody: {
            description: "Post Object",
            required: true,
            content: {
                "application/json": {
                    schema: {
                        "$ref": "#/definitions/Post"
                    }
                }
            }
        },
        produces: [
            "application/json"
        ],
        responses: {
            201: {
                description: "OK"
            },
            422: {
                description: "Failed. Bad post data."
            },
            500: {
                description: "Failed."
            }
        }
    }
}

export default post;