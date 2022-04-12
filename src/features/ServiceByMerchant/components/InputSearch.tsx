import React, { useContext } from "react";
import { AppContext } from "../../../context/AppProvider";
import icon from "../../../constants/icon";
import serviceApi from "../../../api/serviceApi";

function InputSearch(props: any) {
  const { t } = useContext(AppContext);
  const { mer_id, dataServices, setDataServices } = props;
  function handerOnchange(e: any) {
    const { value } = e.target;
    async function handleFilterByKey() {
      const res = await serviceApi.getBySearch({
        org_id: mer_id,
        searchKey: value,
      });
      setDataServices({
        ...dataServices,
        services: res.data.context.data,
        page_count: res.data.context.last_page,
        page: 1,
      })
    }
    handleFilterByKey();
  }
  return (
    <div className="flex-row list-filter__right">
      <input
        onChange={handerOnchange}
        type="text"
        placeholder={t("Mer_de.search_by_service")}
      />
      <button>
        <img src={icon.search} alt="" />
      </button>
    </div>
  );
}

export default InputSearch;
