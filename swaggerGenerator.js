import { createDocument } from 'zod-openapi';
import { registerSchema, loginSchema } from './src/schemas/authSchema.js';

const document = createDocument({
  openapi: '3.1.0',
  info: {
    title: 'Challenger API',
    version: '1.0.0',
    description: 'Challenger API for IA queries',
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 3000}/api/v1`,
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
  paths: {
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: registerSchema,
            },
          },
        },
        responses: {
          '201': {
            description: 'User registered successfully',
          },
          '400': {
            description: 'Invalid input data',
          },
          '409': {
            description: 'Conflict, email already in use',
          },
        },
        security: [],
      },
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Authenticate a user and return a JWT token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: loginSchema,
            },
          },
        },
        responses: {
          '200': {
            description: 'Login successful',
          },
          '401': {
            description: 'Invalid credentials',
          },
        },
        security: [],
      },
    },
    '/auth/me': {
        get: {
            tags: ['User'],
            summary: 'Get the authenticated user profile',
            responses: {
                '200': {
                    description: 'User profile retrieved successfully'
                },
                '401': {
                    description: 'Unauthorized'
                }
            },
            security: [
                {
                    BearerAuth: []
                }
            ],
        }
    }
  },
});

export default document;