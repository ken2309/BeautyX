import React from 'react';
import DetailInfo from './DetailInfo';
import DetailComment from './DetailComment';
import { IOrganization } from '../../../interface/organization';
import DetailDiscount from './DetailDiscount';

interface IProps {
      org: IOrganization | undefined
}

function DetailMer(props: IProps) {
      const { org } = props;
      return (
            <>
                  <DetailDiscount
                        org={org}
                  />
                  <div className="mer-detail__content-desc">
                        <DetailInfo
                              merDetail={org}
                        />
                        <DetailComment
                              org={org}
                        />
                  </div>
            </>
      );
}

export default DetailMer;