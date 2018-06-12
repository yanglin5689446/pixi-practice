
import * as PIXI from 'pixi.js'

import { OutlineFilter } from '@pixi/filter-outline';
import { AdjustmentFilter } from '@pixi/filter-adjustment';


const filters = {}

function setup_filters(){
  filters['green_outline_filter'] = new OutlineFilter(5, 0x81C784)
  filters['red_outline_filter'] = new OutlineFilter(5, 0xF44336)
  filters['attacked_filter'] = new AdjustmentFilter(1, 1, 1, 1, 5, 1, 1, 1)
}


export { filters, setup_filters }