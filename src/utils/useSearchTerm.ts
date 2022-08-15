import { useEffect, useState } from 'react';
import {Service} from '../interface/service'

function useSearchTerm(searchTerm: any, list: any) {
      const [listBySearchTerm, setListBySearchTerm] = useState<Service[]>([])
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