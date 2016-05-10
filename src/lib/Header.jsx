import React from 'react'
import ReactDom from 'react-dom'
import { Row,Col, Glyphicon, Overlay ,Popover, Input as Search} from 'react-bootstrap'

class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showSearch: false
    }
  }

  showSearch = (evt)=> {
    this.setState({
      showSearch: true
    })
  }

  hideSearch = () => {
    this.setState({
      showSearch: false
    })

  }

  onSearchShowed = () => {
    if (!ReactDOM) {
      var ReactDOM = require('react-dom')
    }
    ReactDOM.findDOMNode(this.refs.searchInput).focus()
  }

  handleInput = (evt) => {
    if (evt.keyCode == 13) {
      this.hideSearch()
    }
  }

  getSearchOverlay = () => {
    return ReactDom.findDOMNode(this.refs['search-icon'])
  }

  
  render() {
    let self = this
    let iconsStyles = {
      sort: '#000',
      search: '#000'
    }
    switch (this.props.dtStyle) {
      case 'dark':
        iconsStyles = {
          sort: '#FFF',
          search: '#FFF'
        }
        break;

    }


    let sortIcons = (
      <div style={{width: '1px', height: '23px',float: 'right', marginRight: '2px'}}></div>
    ), searchIcon = '';
    if (this.props.sortable) {
      let isSortField = this.props.isSortField;
      sortIcons = (
        <span style={{display:'inline-block'}}>
          <span
            style={{fontSize: '10px', display: 'block',opacity: (isSortField && this.props.asc)?'1':'0.3',color: iconsStyles.sort, marginBottom: '-5px' }}>
            <Glyphicon glyph='triangle-top'/>
          </span>
          <span
            style={{fontSize: '10px', display:'block',opacity: (isSortField && !this.props.asc)?'1':'0.3',color: iconsStyles.sort, marginTop: '-5px' }}>
            <Glyphicon glyph='triangle-bottom'/>
          </span>
        </span>
      )
    }

    if (this.props.searchable) {

      let options = null
      if (this.props.searchOptions && this.props.searchOptions.options) {

        options = this.props.searchOptions.options.map(select => {
          return <option key={select.value} value={select.value}>{select.title}</option>
        })

        options.unshift(<option key="SELECT..." value="">Select...</option>)
      }


      searchIcon = (
        <span>
          <Glyphicon ref="search-icon" glyph='filter'
                     onClick={this.showSearch}
            />
          <Overlay placement="left" rootClose target={this.getSearchOverlay}
                   show={this.state.showSearch} onHide={this.hideSearch} onEnter={this.onSearchShowed}
            >
            <Popover id={'search_'+this.props.field} title="Search">
              <Search type={options?"select":"text"} ref="searchInput" placeholder="Search text"
                      value={this.props.currentSearch}
                      onChange={this.props.onSearch(this.props.field)}
                      onKeyDown={this.handleInput}
                >
                {options}
              </Search>
            </Popover>
          </Overlay>
        </span>

      )
    }


    return (
      <th className={this.props.md?`col-md-${this.props.md}`:''  }
          style={{cursor: 'pointer',verticalAlign: 'middle'}}>
        <div style={{position: 'relative'}}>
          <div style={{marginRight: this.props.searchable?'25px':0}}
               onClick={this.props.onSort(this.props.field,this.props.sortable)}>
            {this.props.children}
            <span style={{float: 'right', marginRight: '2px'}}>
               {sortIcons}
             </span>
          </div>
          <div style={{position: 'absolute', right: 0, top : 0}}>
              <span
                style={{fontSize: '17px',marginTop: '3px',color:iconsStyles.search, opacity: this.props.currentSearch?1:0.3}}>
                 {searchIcon}
               </span>
          </div>
        </div>
      </th>
    )
  }
}

export default Header