import { EventEmitter } from 'node:events'
import addNewOrder from '../utils/addNewOrder.js'

export const orderEvents = new EventEmitter()

orderEvents.on('order-made', addNewOrder)