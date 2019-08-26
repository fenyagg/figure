import { observer } from 'mobx-react-lite';
import React, {useContext} from 'react';
import './Canvas.scss';
import { StoreContext } from '../../stores';

const Canvas = () => {
  const context = useContext(StoreContext);
  return (
    <div className='canvas'>

    </div>
  );
};

export default observer(Canvas);
