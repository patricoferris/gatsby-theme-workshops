import React from 'react';

const CollapsibleItem = ({ html }) => {
  return (
    <div dangerouslySetInnerHTML={{__html: html}}></div>
  )
}

export default CollapsibleItem;