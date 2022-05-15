import React, { Component } from 'react'
//models
import * as IndexPageModels from './IndexPage.models'
//styles
import * as IndexPageStyles from './IndexPage.styles'
//components
import List from '../../components/common/List/List'
import ListWithFetch from '../../components/common/List/ListWithFetch'
import Table from '../../components/common/Table/Table'

export class IndexPage extends Component<IndexPageModels.IndexPagePropsModel, IndexPageModels.IndexPageStateModel> {
  constructor(props: IndexPageModels.IndexPagePropsModel) {
    super(props);
    this.state = {

    }
  }

  rows = [
    ['Shubham', 24],
    ['Saurabh', 25],
    ['Akshay', 22],
  ]

  render() {
    return (
      <IndexPageStyles.IndexPageStyled>
        <List
          heading='Project List'
          items={[<h1>Hello</h1>, <h2>World</h2>]}
        />
        <ListWithFetch
          heading='Users List'
          api='http://localhost:8080/api/users'
          dataPropName='name'
        />
        <div style={{ display: 'flex' }}>
          <Table
            headingRows={[['name', 'age']]}
            rows={this.rows}
          />
          <Table
            headingRows={[['action']]}
            rows={[...new Array(this.rows.length)].map((_, i) => (
              [<button onClick={() => console.log(i)}>Delete</button>]
            ))}
          />
        </div>
      </IndexPageStyles.IndexPageStyled>
    )
  }
}

export default IndexPage