import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
//models
import * as IndexPageModels from './IndexPage.models'
//styles
import * as IndexPageStyles from './IndexPage.styles'
//components
import List from '../../components/common/List/List'
import Redirect from '../../components/Redirect/Redirect'
// import Specifier from '../../components/Specifier/Specifier'
import Form from '../../components/common/Form/Form'
//api
import { API } from '../../constants/api.constants'
import restApi from '../../apis/rest'

//components
import Select from '../../components/common/Select/Select'
import Button from '../../components/common/Button/Button'
import Tester from '../../Tester'

export class IndexPage extends Component<IndexPageModels.IndexPagePropsModel, IndexPageModels.IndexPageStateModel> {
  constructor(props: IndexPageModels.IndexPagePropsModel) {
    super(props);
    this.state = {
      projects: [],
      selectedProject: '',
      redirectPath: ''
    }
  }

  componentDidMount = async () => {
    try {
      const { data: projectsIds = [] } = await restApi('get', { api: `${API}/projects` });
      this.setState({
        projects: (projectsIds as Array<string>).map(projectId => {
          const projectName = projectId.slice(0, projectId.indexOf('-'));
          return { text: projectName, value: projectId }
        })
      })
    } catch (error) {
      console.log(`error`, error)
    }
  }

  loadProject = () => {
    this.setState({ redirectPath: this.state.selectedProject })
  }

  onApiTrigger = async (apiRequest: Promise<APITypes.ResponseModel>) => {
    try {
      const response = await apiRequest
      if (response.status === 'error') {
        throw new Error((response.data as any).message)
      }
      const {projectId} = response.data as {projectId: string}
      const projectName = projectId.slice(0, projectId.indexOf('-'));
      this.setState({projects: [...this.state.projects, {
        text: projectName, value: projectId
      }]})
    } catch (error) {
      console.log(`error`, error)
    }
  }

  render() {
    const { redirectPath = '' } = this.state;
    return (
      <IndexPageStyles.IndexPageStyled>
        <Redirect redirectPath={redirectPath} />
        <Select
          options={this.state.projects}
          id="project"
          defaultOptionText='Select Project'
          changeHandler={value => this.setState({ selectedProject: value })}
        />
        <Button onClick={this.loadProject}>Load Project</Button>
        <Form
          formSchema={{
            inputs: [
              { id: 'projectName', label: 'Project Name' }
            ],
            buttons: [{ children: 'Create Project', type: 'submit' }]
          }}
          api={`${API}/create-project`}
          onApiTrigger={this.onApiTrigger}
          wantMessage={true}
        />
        {/* <Tester /> */}
      </IndexPageStyles.IndexPageStyled>
    )
  }
}

export default IndexPage