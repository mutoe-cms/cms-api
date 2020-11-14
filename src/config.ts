export const NEST_SECRET = process.env.NEST_SECRET ?? 'secret'
export const NEST_PORT = parseInt(process.env.API_PORT) || 8080
export const SWAGGER_ENABLE = process.env.NODE_ENV !== 'production' || process.env.SWAGGER_ENABLE === 'true'
