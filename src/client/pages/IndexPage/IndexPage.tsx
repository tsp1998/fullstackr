import React, { Component } from 'react'
//models
import * as IndexPageModels from './IndexPage.models'
//styles
import * as IndexPageStyles from './IndexPage.styles'
//components
import List from '../../components/common/List/List'
import ListWithFetch from '../../components/common/List/ListWithFetch'

export class IndexPage extends Component<IndexPageModels.IndexPagePropsModel, IndexPageModels.IndexPageStateModel> {
  constructor(props: IndexPageModels.IndexPagePropsModel) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <IndexPageStyles.IndexPageStyled>
        <List
          heading='Project List'
          items={[{ data: 'abc' }, { data: 'pqr' }]}
        />
        <ListWithFetch />
      </IndexPageStyles.IndexPageStyled>
    )
  }
}

export default IndexPage