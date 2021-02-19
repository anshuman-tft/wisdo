
const userCommunity = {
    get: {
        tags: [
            "User"
        ],
        summary: "Get user's communities",
        parameters: [
            {
                in: "path",
                name: "user_id",
                required: true,
                description: "User with id",
                schema: {
                    "$ref": "#/definitions/user_id"
                }
            }
        ],
        responses: {
            200: {
                description: "OK",
            },
            422: {
                description: "Failed. Bad request data."
            },
            500: {
                description: "Invalid UserId",
            }
        }
    },
    put: {
        tags: [
            "User"
        ],
        summary: "Update user's communities.",
        parameters: [
            {
                in: "path",
                name: "user_id",
                required: true,
                description: "User with id",
                schema: {
                    "$ref": "#/definitions/user_id"
                }
            }
        ],
        requestBody: {
            description: "Communities",
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            communities: {
                                type: "array",
                                items: {
                                    type: "string",
                                    example: "2a9899c2-519d-11e6-a214-0a9dcc012b7f"
                                }
                            }
                        }
                    }

                }
            }
        },
        produces: [
            "application/json"
        ],
        responses: {
            200: {
                description: "OK",
            },
            422: {
                description: "Failed. Bad request data."
            },
            500: {
                description: "Invalid UserId",
            }
        }
    },
}

export default userCommunity;