import {combineReducers} from 'redux';
import create from './create.reducer';
import playlist from './playlist.reducer';
import player from './player.reducer';
import map from './map.reducer';

export default combineReducers({
  create,
  playlist,
  player,
  map
});