// Step 1: Redirect the user to the OpenID Connect Provider
window.location = "https://id-sandbox.cashtoken.africa/oauth/authorize?audience=https://id-sandbox.cashtoken.africa&client_id=wprQYMZBqqx-dgszFUfQG&redirect_uri=http://localhost:3000/callback&response_type=code&code_challenge_methods_supported=S256";
/* "https://id-sandbox.cashtoken.africa/oauth/authorize?client_id=wprQYMZBqqx-dgszFUfQG&redirect_uri=http://localhost:3000/callback&response_type=code"; */

// Step 2: The OpenID Connect Provider will redirect the user back to your application with an authorization code
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');

// Step 3: Exchange the authorization code for an access token 
fetch("https://id-sandbox.cashtoken.africa/oauth/token", { 
    method: 'POST', 
    body: `client_id=wprQYMZBqqx-dgszFUfQG&redirect_uri=http://localhost:3000/callback&grant_type=authorization_code&code=${code}` 
}) 
    .then(response => response.json()) 
    .then(data => { 

        // Step 4: Use the access token to make authenticated API requests 

        fetch("https://id-sandbox.cashtoken.africa/oauth/api/userinfo", { 
            headers: { Authorization: `Bearer ${data.access_token}` } 
        }) 

            .then(response => response.json()) 

            .then(userInfo => {  

                // Do something with the user info  
                console.log('userinfo', userInfo)

            });  

    });