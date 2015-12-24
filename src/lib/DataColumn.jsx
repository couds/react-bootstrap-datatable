import React from 'react'

class DataColumn extends React.Component {

  static propTypes = {
    title: React.PropTypes.string,
    field: React.PropTypes.string.isRequired,
    sortable : React.PropTypes.bool,
    md : React.PropTypes.number
  }

  static defaultProps = {
    sortable: false
  }
  
  render() {
    return (
      <div />
    )
  }
}

export default DataColumn