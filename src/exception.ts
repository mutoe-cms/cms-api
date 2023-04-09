import { UnprocessableEntityException } from '@nestjs/common'

type FormExceptionKey =
  | 'isNotEmpty'
  | 'isExist'
  | 'isNotExist'
  | 'isInvalid'
  | string

export class FormExceptionBody implements Record<string, FormExceptionKey[]> {
  [x: string]: FormExceptionKey[]
}

export class FormException extends UnprocessableEntityException {
  constructor (body: FormExceptionBody) {
    super(body)
  }
}
