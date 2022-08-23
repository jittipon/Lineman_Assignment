import React, { useState } from 'react';
import '../style/_mixin.scss'
import { SearchOutlined } from '@ant-design/icons';

const SearchButton = () => {

  return (
    <div>
      <button class="big-button"><SearchOutlined/></button>
    </div>
  );
}

export default SearchButton;