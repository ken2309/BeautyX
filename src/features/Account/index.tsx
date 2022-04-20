import { RouteComponentProps } from "@reach/router";
import { Switch } from "react-router-dom";
// import CheckNoti from "./components/CheckNotification";
import PaymentMethod from "./components/PaymentMethod/index";
import Information from "./components/Information/index";
import Head from "../Head/index";
import "./account.css";
import SideBar from "./components/MenuSideBar";
import Orders from '../Orders/index';
import Product from "./components/HistoryProduct";
import Service from "./components/HistoryService";
import ComboList from "./components/HistoryCombo/components/Combolist";
import AccountMb from "../../featuresMobile/Account";
import OrderDetail from "../OrderDetail";
import UserAddress from "./components/UserAddress/components/UserAddress";
import UserDiscounts from "./components/UserDiscounts";
import Footer from "../Footer";
const routes = [
  {
    path: `/tai-khoan/phuong-thuc-thanh-toan`,
    component: <PaymentMethod />,
  },
  {
    path: `/tai-khoan/thong-tin-ca-nhan`,
    component: <Information />,
  },
  {
    path: `/tai-khoan/san-pham`,
    component: <Product />,
  },
  {
    path: `/tai-khoan/goi-dich-vu`,
    component: <Service />,
  },
  {
    path: `/tai-khoan/combo`,
    component: <ComboList />,
  },
  {
    path: '/tai-khoan/lich-su-mua',
    component: <Orders />
  },
  {
    path: '/tai-khoan/chi-tiet-don-hang',
    component: <OrderDetail />
  },
  {
    path: '/tai-khoan/dia-chi',
    component: <UserAddress />
  },
  {
    path: '/tai-khoan/ma-uu-dai',
    component: <UserDiscounts />
  }
];
function Account() {
  const RouterPage = (
    props: { pageComponent: JSX.Element } & RouteComponentProps
  ) => props.pageComponent;
  return (
    <>
      <Head />
      <div className="wrapper account_section">
        <SideBar />
        <div className="display_section">
          <Switch>
            {routes.map((item, index) => (
              <RouterPage
                key={index}
                path={`${item.path}`}
                pageComponent={item.component}
              />
            ))}
          </Switch>
        </div>
      </div>
      {/* for mobile */}
      <AccountMb />
      <Footer />
    </>
  );
}
export default Account;
