import React, { useContext } from "react";
import Home from "../features/Home/index";
import SearchResult from "../features/SearchResult/index";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import { RouteComponentProps } from "@reach/router";
import MerchantDetail from "../features/MerchantDetail/index";
import Partner from "../features/Partner";
import Cart from "../features/Cart/index";
import CartPayment from "../features/CartPayment/index";
import Account from "../features/Account";
import ProductDetail from "../features/ProductDetail";
import ServiceDetail from "../features/ServiceDetail";
import PopupAppointInfor from "../features/PopupAppointInfor";
import SignPage from "../features/SignPage/index";
import SignPageRequest from "../features/SignPageRequest/index";
import Notification from "../features/Notification/index";
import PrivateRoute from "./PrivateRoute";
import CartPaymentStatus from "../features/CartPaymentStatus";
import ServicesUser from "../features/ServiceUser";
//import DatePicker from "../components/DatePicker"
import { AppContext } from "../context/AppProvider";
import SearchResults from '../features/SearchResults/index';
import HomeTags from "../features/HomeResults/HomeTags";
import HomePromo from "../features/HomeResults/HomePromo";
import HomeProvince from "../features/HomeResults/HomeProvince";
import HomeListProvince from "../features/HomeResults/HomeListProvince";
import HomeCardResult from "../features/HomeResults/HomeCardResult";
import HomeDealBanner from "../features/HomeResults/HomeDealBanner";
import Policy from "../features/Policy";
import SellerCenter from "../features/SellerCenter";
import CommentsDetail from "../features/Comments/CommentsDetail";
import Otp from "../features/Otp";
import ResetPassword from "../features/ResetPassword";

// feature mobile
import Calendar from "../featuresMobile/Calendar";
import MerchantComment from "../features/MerchantComment";

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;
function RouterConfig(props: any) {
  const { profile } = useContext(AppContext)
  const routes = [
    {
      path: `/home`,
      component: <Home />,
    },
    {
      path: `/otp`,
      component: <Otp />,
    },
    {
      path:'/doi-mat-khau',
      component: <ResetPassword/>
    },
    {
      path: "/search-result/",
      component: <SearchResult />,
    },
    {
      path:'/ket-qua-tim-kiem/',
      component:<SearchResults/>
    },
    {
      path: "/cart",
      component: <Cart />,
    },
    {
      path: "/product-detail/:name",
      component: <ProductDetail />,
    },
    {
      path: "/dich-vu/",
      component: <ServiceDetail />,
    },
    {
      path: "/popup",
      component: <PopupAppointInfor />,
    },
    {
      path: "/sign-up",
      component: <SignPage />,
    },
    {
      path: "/sign-in",
      component: <SignPage />,
    },
    {
      path: "/sign-request",
      component: <SignPageRequest />,
    },
    {
      path: "/merchant-comment",
      component: <MerchantComment />,
    },
    // {
    //   path: "/date",
    //   component: <DatePicker />
    // },
    {
      path: "/org/:subdomain",
      component: <MerchantDetail />,
    },
    {
      path:'/danh-muc/',
      component: <HomeTags/>
    },
    {
      path:'/deal-lam-dep-cuc-HOT',
      component: <HomePromo/>
    },
    {
      path:'/khu-vuc/',
      component: <HomeProvince/>
    },
    {
      path:'/dia-diem-quan-tam',
      component: <HomeListProvince/>
    },
    {
      path:'/doanh-nghiep/:title',
      component: <HomeCardResult/>
    },
    {
      path:'/chinh-sach/',
      component: <Policy/>
    },
    {
      path: "/partner",
      component: <Partner/>,
    },
    {
      path:"/kenh-nguoi-ban",
      component:<SellerCenter/>
    },
    {
      path:"/danh-gia/",
      component:<CommentsDetail/>
    },
    {
      path:"/deal/:title",
      component: <HomeDealBanner/>
    }
  ];
  const routesPrivate = [
    {
      path:'/goi-dich-vu',
      component:ServicesUser
    },
    {
      path: "/tai-khoan",
      component: Account,
    },
    {
      path: "/payment",
      component: CartPayment,
    },
    {
      path: "/Calendar",
      component: Calendar,
    },
    {
      path: "/notifications",
      component: Notification,
    },
    {
      path:'/trang-thai-don-hang/:desc',
      component: CartPaymentStatus
    }
  ];
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="home" />
        {routes.map((item, index) => (
          <RouterPage
            key={index}
            path={`${item.path}`}
            pageComponent={item.component}
          />
        ))}
        {routesPrivate.map((item, index) => (
          <PrivateRoute
            profile={profile}
            key={index}
            path={`${item.path}`}
            component={item.component}
          />
        ))}
      </Switch>
    </BrowserRouter>
  );
}

export default RouterConfig;
