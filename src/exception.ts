import { UnprocessableEntityException } from '@nestjs/common'
import { ApiUnprocessableEntityResponse } from '@nestjs/swagger'
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface'

type FormExceptionKey =
  | 'isNotEmpty'
  | 'isExist'
  | 'isNotExist'
  | 'isInvalid'
  | string

export class FormExceptionBody implements Record<string, FormExceptionKey[]> {
  [x: string]: FormExceptionKey[]
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

export class FormException extends UnprocessableEntityException {
  constructor (body: FormExceptionBody) {
    super(body)
  }
}
