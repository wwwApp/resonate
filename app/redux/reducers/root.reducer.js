import {combineReducers} from 'redux';
import spotify from './spotify.reducer';
import playlist from './playlist.reducer';
import player from './player.reducer';
import map from './map.reducer';

export default combineReducers({
  spotify,
  playlist,
  player,
  map
});