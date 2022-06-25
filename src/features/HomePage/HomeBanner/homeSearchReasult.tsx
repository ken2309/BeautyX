import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from '@mui/material'
export default function HomeBannerResult(){
    const location = useLocation();
    const dataBanner = location.state;
    const apiBanner = location.state.url;
    const [data, setData] = useState<any>({
      services: [],
      loading: true,
      page: 1,
      totalItem: 1
    })
  
    useEffect(() => {
      axios
        .get(apiBanner)
        .then((response) => {
          const res = response;
          setData({
            ...data,
            services: [...data.services, ...res.data.hits],
            loading: false,
            totalItem: data.total
          })
        })
        .catch((error) => {
          console.log("error :>> ", error);
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.page])
    const onViewMore = () => {
      if (data.services.length < data.totalItem && data.services.length >= 15) {
        setData({
          ...data,
          page: data.page + 1
        })
      }
    }
    return(
        <div>
            alo
        </div>
    )
}