import React from 'react';
import Skeleton from 'react-loading-skeleton'

function SearchLoading(props: any) {
      const list = [1, 2, 3]
      return (
            <>
                  {
                        list.map(item =>(
                              <li
                                    key={item}
                                    className="se-item"
                              >
                                    <div className="se-item__img">
                                          <Skeleton
                                                style={{ width: '100%', height: '100%', borderRadius: '24px' }}
                                          />
                                    </div>
                                    <div className="se-item__cnt">
                                          <div className="se-item__cnt-name">
                                                <Skeleton
                                                      style={{ width: '100%', height: '100%', borderRadius: '8px' }}
                                                />
                                          </div>
                                          <div className="se-item__cnt-address">
                                                <Skeleton
                                                      style={{ width: '100%', height: '100%', borderRadius: '8px' }}
                                                />
                                          </div>
                                          <div className="se-item__cnt-service">
                                                <div className="se-item__cnt-service-item">
                                                      <Skeleton
                                                            style={{ width: '100%', height: '100%', borderRadius: '8px' }}
                                                      />
                                                </div>
                                                <div className="se-item__cnt-service-item">
                                                      <Skeleton
                                                            style={{ width: '100%', height: '100%', borderRadius: '8px' }}
                                                      />
                                                </div>
                                                <div className="se-item__cnt-service-item">
                                                      <Skeleton
                                                            style={{ width: '100%', height: '100%', borderRadius: '8px' }}
                                                      />
                                                </div>
                                                <div className="se-item__cnt-service-item">
                                                      <Skeleton
                                                            style={{ width: '100%', height: '100%', borderRadius: '8px' }}
                                                      />
                                                </div>
                                          </div>
                                    </div>
                              </li>
                        ))
                  }
            </>
      );
}

export default SearchLoading;