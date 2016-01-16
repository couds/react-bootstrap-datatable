# react-bootstrap-datatable

DataTable module using react and react-bootstrap

## Installation

  npm i --save react-bootstrap-datatable

## Usage

      import {DataTable, DataColumn, Pagination} from 'react-bootstrap-datatable'

      class Products extends React.Component{
        constructor(){
          this.dataObject = [
            {
              id: 1,
              name: 'NodeJS',
              price : "10.0"
            },
            {
              id: 2,
              name: 'React',
              price : "15.0"
            }
          ]
        }
        
        transform = (row, value) => {
          return `$ ${value}`
        }
      
        render(){
        
          let typesOptions = {
            caseSensitive : false,//False by default
            options : [
              {
                value : 'android',
                title: 'Android'
              },
              {
                value : 'ios',
                title: 'Apple'
              },
              {
                value : 'windows',
                title: 'Windows Phone'
              }
            ]
          }
          
          return(
            <DataTable data={this.dataObject}>
              <DataColumn title="ID" key="id" sortable={true} searchable={false} md={2} />
              <DataColumn title="Name" key="name" sortable={true} searchable={true} md={8}  >
                Title as Children too
              </DataColumn>
              <DataColumn title="Price" key="price" transform={this.transform} sortable={true} md={2} searchable={false}  />
              <DataColumn title="Type" key="type" md={2} searchable={false}  searchOptions={typesOptions} />
              <Pagination maxButtons={3} itemPerPage={10} />
            </DataTable>  
          )
        }
      }

  
  
  
  
  

## Tests

  No test implemented yet

## Contributing



## Release History

* 0.0.1 Initial release
* 0.0.2 Bug Fix sorting no string columns, Bug Fix multi-column search
* 0.0.3 Move react dependency to peerDependencies to avoid problems with the react version
* 0.0.4 Allow combobox in column search
* 0.0.5 add Styles to datatable dtStyle=[default, dark]
* 0.0.6 bug fix: set current page to 1 when starting a search
* 0.0.7 bug fix: configuration problem

