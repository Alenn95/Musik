Vue.createApp({
    data() {
        return {
            pagina: "home",
			tracks:"",

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
				
				this.tracks = response.tracks.items

			})
			.catch(err => console.error(err));

		})

		window.onSpotifyWebPlaybackSDKReady = () => {
            const token = 'BQBmJ6KlUjdrIyKuRkGnh6cSQ-aaGHS1V0O3ijuoCqBbi6ihh-64UA2FvMp-0gKtgTLaRJ4H7yls4vICZUv6eei3uPKhLsFEo83ayz7QbtPmzJVFUEGHjcsZ0zzPIGP0XO8_bcAIw65ve2h6MBCvh_s8xDqA94wRfZkzGX6mlJIDdGIuCF6xm2TXDRHs5LASTgc6bagKOu6Ac5DqL-YpCRA3_kg';
            const player = new Spotify.Player({
                name: 'Web Playback SDK Quick Start Player',
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });

            console.log(player)

            // Ready
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
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

    },

    computed: {

    }
}).mount('#app')