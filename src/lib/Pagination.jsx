import React from 'react'
import {Pagination as PaginationBS} from 'react-bootstrap'
class Pagination extends React.Component {

  static defaultProps  = {
    items: 1,
    maxButtons : 3,
    bsSize: 'small',
    activePage : 1,
    next: true,
    prev: true,
    handleSelect: (event, selectedEvent)=>{
      //selectedEvent.eventKey
    }
  }
  
  render() {
    return (
      <PaginationBS
        {...this.props}
        onSelect={this.props.handleSelect} />
    )
  }
}

export default Pagination