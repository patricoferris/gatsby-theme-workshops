import React from 'react';
import { navigate } from 'gatsby';

const keyCheck = event => {
  return event.key === " " || event.key === "Enter" || event.key === "Spacebar";
}

const Button = ({ text, to }) => {
  return (
    <div onKeyDown={(e) => keyCheck(e) ? navigate(to) : null} onClick={() => navigate(to)} className='button' tabIndex="0">
      {text}
    </div>
  )
}

export default Button;