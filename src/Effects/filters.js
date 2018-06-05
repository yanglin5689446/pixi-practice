
import * as PIXI from 'pixi.js'

import { OutlineFilter } from '@pixi/filter-outline';

const filters = {}

function setup_filters(){
  filters['green_outline_filter'] = new OutlineFilter(5, 0x81C784)
  filters['red_outline_filter'] = new OutlineFilter(5, 0xF44336)
}


export { filters, setup_filters }