import React from 'react';
import { Dropdown } from 'semantic-ui-react';


class FilterPicker extends React.Component {

  componentDidMount() {
    let input = document.getElementsByTagName("input")[0];
    input.setAttribute("label", "search");
  }

  render() {
    const { tags, changeSelected } = this.props
    let options = tags.map(tag => {
      return {
        key: tag, text: tag, value: tag
      }
    })

    return (
      <div style={style.dropdown}>
        <Dropdown 
        style={{color: 'black'}}
        placeholder='Tags' 
        onChange={(e, { value }) => changeSelected(value)}
        fluid 
        multiple 
        selection 
        search
        options={options}/>
      </div>
    )
  }
}

const style = {
  dropdown: {
    color: 'black',
    marginBottom: '20px',
    height: 'auto'
  }
}

export default FilterPicker;