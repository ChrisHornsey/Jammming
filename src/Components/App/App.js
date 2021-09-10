import React from "react";
import './App.css';
import {SearchBar} from "../SearchBar/SearchBar";
import {Playlist} from "../Playlist/Playlist";
import { SearchResults } from "../SearchResults/SearchResults";

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults : [{
        id : 1, 
        name : "Test track name", 
        artist : "Test artist", 
        album : "Test album"
      }], 
      playlistName : "Test playlist name", 
      playlistTracks : [{
        id : 2, 
        name : "Test playlist track name", 
        artist : "Test playlist artist", 
        album : "Test playlist album"}]}

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this); 
        this.updatePlaylistName = this.updatePlaylistName.bind(this); 
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
      }

      updatePlaylistName(name) {
        this.setState({playlistName : name});
      }

      search(term){
        console.log(term);
      }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }

    let playlist = this.state.playlistTracks;

    playlist.push(track);

    this.setState({playlistTracks : playlist})
  }

  removeTrack(track) {
    let playlist = this.state.playlistTracks;

    playlist.splice(playlist.findIndex(x => x.id === track.id),1);

    this.setState({playlistTracks:playlist})
  }

  savePlaylist(){
    const trackURIs = this.state.playlistTracks.map(x => x.uri);
  }

  render() {
    return (
      <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar onSearch = {this.search}/>
    <div className="App-playlist">
      <SearchResults onAdd = {this.addTrack} searchResults = {this.state.searchResults}/>
      <Playlist onSave = {this.savePlaylist} onNameChange = {this.updatePlaylistName} onRemove = {this.removeTrack} playlistName = {this.state.playlistName} playlistTracks = {this.state.playlistTracks}/>
    </div>
  </div>
</div>
    )
  }
}
