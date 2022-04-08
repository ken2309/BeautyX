import React, { useContext } from "react";
import productsApi from "../../../api/productApi";
import icon from "../../../constants/icon";
import { AppContext } from "../../../context/AppProvider";
export default function InputProByMerSearch(props: any) {
  const { mer_id, setDataProducts } = props;
  const { t } = useContext(AppContext);
  function handerOnchange(e: any) {
    const { value } = e.target;
    async function handleFilterByKey() {
      const res = await productsApi.getBySearch({
        org_id: mer_id,
        searchKey: value,
      });
      setDataProducts({
        products: res.data.context.data,
        page: 1,
        page_count: res.data.context.last_page
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
