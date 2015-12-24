# react-bootstrap-datatable

DataTable module using react and react-bootstrap

## Installation

  npm install scapegoat --save

## Usage

      import {DataTable, DataColumn} from 'react-bootstrap-datatable'

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
          return(
            <DataTable data={this.dataObject}>
              <DataColumn title="ID" key="id" sortable={true} searchable={false} md={2} />
              <DataColumn title="Name" key="name" sortable={true} searchable={true} md={8}  >
                Title as Children too
              </DataColumn>
              <DataColumn title="Price" key="price" transform={this.transform} sortable={true} md={2} searchable={false}  />
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