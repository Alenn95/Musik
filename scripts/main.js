Vue.createApp({
    data() {
        return {
            pagina: "home",
            tracks:"",
            player:"",
            device_id:""

        }
    },

    created() {
		

    },
    mounted() {

		let searchB = document.getElementById('s-button')
		let search = document.getElementById('search')

		searchB.addEventListener('click',()=>{
			
			let song = search.value.replace(/\s/g, '%20')
			console.log(song)

			const options = {
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': '7df59f583fmshebd943cc0215877p117054jsncaa72e84bd61',
					'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
				}
			};
			
			fetch(`https://spotify23.p.rapidapi.com/search/?q=${song}&type=multi&offset=0&limit=10&numberOfTopResults=5`, options)
			.then(response => response.json())
			.then(response => {
                console.log(response)
				
				this.tracks = response.tracks.items

			})
			.catch(err => console.error(err));

		})

		window.onSpotifyWebPlaybackSDKReady = () => {
            const token = 'BQBg0fs10nH-QPe8-pw9N94AomUGp-tcZWfcEmpFTWHoaton7xFxmsZOoBKv0iDUlDpWzxTdoGWfbrRxdZ1y0pJ9YzQZW6YFZ3g9hKMtRdaDkhpY3R9ZZHfrQFI8oiGtBClMVp2LKMoLa8PSoW-YP2EdFiTtff9Gl6ow1cFyKJF-R-tb4gW8U0_96daPWpJ87q7rg72rQ4H7Svo7EDdEVHbRukw';
            const player = new Spotify.Player({
                name: 'Web Playback SDK Quick Start Player',
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });

            this.player = player

            // Ready
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                this.device_id = device_id

            });

            // Not Ready
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('initialization_error', ({ message }) => {
                console.error(message);
            });

            player.addListener('authentication_error', ({ message }) => {
                console.error(message);
            });

            player.addListener('account_error', ({ message }) => {
                console.error(message);
            });

            document.getElementById('togglePlay').onclick = function() {
              player.togglePlay();
            };

            

            player.connect();
        }

		


    },

    methods: {
      play: function({
        spotify_uri,
        playerInstance: {
          _options: {
            getOAuthToken,
          }
        }
        }){
        getOAuthToken(access_token => {
          fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.device_id}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [spotify_uri] }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`
            },
          });
        });
      },
      

    },

    computed: {

    }
}).mount('#app')























	

	
