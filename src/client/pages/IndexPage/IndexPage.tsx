import React, { Component } from 'react'
//models
import * as IndexPageModels from './IndexPage.models'
//styles
import * as IndexPageStyles from './IndexPage.styles'
//components
import List from '../../components/common/List/List'
// import Specifier from '../../components/Specifier/Specifier'
import BackendBuilder from '../../components/BackendBuilder/BackendBuilder'


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
          items={[]}
        />
        <BackendBuilder />
      </IndexPageStyles.IndexPageStyled>
    )
  }
}

export default IndexPage