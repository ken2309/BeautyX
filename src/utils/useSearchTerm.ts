import { useEffect, useState } from 'react';

interface Services {
      id: number, name: string, oldPrice: number, salePrice: number
}
function useSearchTerm(searchTerm: any, list: any) {
      const [listBySearchTerm, setListBySearchTerm] = useState<Services[]>([])
      useEffect(() => {
            async function handleSearchTerm() {
                  const result = list.filter((item: { [x: string]: { toString: () => string; }; }) => {
                        return Object.keys(item).some(key =>
                              item[key]?.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())
                        )
                  })
                  setListBySearchTerm(result);
            }
            handleSearchTerm()
      }, [list, searchTerm])
      return listBySearchTerm
}

export default useSearchTerm;