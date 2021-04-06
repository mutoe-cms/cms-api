import { ApiOkResponse, ApiQuery, ApiResponseMetadata } from '@nestjs/swagger'
import { createApiPropertyDecorator } from '@nestjs/swagger/dist/decorators/api-property.decorator'

export function ApiListResponse (type: ApiResponseMetadata['type']): MethodDecorator {
  const pageQueryDecorator = ApiQuery({ name: 'page', type: 'number', example: 1, required: false })
  const limitQueryDecorator = ApiQuery({ name: 'limit', type: 'number', example: 10, required: false })
  const okResponseDecorator = ApiOkResponse({ type })
  return (...args) => {
    pageQueryDecorator(...args)
    limitQueryDecorator(...args)
    okResponseDecorator(...args)
  }
}

export const ApiPropertyRichText = () => createApiPropertyDecorator({
  required: false,
  description: 'HTML content',
  example: '<p>Hello <strong>Mutoe CMS</strong></p>',
})
