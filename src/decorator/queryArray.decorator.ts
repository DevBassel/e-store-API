import { applyDecorators } from '@nestjs/common';
import { ApiQuery, ApiQueryOptions } from '@nestjs/swagger';

export function ApiQueryArray(queries: ApiQueryOptions[]) {
  return applyDecorators(...queries.map((query) => ApiQuery(query)));
}
