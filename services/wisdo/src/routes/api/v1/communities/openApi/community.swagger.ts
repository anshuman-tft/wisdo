
const community = {
    get: {
        tags: [
            "Community"
        ],
        summary: "Get communities",
        responses: {
            200: {
                "description": "OK",
            }
        }
    },
    post: {
        tags: [
            "Community"
        ],
        summary: "Add community",
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

export default community;