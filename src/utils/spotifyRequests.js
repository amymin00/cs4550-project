import axios from 'axios';
import qs from 'qs';

const spotifyAuth = async () => {
    const clientId = process.env.REACT_APP_CLIENT_ID_AUTH_CONFIG;
    const clientSecret = process.env.REACT_APP_CLIENT_SECRET_AUTH_CONFIG;
    // const auth_token = btoa(`${clientId}:${clientSecret}`);
    console.log(`client id: ${clientId}`);
    console.log(`client secret: ${clientSecret}`);

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
            'http://accounts.spotify.com/api/token/',
            qs.stringify(data),
            headers
        );

        console.log(`got access token: ${response.data.access_token}`);   
        return response.data.access_token;
    } catch (error) {
        console.log(`failed to obtain access token: ${error}`);
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

    // const parsed_query = query.toLowerCase().replaceAll(' ', '%20');

    // const api_url = `http://api.spotify.com/v1/search?q=${parsed_query}&type=track`;
    // console.log(`api get url: ${api_url}`);

    // try {
    //     const response = await axios.get(api_url, {
    //             headers: {
    //                 'Authorization': `Bearer ${access_token}`,
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //             }
    //         });

    //     console.log(`GET response: ${response.data}`);
    //     return response.data;
    // } catch(error) {
    //     console.log(`GET failed: ${error}`);
    // }  
};