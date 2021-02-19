import healthCheck from './routes/api/v1/health/health.swagger';
import user from './routes/api/v1/users/openApi/user.swagger';
import post from './routes/api/v1/posts/openApi/post.swagger';
import community from './routes/api/v1/communities/openApi/community.swagger';
import userCommunity from './routes/api/v1/users/openApi/community.swagger';

export const swaggerDocument = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'APIs Document',
        description: 'Wisdo API'
    },
    servers: [
        {
            "url": `http://localhost:{port}/{basePath}`,
            "description": "The production API server",
            variables: {
                env: {
                    "default": "test",
                    "description": "DEV Environment"
                },
                port: {
                    enum: [
                        "4500",
                        "3000",
                        "443"
                    ],
                    default: "4500"
                },
                basePath: {
                    default: "api/v1"
                }
            }
        }
    ],
    tags: [
        {name: 'health'},
        {name: 'User'},
        {name: 'Community'},
        {name: 'Post'}
    ],
    paths: {
        "/health": healthCheck,
        "/users/{user_id}/communities": userCommunity,
        "/users": user,
        "/communities/{community_id}/posts": post,
        "/communities": community,
        "/posts": post
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    },
    security: [
        {
            bearerAuth: []
        }
    ],
    definitions: {
        user_id: {
            properties: {
                userId: {
                    type: "string"
                }
            }
        },
        AddUser: {
            type: "object",
            properties: {
                email: {
                    type: "string",
                    example: "jaiswal.anshuman@tftus.com"
                },
            }
        },
        UpdateUser: {
            type: "object",
            properties: {
                email: {
                    type: "string"
                },
            }
        },
        Post: {
            type: "object",
            properties: {

            }
        }
    },
}
