import {
  ApiOkResponse,
  ApiPropertyOptions,
  ApiQuery,
  ApiResponseMetadata,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger'
import { createApiPropertyDecorator } from '@nestjs/swagger/dist/decorators/api-property.decorator'
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface'
import { FormExceptionBody } from 'src/exception'

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

export const ApiPropertyRichText = (options?: ApiPropertyOptions): PropertyDecorator => {
  return createApiPropertyDecorator({
    required: false,
    description: 'HTML content',
    example: '<p>Hello <strong>Mutoe CMS</strong></p>',
    ...options,
  })
}

export const ApiPropertyDatetime = (options?: ApiPropertyOptions): PropertyDecorator => {
  return createApiPropertyDecorator({
    example: '2020-08-16T00:04:59.343Z',
    ...options,
  })
}

export const ApiInvalidFormResponse = (): MethodDecorator & ClassDecorator => {
  const schema: SchemaObject = {
    title: 'UnprocessableEntityResponse',
    example: {
      username: ['isInvalid', 'isExist'],
      password: ['isNotEmpty'],
    } as FormExceptionBody,
  }

  return ApiUnprocessableEntityResponse({ schema })
}
