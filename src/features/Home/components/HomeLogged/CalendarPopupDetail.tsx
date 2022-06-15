import { Slide, Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import apointmentApi from "../../../../api/apointmentApi";
// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="left" ref={ref} {...props} />;
// });
export default function CalendarPopupDetail(props: any) {
  const {
    openPopupDetail, setOpenPopupDetail, datingList, org, branch
  } =
    props;

  const [services, setServices] = useState([]);
  useEffect(() => {
    async function handleSetDetail() {
      try {
        const res = await apointmentApi.getAppointmentById(datingList.id);
        setServices(res?.data.context.service_ids);
      } catch (error) {
        console.log(error);
      }
    }
    if(openPopupDetail === true){
      handleSetDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datingList.id, openPopupDetail]);
  function handleClosePopupDetail() {
    setOpenPopupDetail(false);
  }
  return (
    <Dialog 
      onClose={handleClosePopupDetail} 
      open={openPopupDetail}
    >

      oke
    </Dialog>
  );
}
