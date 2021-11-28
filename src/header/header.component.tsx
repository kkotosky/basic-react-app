import React, { ReactElement } from 'react';

import './header.component.scss';

const Header = (props: any): ReactElement => {  

  return (
    <div className="wookie-app_header">
      <h1> Wookie Movies </h1>  
    </div>
  )
};


export default Header;
