const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Real Estate API',
    version: '1.0.0',
    description: 'API for the real estate application — units, zones, developers, and contact.',
  },
  servers: [{ url: 'http://localhost:4000/api/v1', description: 'Local API server' }],
  paths: {
    '/zone': {
      get: {
        summary: 'List all zones',
        responses: {
          200: {
            description: 'Array of all available zones.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Zone' },
                },
              },
            },
          },
        },
      },
    },

    '/zone/{id}': {
      get: {
        summary: 'Get a zone by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string', example: 'giza' },
            description: 'Zone slug (e.g. giza, new-cairo, sheikh-zayed, alexandria)',
          },
        ],
        responses: {
          200: {
            description: 'A single zone.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Zone' },
              },
            },
          },
          404: {
            description: 'Zone not found.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    },

    '/unit': {
      get: {
        summary: 'List all units',
        responses: {
          200: {
            description: 'Array of all available property units.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Unit' },
                },
              },
            },
          },
        },
      },
    },

    '/unit/{id}': {
      get: {
        summary: 'Get a unit by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string', example: 'local-unit-1' },
            description: 'Unit ID',
          },
        ],
        responses: {
          200: {
            description: 'A single property unit.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Unit' },
              },
            },
          },
          404: {
            description: 'Unit not found.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    },

    '/developer': {
      get: {
        summary: 'List all developers',
        responses: {
          200: {
            description: 'Array of real estate developers.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Developer' },
                },
              },
            },
          },
        },
      },
    },

    '/developer/{id}': {
      get: {
        summary: 'Get a developer by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string', example: '612a7fce-3f33-45cc-83d7-11a491094d8b' },
            description: 'Developer UUID',
          },
        ],
        responses: {
          200: {
            description: 'A single developer.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Developer' },
              },
            },
          },
          404: {
            description: 'Developer not found.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    },

    '/contactus': {
      post: {
        summary: 'Submit a contact-us message',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ContactRequest' },
            },
          },
        },
        responses: {
          200: {
            description: 'Message received successfully.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ContactResponse' },
              },
            },
          },
          400: {
            description: 'Validation error — missing required fields.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    },

    '/contact': {
      post: {
        summary: 'Submit a contact-us message',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ContactRequest' },
            },
          },
        },
        responses: {
          201: {
            description: 'Message received successfully.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ContactResponse' },
              },
            },
          },
          400: {
            description: 'Validation error — missing required fields.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    },
  },

  components: {
    schemas: {
      Zone: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'giza' },
          name_en: { type: 'string', example: 'Giza' },
          name_ar: { type: 'string', example: 'الجيزة' },
          description_en: { type: 'string' },
          description_ar: { type: 'string' },
          city_en: { type: 'string', example: 'Giza' },
          city_ar: { type: 'string', example: 'الجيزة' },
          images: { type: 'array', items: { type: 'string', format: 'uri' } },
        },
      },

      Unit: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'local-unit-1' },
          title_en: { type: 'string', example: 'Giza Family Villa' },
          title_ar: { type: 'string' },
          description_en: { type: 'string' },
          description_ar: { type: 'string' },
          price: { type: 'number', example: 8500000 },
          bedrooms: { type: 'integer', example: 5 },
          bathrooms: { type: 'integer', example: 4 },
          size: { type: 'number', example: 450, description: 'Area in square metres' },
          status: { type: 'string', example: 'AVAILABLE' },
          zoneName_en: { type: 'string', example: 'Giza' },
          zoneName_ar: { type: 'string', example: 'الجيزة' },
          images: { type: 'array', items: { type: 'string', format: 'uri' } },
        },
      },

      Developer: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '612a7fce-3f33-45cc-83d7-11a491094d8b' },
          name_en: { type: 'string', example: 'lagoon' },
          name_ar: { type: 'string', example: 'لاجون' },
          description_en: { type: 'string' },
          description_ar: { type: 'string' },
          images: { type: 'array', items: { type: 'string', format: 'uri' } },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          projects: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name_en: { type: 'string' },
                name_ar: { type: 'string' },
                description_en: { type: 'string' },
                description_ar: { type: 'string' },
                developerId: { type: 'string' },
                zoneId: { type: 'string' },
                images: { type: 'array', items: { type: 'string', format: 'uri' } },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
              },
            },
          },
        },
      },

      ContactRequest: {
        type: 'object',
        required: ['name', 'email', 'message'],
        properties: {
          name: { type: 'string', example: 'Ahmed Ali' },
          email: { type: 'string', format: 'email', example: 'ahmed@example.com' },
          phone: { type: 'string', example: '+20 100 000 0000' },
          message: { type: 'string', example: 'I am interested in the Giza villa.' },
        },
      },

      ContactResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Thank you! We will be in touch shortly.' },
        },
      },

      Error: {
        type: 'object',
        properties: {
          error: { type: 'string', example: 'Not found' },
        },
      },
    },
  },
}

export default openApiSpec
