import React from 'react'
import { Table, Row,Col} from 'react-bootstrap'
import Pagination from './Pagination'
import Header from './Header'

class DataTable extends React.Component {

  constructor(props) {
    super(props)

    let self = this;
    self.children = [];
    React.Children.map(this.props.children, (child) => {
      if (child.type === Pagination) {
        self.pagination = child;
      } else {
        self.children.push(child)
      }
    })

    this.state = {
      data: props.data,
      sort: {
        field: null,
        asc: false
      },
      pagination: {
        activePage: self.pagination.props.activePage,
        itemPerPage: self.pagination.props.itemPerPage
      },
      search: {}
    }
  }

  static propTypes = {
    data: React.PropTypes.array.isRequired,
    pagination: React.PropTypes.bool,
    sizePerPage: React.PropTypes.number
  }

  sortBy = (field, sortable) => {

    if (!sortable) {
      return;
    }
    let self = this;
    return () => {
      self.setState({
        sort: {
          field: field,
          asc: self.state.sort.field === field ? !self.state.sort.asc : true
        }
      })
    }
  }

  search = (field) => {
    let self = this;
    return (event) => {
      let search = this.state.search
      search[field] = event.target.value
      this.setState({
        search,
        pagination: {
          activePage: 1,
          itemPerPage: this.state.pagination.itemPerPage
        }
      })

      return false
    }
  }

  handleSelect = (event, selectedEvent)=> {
    this.setState({
      pagination: {
        activePage: selectedEvent.eventKey,
        itemPerPage: this.state.pagination.itemPerPage
      }
    })
  }

  render() {
    let self = this;
    let paginator = '', children = [], Paginator, headers = [];

    this.children.forEach((child, i) => {

      children.push(child)
      let props = {
        key: i,
        md: child.props.md,
        sortable: child.props.sortable,
        searchable: child.props.searchable,
        currentSearch: self.state.search[child.props.field],
        field: child.props.field,
        onSearch: this.search,
        isSortField: child.props.field === self.state.sort.field,
        asc : self.state.sort.asc,
        onSort: this.sortBy,
        searchOptions: child.props.searchOptions,
        dtStyle: this.props.dtStyle
      }

      headers.push(
        <Header {...props} >
          {child.props.children || child.props.title}
        </Header>
      )

    })

    let data = this.props.data.filter((row) => {
      for (let i = 0, keys = Object.keys(this.state.search), j = keys.length; i < j; i++) {
        let [field,value] = [keys[i], this.state.search[keys[i]]]
        if (value && row[field].toString().toLowerCase().indexOf(value.toString().toLowerCase()) === -1) {
          return false
        }
      }
      return true
    })

    if (self.pagination) {

      Paginator = React.cloneElement(self.pagination, {
        handleSelect: self.handleSelect,
        activePage: self.state.pagination.activePage,
        items: Math.ceil(data.length / this.state.pagination.itemPerPage)
      })

    }


    let body = [];

    data = data.sort((a, b) => {
      if (a[this.state.sort.field] < b[this.state.sort.field]) {
        return this.state.sort.asc ? -1 : 1
      }

      if (a[this.state.sort.field] > b[this.state.sort.field]) {
        return this.state.sort.asc ? 1 : -1
      }
      return 0;
    })

    let start = 0
    let end = data.length


    if (Paginator) {
      start = (this.state.pagination.activePage - 1) * this.state.pagination.itemPerPage;
      end = start + this.state.pagination.itemPerPage;
    }

    for (let i = start, j = end; i < j; i++) {
      let row = data[i];

      body.push(<tr key={'row'+i}>{
        children.map((child, i) => {
          if (!row) {
            return (<td key={i}><span style={{opacity : 0}}>N/A</span></td>)
          }
          let text = row[child.props.field];
          if (child.props.transform) {
            text = child.props.transform(text, row, i)
          }
          return (
            <td key={i}  style={{verticalAlign: 'middle'}} >{text}</td>
          )
        })}
      </tr>)


    }

    let headerStyle = {}
    switch (this.props.dtStyle) {
      case 'dark':
        headerStyle = {
          backgroundColor: '#6c828b',
          color: '#FFF'
        }
        break;

    }
    return (
      <Row>
        <Table striped bordered condensed hover>
          <thead style={headerStyle}>
          <tr>
            {headers}
          </tr>
          </thead>
          <tbody>
          {body}
          </tbody>
        </Table>

        <div style={{marginTop: '-20px', textAlign: 'center'}}>
          {Paginator}
        </div>
      </Row>
    )
  }
}

export default DataTable