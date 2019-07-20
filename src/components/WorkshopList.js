import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import FilterPicker from './FilterPicker';

const COLUMN_NUMBER = 2;

class WorkshopList extends React.Component {

  constructor(props) {
    super(props);
    let { workshops } = this.props;

    // Initialise the object of tags to false
    let newTags = {};
    workshops.forEach(workshop => {
      workshop.metadata.tags.forEach(tag => {
        let sanitisedTag = this.removeSpaces(tag);
        newTags[sanitisedTag] = false;
      });
    })

    this.state = {
      showAll: true,
      tags: newTags
    }

    this.filterByTag = this.filterByTag.bind(this);
    this.changeSelected = this.changeSelected.bind(this);
  }

  removeSpaces = (str) => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  filterByTag = (workshop) => {
    let tagsToMatch = Object.entries(this.state.tags).filter(([key, value]) => value);
    return tagsToMatch.every(([key, value]) => {
      return workshop.metadata.tags.includes(key)
    })
  }

  changeSelected = (values) => {
    let updatedTags = {};
    if (values.length === 0) {
      this.setState({
        showAll: true
      })

      // Clear all the tags 
      Object.keys(this.state.tags).forEach(tag => {
        updatedTags[tag] = false
      })
    } else {
      this.setState({
        showAll: false
      })

      // Set only those which are selected
      Object.keys(this.state.tags).forEach(tag => {
        if (values.includes(tag)) {
          updatedTags[tag] = true;
        } else {
          updatedTags[tag] = false;
        }
      })
    }

    this.setState({
      tags: updatedTags
    })
  }

  render() {
    let { workshops } = this.props;
    // Based on the selection of tags, filter the list accordingly
    let filteredWorkshop = this.state.showAll ? workshops : workshops.filter(workshop => {
      return this.filterByTag(workshop);
    }) 

    return (
      <>
        <h2>Workshops</h2>
        <FilterPicker tags={Object.keys(this.state.tags)} changeSelected={this.changeSelected}/>
        <div style={style.grid}>
          {filteredWorkshop.map((workshop, index) => {
            return ( 
              <div key={workshop.metadata.slug} style={style.gridItem(index)}>
                <Link to={workshop.metadata.slug}>
                  <Img alt={workshop.metadata.title + 'background image'} style={style.background} fluid={workshop.coverImageBg}/>
                  <Img alt={workshop.metadata.title + 'foreground image'} style={style.foreground} fluid={workshop.coverImageFg}/>
                </Link>
              </div>
            )
          })}
        </div>
      </>
    )
  }
}

const style = {
  grid: {
    display: 'grid',
    gridTemplateColumns: `repeat(${COLUMN_NUMBER}, 1fr)`,
    gridColumnGap: '5%',
  },
  gridItem: (index) => {
    return {
      position: 'relative',
      gridColumn: ` ${(index % COLUMN_NUMBER) + 1} / span 1`,
      gridRow: ` ${Math.floor(index / COLUMN_NUMBER)} / span 1`
    }
  },
  background: {
    position: 'relative',
    height: '100%'
  },
  foreground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '0px',
    left: '0px'
  },
}

export default WorkshopList;