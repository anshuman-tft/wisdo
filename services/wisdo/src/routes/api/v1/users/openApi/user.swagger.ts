
const user = {
    get: {
        tags: [
            "User"
        ],
        summary: "Get all users",
        responses: {
            200: {
                "description": "OK",
            }
        }
    },
    post: {
        tags: [
            "User"
        ],
        summary: "Add a new user",
        requestBody: {
            description: "User Object",
            required: true,
            content: {
                "application/json": {
                    schema: {
                        "$ref": "#/definitions/AddUser"
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
                description: "Failed. Bad post client data."
            },
            500: {
                description: "Failed. Invalid clientId."
            }
        }
    }
}

export default user;