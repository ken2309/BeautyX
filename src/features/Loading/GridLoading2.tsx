import React from 'react';
import Skeleton from 'react-loading-skeleton'

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13]
function GridLoading2(props:any) {
      return (
            <>
                  {
                        list.map(item => (
                              <li key={item} className="grid_loading">
                                    <div className="grid-ld__item">
                                          <div className="grid-ld__item-img">
                                                <Skeleton style={{ width: '100%', height: '100%', borderRadius: '24px 24px 0px 0px' }} />
                                          </div>
                                          <div className="grid-ld__item-name">
                                                <Skeleton style={{ width: '100%', height: '100%', borderRadius: '8px' }} />
                                          </div>
                                          <div className="grid-ld__item-price">
                                                <Skeleton style={{ width: '100%', height: '100%', borderRadius: '8px' }} />
                                          </div>
                                    </div>
                              </li>
                        ))
                  }
            </>
      );
}

export default GridLoading2;