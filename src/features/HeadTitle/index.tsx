import React from 'react';
import { EXTRA_FLAT_FORM } from '../../api/extraFlatForm';
import { FLAT_FORM_TYPE } from '../../rootComponents/flatForm'

interface IProps {
      title: string | any
}

function HeadTitle(props: IProps) {
      const { title } = props;
      const FLAT_FORM = EXTRA_FLAT_FORM();
      document.title = `${title} - ${FLAT_FORM}`
      return (
            <></>
      );
}

export default HeadTitle;