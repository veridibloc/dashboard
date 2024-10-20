
export interface Material {
  slug: string;
  name: string
  collectible: boolean
  materialId: string
}

export type MaterialMap = Map<string,Material>