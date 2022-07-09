const app = Vue.createApp({
    data() {
        return {
            pagina: "Musik",
            recording: "off",
            audioApiResponse: "",
            spotifyLink: "",
            tracks: "",
            player: "",
            device_id: "",
            user:"",
            currentUserID:"",
            userEmail:"",
            userPhoto:"",
            userName:"",
            favorites:[],
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

        // window.onSpotifyWebPlaybackSDKReady = () => {
        //     const token = 'BQBg0fs10nH-QPe8-pw9N94AomUGp-tcZWfcEmpFTWHoaton7xFxmsZOoBKv0iDUlDpWzxTdoGWfbrRxdZ1y0pJ9YzQZW6YFZ3g9hKMtRdaDkhpY3R9ZZHfrQFI8oiGtBClMVp2LKMoLa8PSoW-YP2EdFiTtff9Gl6ow1cFyKJF-R-tb4gW8U0_96daPWpJ87q7rg72rQ4H7Svo7EDdEVHbRukw';
        //     const player = new Spotify.Player({
        //         name: 'Web Playback SDK Quick Start Player',
        //         getOAuthToken: cb => { cb(token); },
        //         volume: 0.5
        //     });

        //     this.player = player

        //     // Ready
        //     player.addListener('ready', ({ device_id }) => {
        //         console.log('Ready with Device ID', device_id);
        //         this.device_id = device_id

        //     });

        //     // Not Ready
        //     player.addListener('not_ready', ({ device_id }) => {
        //         console.log('Device ID has gone offline', device_id);
        //     });

        //     player.addListener('initialization_error', ({ message }) => {
        //         console.error(message);
        //     });

        //     player.addListener('authentication_error', ({ message }) => {
        //         console.error(message);
        //     });

        //     player.addListener('account_error', ({ message }) => {
        //         console.error(message);
        //     });

        //     document.getElementById('togglePlay').onclick = function() {
        //       player.togglePlay();
        //     };



        //     player.connect();
        // };

        window.onload = function () {
            firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                document.getElementById('quickstart-sign-in-google');
                document.getElementById('quickstart-sign-in').textContent = 'Sign out';
              } else {
                document.getElementById('quickstart-sign-in-google');
                document.getElementById('quickstart-sign-in');
              }
              document.getElementById('quickstart-sign-in-google').disabled = false;
              document.getElementById('quickstart-sign-in').disabled = false;
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
        };

        // window.onload = function () {
        //     firebase.auth().onAuthStateChanged((user) => {
        //       if (user) {
        //         var displayName = user.displayName;
        //         var email = user.email;
        //         var emailVerified = user.emailVerified;
        //         var photoURL = user.photoURL;
        //         var isAnonymous = user.isAnonymous;
        //         var uid = user.uid;
        //         var providerData = user.providerData;
        //         document.getElementById('quickstart-sign-in-google').textContent = 'Sign out';
        //         document.getElementById('quickstart-sign-in').textContent = 'Sign out';
        //       } else {
        //         document.getElementById('quickstart-sign-in-google').textContent = 'Sign in with Google';
        //         document.getElementById('quickstart-sign-in').textContent = 'Sign in';
        //       }
        //       document.getElementById('quickstart-sign-in-google').disabled = false;
        //       document.getElementById('quickstart-sign-in').disabled = false;
        //     });
      
        //   }

    },

    methods: {

        searchSongs: function(){
            let search = document.getElementById('search')
            let song = search.value.replace(/\s/g, '%20')
        	console.log(song)
            
            if(song){
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
    
                    if(search.value){
                        this.tracks = response.tracks.items
                    }
                    else{
                        this.tracks = []
                    }
                })
                .catch(err => console.error(err));
            }
            else{
                this.tracks = []
            }
        	
        },


        play: function ({
            spotify_uri,
            playerInstance: {
                _options: {
                    getOAuthToken,
                }
            }
        }) {
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

        // toggleSignIn: function () {
        //     if (!firebase.auth().currentUser) {
        //         var provider = new firebase.auth.GoogleAuthProvider();
        //         provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        //         firebase.auth().signInWithPopup(provider).then(function (result) {
        //             // This gives you a Google Access Token. You can use it to access the Google API.
        //             var token = result.credential.accessToken;
        //             // The signed-in user info.
        //             var user = result.user;
        //         }).catch(function (error) {
        //             // Handle Errors here.
        //             var errorCode = error.code;
        //             var errorMessage = error.message;
        //             // The email of the user's account used.
        //             var email = error.email;
        //             // The firebase.auth.AuthCredential type that was used.
        //             var credential = error.credential;
        //             if (errorCode === 'auth/account-exists-with-different-credential') {
        //                 alert('You have already signed up with a different auth provider for that email.');
        //                 // If you are using multiple auth providers on your app you should handle linking
        //                 // the user's accounts here.
        //             } else {
        //                 console.error(error);
        //             }
        //         });
        //     } else {
        //         firebase.auth().signOut();
        //     }
        //     document.getElementById('quickstart-sign-in-google').disabled = true;
        // },


        // toggleSignInMail: function () {
        //     if (firebase.auth().currentUser) {
        //         firebase.auth().signOut();
        //     } else {
        //         var email = document.getElementById('email').value;
        //         var password = document.getElementById('password').value;
        //         if (email.length < 4) {
        //             alert('Please enter an email address.');
        //             return;
        //         }
        //         if (password.length < 4) {
        //             alert('Please enter a password.');
        //             return;
        //         }
        //         // Sign in with email and pass.
        //         firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        //             // Handle Errors here.
        //             var errorCode = error.code;
        //             var errorMessage = error.message;
        //             if (errorCode === 'auth/wrong-password') {
        //                 alert('Wrong password.');
        //             } else {
        //                 alert(errorMessage);
        //             }
        //             console.log(error);
        //             document.getElementById('quickstart-sign-in').disabled = false;
        //         });
        //     }
        //     document.getElementById('quickstart-sign-in').disabled = true;
        // },

        // //BOTON DE RESGISTRO CON MAIL 

        // handleSignUp: function () {
        //     var email = document.getElementById('email').value;
        //     var password = document.getElementById('password').value;
        //     if (email.length < 4) {
        //         alert('Please enter an email address.');
        //         return;
        //     }
        //     if (password.length < 4) {
        //         alert('Please enter a password.');
        //         return;
        //     }
        //     firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        //         var errorCode = error.code;
        //         var errorMessage = error.message;
        //         if (errorCode == 'auth/weak-password') {
        //             alert('The password is too weak.');
        //         } else {
        //             alert(errorMessage);
        //         }
        //         console.log(error);
        //     });
        // },

        icons: function () {
            let perfil = document.getElementById("person");
            let setup = document.getElementById("settings");
            let busqueda = document.getElementById("search");
            if (this.pagina != "perfil") {
                perfil.setAttribute("class", "md-inactive")
            }
            if (this.pagina != "settings") {
                setup.setAttribute("class", "md-inactive")
            }
            if (this.pagina != "search") {
                busqueda.setAttribute("class", "md-inactive")
            }
        },

    },

    computed: {

      

        getData: function () {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    this.user = user;
                    this.currentUserID = JSON.parse(JSON.stringify(this.user)).uid;
                    this.userEmail = JSON.parse(JSON.stringify(this.user)).email;
                    this.userPhoto = JSON.parse(JSON.stringify(this.user)).photoURL;
                    this.userName = JSON.parse(JSON.stringify(this.user)).displayName;
                    console.log(this.user)
                }
                else {
                    this.usuariouser = null;
                    this.currentUserID = "";
                    this.userEmail = "";
                    this.userPhoto = "";
                    this.userName = "";
                }
            })
        },

    }
}).mount('#app')


searchRequest = async () => {
    const rawResponse = await fetch('https://api.audd.io/', {

        method: 'POST',

        headers: {
            'Content-Type': 'multipart/form-data'
        },

        body: JSON.stringify({
            api_token: "31499d3a2ab881cd488be239166ecb3a",
            //url: "https://audd.tech/example.mp3",
            audio: audioRecordedBase64,
            return: "apple_music,spotify"
        })
    });
    const content = await rawResponse.json();

    console.log(content);
    searchRecognized = content;

    app.recording = "finished"
    app.audioApiResponse = searchRecognized

    app.spotifyLink = "https://open.spotify.com/embed/track/" + searchRecognized.result.spotify.id + "?utm_source=generator"

};

recognizeRequest = async () => {
    const rawResponse = await fetch('https://api.audd.io/recognizeWithOffset/', {

        method: 'POST',

        headers: {
            'Content-Type': 'multipart/form-data'
        },

        body: JSON.stringify({
            api_token: "31499d3a2ab881cd488be239166ecb3a",
            audio: audioRecordedBase64
        })
    });
    const content = await rawResponse.json();

    console.log(content);
    audioRecognized = content;
};


//---------------------------------------------

const recordAudio = () =>
    new Promise(async resolve => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks = [];

        mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
        });

        const start = () => mediaRecorder.start();

        const stop = () =>
            new Promise(resolve => {
                mediaRecorder.addEventListener("stop", () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/ogg' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const audio = new Audio(audioUrl);
                    const play = () => audio.play();
                    resolve({ audioBlob, audioUrl, play });
                });

                mediaRecorder.stop();
            });

        resolve({ start, stop });
    });

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

const blobToBase64 = blob => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
        reader.onloadend = () => {
            resolve(reader.result);
        };
    });
};


let audioRecorded;
let audioRecordedBase64;
let audioRecognized;
let searchRecognized;

grabarAudio = async () => {

    app.recording = "active"

    const recorder = await recordAudio();
    recorder.start();
    console.log("Empieza grabacion")
    await sleep(12000);
    const audio = await recorder.stop();
    console.log("Terminó grabacion")
    let audioFile = audio.audioBlob;
    console.log(audioFile)

    blobToBase64(audioFile).then(res => {
        audioRecordedBase64 = res.substring(res.indexOf(',') + 1)
        app.recording = "searching"
        //recognizeRequest()
        // searchRequest() //Esta se usa
    });

    audioRecorded = audio

};


//Ejemplo de response de api recognition
let responseSample = {
    "artist": "Calvin Harris, Dua Lipa",
    "title": "One Kiss",
    "album": "One Kiss",
    "release_date": "2018-04-06",
    "label": "Sony Music UK",
    "timecode": "00:12",
    "song_link": "https://lis.tn/OneKiss",
    "apple_music": {
        "previews": [
            {
                "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/5c/e8/f4/5ce8f4da-0586-f20d-4e77-294744c4d382/mzaf_6721988309486224948.plus.aac.p.m4a"
            }
        ],
        "artwork": {
            "width": 3000,
            "height": 3000,
            "url": "https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/91/2a/7b/912a7bdb-c2f6-b887-9392-49728fece0df/886447044360.jpg/{w}x{h}bb.jpg",
            "bgColor": "0648e0",
            "textColor1": "ffffff",
            "textColor2": "3ec3fe",
            "textColor3": "cddaf8",
            "textColor4": "32aaf8"
        },
        "artistName": "Calvin Harris, Dua Lipa",
        "url": "https://music.apple.com/us/album/one-kiss/1364709432?app=music&at=1000l33QU&i=1364709436&mt=1",
        "discNumber": 1,
        "genreNames": [
            "Dance",
            "Music"
        ],
        "durationInMillis": 214847,
        "releaseDate": "2018-04-06",
        "name": "One Kiss",
        "isrc": "GBARL1800368",
        "albumName": "One Kiss - Single",
        "playParams": {
            "id": "1364709436",
            "kind": "song"
        },
        "trackNumber": 1,
        "composerName": "Dua Lipa, Adam Wiles & Jessie Reyez"
    },
    "spotify": {
        "album": {
            "name": "One Kiss (with Dua Lipa)",
            "artists": [
                {
                    "name": "Calvin Harris",
                    "id": "7CajNmpbOovFoOoasH2HaY",
                    "uri": "spotify:artist:7CajNmpbOovFoOoasH2HaY",
                    "href": "https://api.spotify.com/v1/artists/7CajNmpbOovFoOoasH2HaY",
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/7CajNmpbOovFoOoasH2HaY"
                    }
                },
                {
                    "name": "Dua Lipa",
                    "id": "6M2wZ9GZgrQXHCFfjv46we",
                    "uri": "spotify:artist:6M2wZ9GZgrQXHCFfjv46we",
                    "href": "https://api.spotify.com/v1/artists/6M2wZ9GZgrQXHCFfjv46we",
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we"
                    }
                }
            ],
            "album_group": "",
            "album_type": "single",
            "id": "7GEzhoTiqcPYkOprWQu581",
            "uri": "spotify:album:7GEzhoTiqcPYkOprWQu581",
            "available_markets": [
                "AD",
                "AE",
                "AG",
                "AL",
                "AM",
                "AO",
                "AR",
                "AT",
                "AU",
                "AZ",
                "BA",
                "BB",
                "BD",
                "BE",
                "BF",
                "BG",
                "BH",
                "BI",
                "BJ",
                "BN",
                "BO",
                "BR",
                "BS",
                "BT",
                "BW",
                "BY",
                "BZ",
                "CA",
                "CD",
                "CG",
                "CH",
                "CI",
                "CL",
                "CM",
                "CO",
                "CR",
                "CV",
                "CW",
                "CY",
                "CZ",
                "DE",
                "DJ",
                "DK",
                "DM",
                "DO",
                "DZ",
                "EC",
                "EE",
                "EG",
                "ES",
                "FI",
                "FJ",
                "FM",
                "FR",
                "GA",
                "GB",
                "GD",
                "GE",
                "GH",
                "GM",
                "GN",
                "GQ",
                "GR",
                "GT",
                "GW",
                "GY",
                "HK",
                "HN",
                "HR",
                "HT",
                "HU",
                "ID",
                "IE",
                "IL",
                "IN",
                "IQ",
                "IS",
                "IT",
                "JM",
                "JO",
                "JP",
                "KE",
                "KG",
                "KH",
                "KI",
                "KM",
                "KN",
                "KR",
                "KW",
                "KZ",
                "LA",
                "LB",
                "LC",
                "LI",
                "LK",
                "LR",
                "LS",
                "LT",
                "LU",
                "LV",
                "LY",
                "MA",
                "MC",
                "MD",
                "ME",
                "MG",
                "MH",
                "MK",
                "ML",
                "MN",
                "MO",
                "MR",
                "MT",
                "MU",
                "MV",
                "MW",
                "MX",
                "MY",
                "MZ",
                "NA",
                "NE",
                "NG",
                "NI",
                "NL",
                "NO",
                "NP",
                "NR",
                "NZ",
                "OM",
                "PA",
                "PE",
                "PG",
                "PH",
                "PK",
                "PL",
                "PS",
                "PT",
                "PW",
                "PY",
                "QA",
                "RO",
                "RS",
                "RW",
                "SA",
                "SB",
                "SC",
                "SE",
                "SG",
                "SI",
                "SK",
                "SL",
                "SM",
                "SN",
                "SR",
                "ST",
                "SV",
                "SZ",
                "TD",
                "TG",
                "TH",
                "TJ",
                "TL",
                "TN",
                "TO",
                "TR",
                "TT",
                "TV",
                "TW",
                "TZ",
                "UA",
                "UG",
                "US",
                "UY",
                "UZ",
                "VC",
                "VE",
                "VN",
                "VU",
                "WS",
                "XK",
                "ZA",
                "ZM",
                "ZW"
            ],
            "href": "https://api.spotify.com/v1/albums/7GEzhoTiqcPYkOprWQu581",
            "images": [
                {
                    "height": 640,
                    "width": 640,
                    "url": "https://i.scdn.co/image/ab67616d0000b273d09f96d82310d4d77c14c108"
                },
                {
                    "height": 300,
                    "width": 300,
                    "url": "https://i.scdn.co/image/ab67616d00001e02d09f96d82310d4d77c14c108"
                },
                {
                    "height": 64,
                    "width": 64,
                    "url": "https://i.scdn.co/image/ab67616d00004851d09f96d82310d4d77c14c108"
                }
            ],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/7GEzhoTiqcPYkOprWQu581"
            },
            "release_date": "2018-04-06",
            "release_date_precision": "day"
        },
        "external_ids": {
            "isrc": "GBARL1800368"
        },
        "popularity": 91,
        "is_playable": null,
        "linked_from": null,
        "artists": [
            {
                "name": "Calvin Harris",
                "id": "7CajNmpbOovFoOoasH2HaY",
                "uri": "spotify:artist:7CajNmpbOovFoOoasH2HaY",
                "href": "https://api.spotify.com/v1/artists/7CajNmpbOovFoOoasH2HaY",
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/7CajNmpbOovFoOoasH2HaY"
                }
            },
            {
                "name": "Dua Lipa",
                "id": "6M2wZ9GZgrQXHCFfjv46we",
                "uri": "spotify:artist:6M2wZ9GZgrQXHCFfjv46we",
                "href": "https://api.spotify.com/v1/artists/6M2wZ9GZgrQXHCFfjv46we",
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we"
                }
            }
        ],
        "available_markets": [
            "AD",
            "AE",
            "AG",
            "AL",
            "AM",
            "AO",
            "AR",
            "AT",
            "AU",
            "AZ",
            "BA",
            "BB",
            "BD",
            "BE",
            "BF",
            "BG",
            "BH",
            "BI",
            "BJ",
            "BN",
            "BO",
            "BR",
            "BS",
            "BT",
            "BW",
            "BY",
            "BZ",
            "CA",
            "CD",
            "CG",
            "CH",
            "CI",
            "CL",
            "CM",
            "CO",
            "CR",
            "CV",
            "CW",
            "CY",
            "CZ",
            "DE",
            "DJ",
            "DK",
            "DM",
            "DO",
            "DZ",
            "EC",
            "EE",
            "EG",
            "ES",
            "FI",
            "FJ",
            "FM",
            "FR",
            "GA",
            "GB",
            "GD",
            "GE",
            "GH",
            "GM",
            "GN",
            "GQ",
            "GR",
            "GT",
            "GW",
            "GY",
            "HK",
            "HN",
            "HR",
            "HT",
            "HU",
            "ID",
            "IE",
            "IL",
            "IN",
            "IQ",
            "IS",
            "IT",
            "JM",
            "JO",
            "JP",
            "KE",
            "KG",
            "KH",
            "KI",
            "KM",
            "KN",
            "KR",
            "KW",
            "KZ",
            "LA",
            "LB",
            "LC",
            "LI",
            "LK",
            "LR",
            "LS",
            "LT",
            "LU",
            "LV",
            "LY",
            "MA",
            "MC",
            "MD",
            "ME",
            "MG",
            "MH",
            "MK",
            "ML",
            "MN",
            "MO",
            "MR",
            "MT",
            "MU",
            "MV",
            "MW",
            "MX",
            "MY",
            "MZ",
            "NA",
            "NE",
            "NG",
            "NI",
            "NL",
            "NO",
            "NP",
            "NR",
            "NZ",
            "OM",
            "PA",
            "PE",
            "PG",
            "PH",
            "PK",
            "PL",
            "PS",
            "PT",
            "PW",
            "PY",
            "QA",
            "RO",
            "RS",
            "RW",
            "SA",
            "SB",
            "SC",
            "SE",
            "SG",
            "SI",
            "SK",
            "SL",
            "SM",
            "SN",
            "SR",
            "ST",
            "SV",
            "SZ",
            "TD",
            "TG",
            "TH",
            "TJ",
            "TL",
            "TN",
            "TO",
            "TR",
            "TT",
            "TV",
            "TW",
            "TZ",
            "UA",
            "UG",
            "US",
            "UY",
            "UZ",
            "VC",
            "VE",
            "VN",
            "VU",
            "WS",
            "XK",
            "ZA",
            "ZM",
            "ZW"
        ],
        "disc_number": 1,
        "duration_ms": 214846,
        "explicit": false,
        "external_urls": {
            "spotify": "https://open.spotify.com/track/7ef4DlsgrMEH11cDZd32M6"
        },
        "href": "https://api.spotify.com/v1/tracks/7ef4DlsgrMEH11cDZd32M6",
        "id": "7ef4DlsgrMEH11cDZd32M6",
        "name": "One Kiss (with Dua Lipa)",
        "preview_url": "https://p.scdn.co/mp3-preview/128a50f77ec0225f05a2bd1664cab327bc66bc5f?cid=e44e7b8278114c7db211c00ea273ac69",
        "track_number": 1,
        "uri": "spotify:track:7ef4DlsgrMEH11cDZd32M6"
    }
}
