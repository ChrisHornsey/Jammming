import React from 'react';
import './TrackList.css';
import { Track } from '../Track/Track';


export class TrackList extends React.Component {

    render(){
        return(
            <div className="TrackList">
    <Track isRemoval = {true} trackName = "Test name 1" trackArtist = "Test Artist 1" trackAlbum = "Test Album 1"/>
    <Track isRemoval = {true} trackName = "Test name 2" trackArtist = "Test Artist 2" trackAlbum = "Test Album 2"/>
    <Track isRemoval = {true} trackName = "Test name 3" trackArtist = "Test Artist 3" trackAlbum = "Test Album 3"/>
</div>
        )
    }
}