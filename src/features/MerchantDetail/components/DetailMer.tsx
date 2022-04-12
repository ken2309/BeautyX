import React from 'react';
import DetailInfo from './DetailInfo';
import DetailComment from './DetailComment';
import { IOrganization } from '../../../interface/organization'

interface IProps {
      merDetail: IOrganization | undefined
}

function DetailMer(props: IProps) {
      const { merDetail } = props;
      return (
            <div className="mer-detail__content-desc">
                  <DetailInfo
                        merDetail={merDetail}
                  />
                  <DetailComment
                        org={merDetail}
                  />
            </div>
      );
}

export default DetailMer;