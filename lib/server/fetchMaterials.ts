import { cache } from 'react';
import prisma from '@/server/prisma';
import { type Material, MaterialMap } from '@/types/materialMap';

const DefaultFallback = 'en'

export const fetchMaterials = cache(async (locale: string): Promise<MaterialMap> => {
  console.debug(`Fetching materials for locale [${locale}] from database...`);
  let fallbackLocale =  locale;
  const columnExists = await checkColumnExists('Material', locale);

  if(!columnExists) {
    console.warn(`Locale not found - Using fallback [${DefaultFallback}]`)
    fallbackLocale = DefaultFallback
  }

  const responses = await prisma.material.findMany({
    select: { slug: true, [fallbackLocale]: true, collectible: true, materialId: true}
  })

  const materials = new Map<string,Material>();
  responses.forEach(({slug, collectible, materialId, ...t}) => {
    materials.set(slug, {
      slug,
      name : t[fallbackLocale],
      collectible,
      materialId
    })
  })

  return materials;
});

async function checkColumnExists(table: string, column: string) {
  // psql!
  const result: any = await prisma.$queryRaw`
    SELECT column_name 
    FROM information_schema.columns 
    WHERE table_name = ${table} 
    AND column_name = ${column}
  `;

  return result.length > 0;
}

