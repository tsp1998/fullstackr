import React, { FunctionComponent } from 'react'
import { Card, List, ListWithFetch, Table, Textarea } from './components/common'

const Tester: FunctionComponent<{}> = (props): JSX.Element => {
  return (
    <div>
      <Card
        heading={<h3>This is heading</h3>}
        footer={<h3>This is footer</h3>}
      >
        <h3>This is body</h3>
      </Card>
      <List heading='List' items={['item1', 'item2', 'item3',]} />
      <Table rows={[[1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3]]} headingRows={[[1,2,3]]} />
      <Textarea />
    </div>
  )
}

export default Tester