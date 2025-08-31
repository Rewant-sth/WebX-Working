# Package Category API Documentation

This API provides endpoints to fetch travel packages filtered by category with Incremental Static Regeneration (ISR) for optimal performance.

## Endpoints

### GET /api/package/category/expedition
Fetches expedition packages specifically.

### GET /api/package/category/[categorySlug]
Generic endpoint that fetches packages for any category.

## Query Parameters

All endpoints support the following query parameters:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number for pagination |
| `limit` | number | 10 | Number of items per page |
| `sort` | string | createdAt | Field to sort by |
| `order` | string | desc | Sort order (asc or desc) |

## Example Usage

### Fetch First Page of Expedition Packages
```
GET /api/package/category/expedition
```

### Fetch Second Page with Custom Limit
```
GET /api/package/category/expedition?page=2&limit=20
```

### Fetch Packages Sorted by Name
```
GET /api/package/category/expedition?sort=name&order=asc
```

### Fetch Trekking Packages (using dynamic route)
```
GET /api/package/category/trekking
```

## Response Format

The API returns data in the `ITravelPackageResponse` format:

```typescript
{
  status: string;
  results: number;
  total: number;
  page: number;
  pages: number;
  data: ITravelPackage[];
}
```

## Caching & ISR

- **Revalidation Time**: 30 minutes (1800 seconds)
- **Cache Headers**: Includes proper cache control headers for CDN optimization
- **Stale-While-Revalidate**: 1 hour for improved user experience

## Service Functions

Use the following service functions in your React components:

### getExpeditionPackages()
```typescript
import { getExpeditionPackages } from '@/service/packages';

const packages = await getExpeditionPackages({
  page: 1,
  limit: 10,
  sort: 'name',
  order: 'asc'
});
```

### getPackagesByCategory()
```typescript
import { getPackagesByCategory } from '@/service/packages';

const trekkingPackages = await getPackagesByCategory('trekking', {
  page: 1,
  limit: 15
});
```

## Error Handling

The API returns appropriate HTTP status codes:

- **200**: Success
- **400**: Bad Request (missing category slug)
- **405**: Method Not Allowed
- **500**: Internal Server Error

Error responses include:
```typescript
{
  status: 'error',
  message: string,
  error?: string
}
```

## Environment Variables

Make sure the following environment variable is configured:

```env
NEXT_PUBLIC_BACKEND_URL=https://your-backend-api.com
```
