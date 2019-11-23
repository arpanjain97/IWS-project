import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const options = [
  { key: 1, text: '250k', value: 250000 },
  { key: 2, text: '500k', value: 500000 },
  { key: 1, text: '1M', value: 1000000 },
  { key: 2, text: '1M+', value: 1000001 },
  
]

const Hometypes = () => (
  <Dropdown clearable options={options} fluid
  selection
  multiple={false}
 placeholder="Budget 0-" />
)

export default Hometypes