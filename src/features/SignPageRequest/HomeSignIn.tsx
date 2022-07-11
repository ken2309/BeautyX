import React, { useContext, useState } from "react";
import ButtonCus from "../../components/ButtonCus";
import SectionTitle from "../SectionTitle";
import SignInUp from "../poupSignInUp/index";
import { AppContext } from "../../context/AppProvider";
import { useHistory } from "react-router-dom";
import scrollTop from "../../utils/scrollTop";

function HomeSignIn(props: any) {
  const { t } = useContext(AppContext);
  const { useForSignRes } = props;
  const history = useHistory();
  const [openSignIn, setOpenSignIn] = useState(false);
  const [activeTabSign, setActiveTabSign] = useState(1);
  const popupSignInClick = () => {
    if (document.body.offsetWidth < 767) {
      history.push({
        pathname: "/sign-in",
        search: "1",
      });
      scrollTop();
    } else {
      setOpenSignIn(true);
      setActiveTabSign(1);
    }
  };
  const popupSignUpClick = () => {
    if (document.body.offsetWidth < 767) {
      history.push({
        pathname: "/sign-up",
        search: "2",
      });
      scrollTop();
    } else {
      setOpenSignIn(true);
      setActiveTabSign(2);
    }
  };
  return (
    <div
      style={useForSignRes === true ? { margin: "0px" } : {}}
      className="home-sign"
    >
      {useForSignRes === true ? (
        ""
      ) : (
        <SectionTitle title={t("Home.Sign_tile")} textAlign="center" />
      )}
      <div className="home-sign-button">
        <ButtonCus
          onClick={popupSignInClick}
          text={t("Home.Sign_in")}
          backColor="var(--purple)"
          color="var(--bg-gray)"
          fontSize="20px"
          lineHeight="24px"
          margin={useForSignRes === true ? "0px 12px" : "36px 12px"}
          borderRadius="20px"
        />
        <ButtonCus
          onClick={popupSignUpClick}
          text={t("Home.Sign_up")}
          color="var(--purple)"
          fontSize="20px"
          lineHeight="24px"
          border="solid 1px var(--purple)"
          margin={useForSignRes === true ? "0px 12px" : "36px 12px"}
          borderRadius="20px"
        />
      </div>
      <div className="home-sign">
        <SignInUp
          useForSignRes={useForSignRes}
          openSignIn={openSignIn}
          setOpenSignIn={setOpenSignIn}
          activeTabSign={activeTabSign}
          setActiveTabSign={setActiveTabSign}
        />
      </div>
    </div>
  );
}

export default HomeSignIn;
