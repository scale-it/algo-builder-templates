import { createStore } from 'redux';
import reducers from './reducer/reducer';

const store = createStore(reducers);

export default store;
