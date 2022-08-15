import React, { useContext, useState } from 'react';
import ProductsTab from './ProductsTab/index';
import ServicesTab from './ServicesTab/index';
import ComboTab from './CombosTab/index';
import { AppContext } from '../../../context/AppProvider';
import { ITems } from '../../../interface/orderv2'

interface ITab {
      id: number,
      title: string,
      count: number
}

function TabOrder(props: any) {
      const { order, org, open } = props;
      const { t } = useContext(AppContext)
      const services = order?.items.filter((item: ITems) => item.productable_type.slice(14, item?.productable_type.length) === 'Service')
      const products = order?.items.filter((item: ITems) => item.productable_type.slice(14, item?.productable_type.length) === 'Product')
      const combos = order?.items.filter((item: ITems) => item.productable_type.slice(14, item?.productable_type.length) === 'TreatmentCombo')
      const tabList = [
            { id: 1, title: t('Mer_de.products'), count: products?.length },
            { id: 2, title: t('Mer_de.services'), count: services?.length },
            { id: 3, title: 'Combo', count: combos?.length }
      ]
      const tabs = tabList.sort((a:ITab, b:ITab) => b.count - a.count);
      const [acTab, setAcTab] = useState<number>(tabs[0].id);
      return (
            <>
                  <div className="flex-row order-de-tab">
                        {
                              tabs.map(item => (
                                    <div
                                          style={item.count === 0 ? { display: 'none' } : { display: 'block' }}
                                          key={item.id}
                                          className="order-de-tab__btn"
                                    >
                                          <button
                                                onClick={() => setAcTab(item.id)}
                                                style={item.id === acTab ? { backgroundColor: 'var(--purple)', color: 'var(--bgWhite)' } : {}}
                                          >{item.title} ({item.count}) </button>
                                    </div>
                              ))
                        }
                  </div>
                  {/* <AllTab
                        org={org}
                        order={order}
                        tab_id={acTab}
                  /> */}
                  <ProductsTab
                        org={org}
                        open={open}
                        tab_id={acTab}
                        products={products}
                  />
                  <ServicesTab
                        org={org}
                        open={open}
                        tab_id={acTab}
                        services={services}
                  />
                  <ComboTab
                        org={org}
                        open={open}
                        tab_id={acTab}
                        combos={combos}
                  />
            </>
      );
}

export default TabOrder;