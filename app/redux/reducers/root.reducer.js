import {combineReducers} from 'redux';
import home from './home.reducer';
import create from './create.reducer';
import playlist from './playlist.reducer';
import player from './player.reducer';
import map from './map.reducer';
import user from './user.reducer';

export default combineReducers({
  home,
  create,
  playlist,
  player,
  user,
  map,
});