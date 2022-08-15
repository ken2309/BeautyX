import React from 'react';
import { EXTRA_FLAT_FORM } from '../../api/extraFlatForm';
import { FLAT_FORM_TYPE } from '../../rootComponents/flatForm'
import useFullScreen from '../../utils/useDeviceMobile';

interface IProps {
      title: string | any
}

function HeadTitle(props: IProps) {
      const IS_MB = useFullScreen();
      const { title } = props;
      const FLAT_FORM = EXTRA_FLAT_FORM();

      let t: string = "BeautyX";
      if (IS_MB) {
            document.title = t
      }
      else {
            document.title = FLAT_FORM === FLAT_FORM_TYPE.MOMO ? 'BeautyX' : `${title} - ${FLAT_FORM}`
      }
      return (
            <></>
      );
}

export default HeadTitle;