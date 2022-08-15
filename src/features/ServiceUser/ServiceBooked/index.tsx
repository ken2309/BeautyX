import React from 'react';

function ServiceBooked(props: any) {
      const { tab_id } = props;
      return (
            <div
                  style={tab_id === 2 ? { display: 'block' } : { display: 'none' }}
            >
                  ServiceBooked
            </div>
      );
}

export default ServiceBooked;