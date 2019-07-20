import React, { useState } from 'react';
import CollapsibleListItem from './CollapsableListItem';
import { Styled } from 'theme-ui';

const setDefault = arr => {
  let result = {};
  arr.forEach((key) => { 
    result[key] = false
  });
  return result
}

const handleKeyDown = (event, setOpen, section) => {
  if (event.key === " " || event.key === "Enter" || event.key === "Spacebar") {
    event.preventDefault();
    setOpen(prevState => {
      let newCopy = { ...prevState };
      newCopy[section.title] = !newCopy[section.title];
      return newCopy
    })
  }
}

const CollapsableList = ({ sections }) => {
  const [open, setOpen] = useState(setDefault(sections.map(({title}) => title)));
  return (
    <div style={style.section}> 
    {sections.map((section) => {
        return section.html !== "" ? 
          <div key={section.title} style={style.collapsableContainer} >
            <Styled.h3 style={style.heading}
              className="section"
              tabIndex="0"
              role="button"
              aria-expanded={open[section.title]}
              onKeyDown={(event) => handleKeyDown(event, setOpen, section)}
              onClick={() => setOpen(prevState => {
                // if (open[section.title]) {
                //   document.activeElement.blur()
                // }
                let newCopy = { ...prevState };
                newCopy[section.title] = !newCopy[section.title];
                return newCopy
              })}>
              {section.title}
            </Styled.h3>
            {open[section.title] ? <CollapsibleListItem html={section.html}></CollapsibleListItem> : null}
          </div> 
          : null
    })}
    </div>
  )
}

const style = {
  section: {
    margin: '12px',
  },
  heading: {
    cursor: 'pointer'
  },
  collapsableContainer: {
    marginBottom: '18px'
  }
}

export default CollapsableList;