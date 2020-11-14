import { Controller, Get, Query } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'

@Controller()
@ApiTags('App')
export class AppController {
  @Get('/hello')
  @ApiOperation({ summary: 'Health check', operationId: 'healthCheck' })
  @ApiQuery({ name: 'name', type: 'string', required: false, example: 'foo' })
  @ApiOkResponse({ type: 'string', schema: { example: 'Hello world!' } })
  healthCheck (@Query('name') name?: string): string {
    return `Hello ${name || 'world'}!`
  }
}
