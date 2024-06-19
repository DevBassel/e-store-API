import { SelectQueryBuilder } from 'typeorm';

export async function paginate<T>(
  Q: SelectQueryBuilder<T>,
  page: number = 1,
  limit: number = 10,
) {
  const [data, total] = await Q.skip((page - 1) * limit)
    .take(limit)
    .getManyAndCount();

  return {
    data,
    total,
    Pages: Math.ceil(total / limit),
    page,
    limit,
  };
}
