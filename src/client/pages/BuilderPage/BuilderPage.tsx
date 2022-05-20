import React, { Component } from 'react'
import { BuilderPagePropsModel, BuilderPageStateModel } from './BuilderPage.models'
import * as BuilderPageStyles from './BuilderPage.styles'
//components
import BackendBuilder from '../../components/BackendBuilder/BackendBuilder'
import FrontendBuilder from '../../components/FrontendBuilder/FrontendBuilder'
import Redirect from '../../components/Redirect/Redirect'
//api
import restApi from '../../apis/rest'
import { API } from '../../constants/api.constants'
import Button from '../../components/common/Button/Button'

export class BuilderPage extends Component<BuilderPagePropsModel, BuilderPageStateModel> {
  constructor(props: BuilderPagePropsModel) {
    super(props)
    this.state = {
      redirectPath: '',
      errorMessage: '',
      projectId: ''
    }
  }


  checkProjectExists = async () => {
    try {
      const projectId = window.location.pathname.slice(1)
      const response = await restApi('get', { api: `${API}/project/${projectId}` })
      if (response.status === 'error') {
        throw new Error('Invalid project id');
      }
      this.setState({ projectId })
    } catch (error) {
      this.setState({ errorMessage: (error as Error).message })
    }
  }

  componentDidMount = async () => {
    await this.checkProjectExists()
  }

  goBack = () => {
    this.setState({ redirectPath: '/' })
  }

  render(): JSX.Element {
    const { redirectPath, errorMessage, projectId } = this.state;
    return (
      <BuilderPageStyles.BuilderPageStyled>
        <Redirect redirectPath={redirectPath} />
        {errorMessage ? (
          <>
            <div style={{ color: 'red' }}>{errorMessage}</div>
            <Button onClick={this.goBack}>Go Back</Button>
          </>
        ) : (
          <>
            <h3>Project Name: {projectId.slice(0, projectId.indexOf('-'))}</h3>
            <h3>Project Id: {projectId}</h3>
            <BackendBuilder style={{ marginBottom: '1rem' }} />
            <FrontendBuilder />
          </>
        )}
      </BuilderPageStyles.BuilderPageStyled>
    )
  }
}

export default BuilderPage