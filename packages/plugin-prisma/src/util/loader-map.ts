import { GraphQLResolveInfo } from 'graphql';
import { createContextCache } from '@pothos/core';
import { LoaderMappings } from '../types';

const cache = createContextCache((ctx) => new Map<string, LoaderMappings>());

export function cacheKey(path: GraphQLResolveInfo['path'], subPath: string[]) {
  let key = '';
  let current: GraphQLResolveInfo['path'] | undefined = path;

  while (current) {
    if (typeof current.key === 'string') {
      key = key ? `${current.key}.${key}` : current.key;
    }
    current = current.prev;
  }

  for (const entry of subPath) {
    key = `${key}.${entry}`;
  }

  return key;
}

export function setLoaderMappings(
  ctx: object,
  path: GraphQLResolveInfo['path'],
  value: LoaderMappings,
) {
  Object.keys(value).forEach((field) => {
    const map = cache(ctx);

    const mapping = value[field];
    // TODO: make this type specific
    const subPath = [...mapping.indirectPath, field];
    const key = cacheKey(path, subPath);

    map.set(key, mapping.mappings);
  });
}

export function getLoaderMapping(ctx: object, path: GraphQLResolveInfo['path']) {
  const map = cache(ctx);
  const key = cacheKey(path, []);

  return map.get(key) ?? null;
}