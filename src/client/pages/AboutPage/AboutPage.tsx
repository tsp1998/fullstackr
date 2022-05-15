import React, { Component } from 'react'
//models
import * as AboutPageModels from './AboutPage.models'

export class AboutPage extends Component<AboutPageModels.AboutPagePropsModel, AboutPageModels.AboutPageStateModel> {
  constructor(props: AboutPageModels.AboutPagePropsModel) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        Hello from about page
      </div>
    )
  }
}

export default AboutPage