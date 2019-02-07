import {combineReducers} from 'redux';
import test from './test.reducer';
import playlist from './playlist.reducer';

export default combineReducers({
  test,
  playlist
});