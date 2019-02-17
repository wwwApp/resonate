import {combineReducers} from 'redux';
import test from './test.reducer';
import playlist from './playlist.reducer';
import player from './player.reducer';

export default combineReducers({
  test,
  playlist,
  player
});