import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const options = [
  { key: 1, text: '1', value: 1 },
  { key: 2, text: '2', value: 2 },
  { key: 3, text: '3', value: 3 },{ key: 4, text: '4', value: 4 },
  { key: 5, text: '4+', value: 5 },
]

const Beds = () => (
  <Dropdown clearable options={options}
  color="black" 
  multiple
  search
  selection placeholder="Number of Bedrooms" />
)

export default Beds