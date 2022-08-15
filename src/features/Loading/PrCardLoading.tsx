import React from 'react';
import Skeleton from 'react-loading-skeleton';

function PrCardLoading(props: any) {
      return (
            <div className="pr-de-loading">
                  <div className="pr-de-loading__name">
                        <Skeleton
                              style={{ width: '100%', height: '100%' }}
                        />
                  </div>
                  <div className="pr-de-loading__spa">
                        <Skeleton
                              style={{ width: '100%', height: '100%' }}
                        />
                  </div>
                  <div className="pr-de-loading__spa">
                        <Skeleton
                              style={{ width: '100%', height: '100%' }}
                        />
                  </div>
                  <Skeleton
                        style={{ height: '120px', margin: '16px 0px' }}
                        count={3}
                  />
            </div>
      );
}

export default PrCardLoading;