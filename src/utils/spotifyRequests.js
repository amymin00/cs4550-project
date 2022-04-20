// import 'dotenv-webpack/config';
import axios from 'axios';
// import qs from 'qs';

const spotifyAuth = async () => {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
    // const auth_token = btoa(`${clientId}:${clientSecret}`);
    console.log(`client id: ${clientId}`);
    console.log(`client secret: ${clientSecret}`);
    const DEFAULT_TOKEN = 'BQBphedjijY_PDBKjbqvCn1Ja0qL-csRWFY7FuiopPBJ7Lhkb6TBX9Qa9vacL5PiAnxAQY1HHyy7dWS5CrGCtez0N655aj4QBelIynGcjM0FlsBn9VetNPDH37Btt-dQ-BnmYcVWqPdVVVKO7Q';

    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
          'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret).toString('base64')
        },
        form: {
          grant_type: 'client_credentials'
        },
        json: true
      };
      
    // request.post(authOptions, function(error, response, body) {
    //     if (!error && response.statusCode === 200) {
    //         var token = body.access_token;
    //     }
    // });

    const headers = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: clientId,
          password: clientSecret,
        },
    };
    const data = {
        grant_type: 'client_credentials',
    };

    try {
        const response = await axios.post(
            'http://accounts.spotify.com/api/token',
            // qs.stringify(data),
            authOptions // headers
        );

        console.log(`got access token: ${response.data.access_token}`);   
        return response.data.access_token;
    } catch (error) {
        console.log(`failed to obtain access token: ${error}`);
        return DEFAULT_TOKEN;
    }

    // try {
    //     // make post request to REACT_APP_SPOTIFY API for access token, sending relavent info
    //     const token_url = 'https://accounts.spotify.com/api/token';
    //     const data = 'grant_type=client_credentials';
    
    //     const response = await axios.post(token_url, data, {
    //             headers: { 
    //                 'Authorization': `Basic ${auth_token}`,
    //                 'Content-Type': 'application/x-www-form-urlencoded' 
    //             }
    //         })
        
    //     console.log(`got access token: ${response.data.access_token}`);   
    //     return response.data.access_token;
    // } catch(error) {
    //     console.log(`failed to obtain access token, error message: ${error}`);
    // }
}

export async function searchForSongs(query) {
    // request token
    const access_token = await spotifyAuth();
    console.log(`received access token ${access_token}`);

    const parsed_query = query.toLowerCase().replaceAll(' ', '%20');

    const api_url = `http://api.spotify.com/v1/search?q=${parsed_query}&type=track`;
    console.log(`api get url: ${api_url}`);

    try {
        const response = await axios.get(api_url, {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });

        console.log(`GET response: ${response.data}`);
        return response.data;
    } catch(error) {
        console.log(`GET failed: ${error}`);
    }  
};