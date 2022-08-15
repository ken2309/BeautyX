import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material'
import './style.css';
import tagsApi from '../../api/tagApi';

function FooterCate() {
    const [servicesChild, setServicesChild] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const res = await tagsApi.getServicesChild();
            console.log(res)
        }
        fetch()
    }, [])
    return (
        <Container>
            <div className="footer-cate-cnt">
                <span className="title">
                    Danh mục Sản phẩm/ Dịch vụ
                </span>
            </div>
        </Container>
    );
}

export default FooterCate;