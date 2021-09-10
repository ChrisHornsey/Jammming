import React from 'react';
import './Track.css';

export class Track extends React.Component {

    render(){
        return(
            <div className="Track">
  <div className="Track-information">
    <h3>{this.props.trackName}</h3>
    <p>{this.props.trackArtist} | {this.props.trackAlbum}</p>
  </div>
  <button className="Track-action">{this.props.isRemoval ? '+' : '-'}</button>
</div>
        )
    }
}