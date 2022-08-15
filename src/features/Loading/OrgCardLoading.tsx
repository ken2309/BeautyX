import React from 'react';
import Skeleton from 'react-loading-skeleton'

function OrgCardLoading(props: any) {
      return (
            <div className="org-de-loading">
                  <div className="flex-row-sp org-de-loading__head">
                        <div className="org-de-loading__head-img">
                              <Skeleton
                                    style={{ width: '100%', height: '100%', borderRadius: '100%' }}
                              />
                        </div>
                        <div className="org-de-loading__head-name">
                              <div className="name">
                                    <Skeleton
                                          style={{ width: '100%', height: '100%'}}
                                    />
                              </div>
                              <div className="rate">
                                    <Skeleton
                                          style={{ width: '100%', height: '100%'}}
                                    />
                              </div>
                        </div>
                  </div>
                  <div className="org-de-loading__address">
                        <Skeleton
                              style={{ width: '100%', height: '100%'}}
                        />
                  </div>
                  <div className="org-de-loading__ser">
                        <Skeleton
                              style={{ width: '100%', height: '100%'}}
                        />
                  </div>
            </div>
      );
}

export default OrgCardLoading;