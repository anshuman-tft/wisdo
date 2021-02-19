
const userId = {
    get: {
        tags: [
            "User"
        ],
        summary: "Get user",
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
    delete: {
        tags: [
            "User"
        ],
        summary: "Remove user",
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
    put: {
        tags: [
            "User"
        ],
        summary: "Update user.",
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
            description: "User Object",
            required: true,
            content: {
                "application/json": {
                    schema: {
                        "$ref": "#/definitions/UpdateUser"
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

export default userId;