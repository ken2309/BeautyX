import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppProvider";
import ServiceCate from "./components/ServiceCate";
import ServiceCateMb from "./components/ServiceCateMb";
import ServiceList from "./components/ServiceList";
import servicesApi from "../../api/serviceApi";
import categoryApi from "../../api/categoryApi";
import { IOrganization } from '../../interface/organization'
import "./serviceByMerchant.css";

interface IProps {
  activeTab: number,
  mer_id: number,
  org: IOrganization | undefined
}

const tab_id = 2;
function ServiceByMerchant(props: IProps) {
  const { t } = useContext(AppContext);
  const { activeTab, mer_id, org } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [chooseCate, setChooseCate] = useState();
  const [dataCates, setDataCates] = useState({
    cates: [],
    loadingCate: true
  })
  const [dataServices, setDataServices] = useState({
    services: [],
    page: 1,
    page_count: 1,
    loading: true
  })

  useEffect(() => {
    async function handleGetServices() {
      try {
        if (!chooseCate) {
          const res = await servicesApi.getByOrg_id({
            org_id: mer_id,
            page: dataServices.page,
          });
          setDataServices({
            ...dataServices,
            services: res.data.context.data,
            page_count: res.data.context.last_page,
            loading: false
          })
        } else {
          const resByCate = await servicesApi.getByOrgId_cateId({
            cate_id: chooseCate,
            page: dataServices.page,
            org_id: mer_id,
          });
          setDataServices({
            ...dataServices,
            services: resByCate.data.context.data,
            page_count: resByCate.data.context.last_page,
            loading: false
          })
        }
      } catch (err) {
        setDataServices({
          ...dataServices,
          loading: false
        })
        console.log(err);
      }
    }
    handleGetServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mer_id, dataServices.page, chooseCate]);
  useEffect(() => {
    async function handleGetCategories() {
      try {
        const resCate = await categoryApi.getByOrgId_services({
          org_id: mer_id,
        });
        setDataCates({
          cates: resCate.data.context.data,
          loadingCate: false
        })
      } catch (err) {
        setDataCates({
          ...dataCates,
          loadingCate: false
        })
        console.log(err);
      }
    }
    handleGetCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mer_id]);
  //console.log(services);
  return (
    <div
      style={tab_id === activeTab ? { display: "block" } : { display: "none" }}
    >
      <div
        className="flex-row-sp ser-content"
        style={{ alignItems: "flex-start" }}
      >
        <ServiceCate
          dataCates={dataCates}
          dataServices={dataServices}
          setDataServices={setDataServices}
          chooseCate={chooseCate}
          setChooseCate={setChooseCate}
        />
        {/* for mobile */}
        <ServiceCateMb
          categories={dataCates.cates}
          chooseCate={chooseCate}
          setChooseCate={setChooseCate}
          dataServices={dataServices}
          setDataServices={setDataServices}
        />
        {/* ----- */}
        <ServiceList
          t={t}
          mer_id={mer_id}
          org={org}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          dataServices={dataServices}
          setDataServices={setDataServices}
        />
      </div>
    </div>
  );
}

export default ServiceByMerchant;
