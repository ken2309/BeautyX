import React from 'react';
import DetailInfo from './DetailInfo';
import DetailComment from './DetailComment';
import { IOrganization } from '../../../interface/organization';
import DetailDiscount from './DetailDiscount';

interface IProps {
      merDetail: IOrganization | undefined
}

function DetailMer(props: IProps) {
      const { merDetail } = props;
      return (
            <>
                  <DetailDiscount
                        org={merDetail}
                  />
                  <div className="mer-detail__content-desc">
                        <DetailInfo
                              merDetail={merDetail}
                        />
                        <DetailComment
                              org={merDetail}
                        />
                  </div>
            </>
      );
}

export default DetailMer;