/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import MapContent from '../../components/Map/MapContent';
import { fetchAsyncOrgsByFilter, onSetOrgsEmpty } from '../../redux/filter/filterSlice';
import Map from '../../components/Map';

function HomeMap() {
    const dispatch = useDispatch();
    const location = useLocation()
    const { orgs, status, page, totalItem, path_url } = useSelector((state: any) => state.FILTER.ORGS);
    const callOrgsByDistance = () => {
        if (path_url !== location.pathname) {
            dispatch(onSetOrgsEmpty())
            dispatch(fetchAsyncOrgsByFilter({
                page: 1,
                sort: "distance",
                path_url: location.pathname
            }))
        }
    }
    useEffect(() => {
        callOrgsByDistance()
    }, [])
    return (
        <div>
            <Map
                open={true}
                data={orgs}
            />
        </div>
    );
}

export default HomeMap;