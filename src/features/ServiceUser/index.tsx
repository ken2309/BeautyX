import React, { useState } from 'react';
import Head from '../Head';
import { Container } from '@mui/material';
import './mySer.css';
import ServiceBook from './components/ServiceBook';
import PopupNoti from './components/PopupNoti';
import ServiceBottom from './components/ServiceBottom';
import Footer from '../Footer'

function ServicesUser(props: any) {
      const { setOpen } = props;
      const [openNoti, setOpenNoti] = useState(true)
      //const [servicesBook, setServicesBook] = useState([])

      //mb
      return (
            <>
                  <Head
                        setCloseDialog={setOpen}
                  />
                  <Container>
                        <div className="flex-row-sp my-ser">
                              <div className="my-ser__right">
                                    <ServiceBook
                                          //servicesBook={servicesBook}
                                          //setServicesBook={setServicesBook}
                                    />
                              </div>
                        </div>
                  </Container>
                  <ServiceBottom
                        //servicesBook={servicesBook}
                        setOpenNoti={setOpenNoti}
                  />
                  <Footer />
                  <PopupNoti
                        open={openNoti}
                        setOpen={setOpenNoti}
                  />
            </>
      );
}

export default ServicesUser;