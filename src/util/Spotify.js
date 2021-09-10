
let accessToken;

const clientID = "330ded410a704dab8576c48fba6e3fa4";

const redirectURI = "http://localhost:3000/";

const Spotify = {
    getAccessToken(){
        if (accessToken){
            return accessToken
        } else {

            const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
            const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

            if (accessTokenMatch && expiresInMatch){

                console.log("I have an access token")

                console.log(accessTokenMatch);

                accessToken = accessTokenMatch[1];
                const expiresIn = Number(expiresInMatch[1]);

                window.setTimeout(() => accessToken = '', expiresIn * 1000);
                window.history.pushState('Access Token', null, '/');

                return accessToken;

                
            }     else {
                window.location = "https://accounts.spotify.com/authorize?client_id="+clientID+"&response_type=token&scope=playlist-modify-public&redirect_uri="+redirectURI
            }     
        }
    },

     search(term){
        const accessToken = Spotify.getAccessToken();

        console.log(accessToken);

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {

            console.log("I'm doing this");

            console.log(jsonResponse)
            if (!jsonResponse.tracks){
                return []
            }
            const tracks = jsonResponse.tracks.items.map(x => {
                let track = {

                id: x.id,
                name: x.name,
                artist: x.artists[0].name,
                album: x.album.name,
                uri: x.uri
                }

                return track;
            })

            console.log(tracks);

            return tracks;
                
            });
                
        },

        savePlaylist(name, trackURIs) {

            if (name && trackURIs) {
                const accessToken = Spotify.getAccessToken();
                const headers = {
                    Authorization: `Bearer ${accessToken}`
                };
                let ID;

               return fetch("https://api.spotify.com/v1/me",{headers : headers}).then(response => response.json()).then(jsonResponse => {
                    ID = jsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/users/${ID}/playlists`,{
                        headers : headers,
                        method: "POST",
                        body: JSON.stringify({name: name})
                    } ).then(response => response.json()).then(jsonResponse => {
                        const playlistID = jsonResponse.id;
                        return fetch(`https://api.spotify.com/v1/users/${ID}/playlists/${playlistID}/tracks`,{
                            headers : headers,
                            method: "POST",
                            body: JSON.stringify({uris: trackURIs})
                        }).then(response => {
                            console.log(response);
                            return
                        })
                    })
            })



            } else {
                return;
            }

        }
    };

export default Spotify;