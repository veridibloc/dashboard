import { useCallback, useContext } from 'react';
import { MaterialContext } from 'components/contexts/materialProvider';
import { Material } from '@/types/materialMap';

export const useMaterial = () => {
  const materials = useContext(MaterialContext);
  if(!materials) {
    throw new Error("useMaterial must be used within MaterialProvider");
  }

  const getCollectibles = useCallback(() => {
    const materialList =  new Array<Material>()
    for(const m of materials.values()){
      console.log('getCollectible', m);

      if(m.collectible){
        materialList.push(m);
      }
    }
    return materialList
  }, [materials])


  const getProducibles = useCallback(() => {
    const materialList =  new Array<Material>()
    for(const m of materials.values()){
      if(!m.collectible){
        materialList.push(m);
      }
    }
    return materialList
  }, [materials])


  const getMaterial = (slug: string) => {
    const entry = materials.get(slug);
    if(!entry) {
      console.warn(`Material not found for [${slug}]`);
      return null;
    }
    return entry;
  }

  const materialId = (slug:string) => {
    const material = getMaterial(slug);
    return material ? material.materialId : "";
  }


  const name = (slug:string) => {
    const material = getMaterial(slug);
    return material ? material.name : slug;
  }

  const label = (slug:string) => {
    const material = getMaterial(`${slug}_label`);
    return material ? material.name : slug;
  }

  return {
    name,
    label,
    materialId,
    getMaterial,
    getCollectibles,
    getProducibles,
  }

}