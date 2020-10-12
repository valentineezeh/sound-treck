import IMAGES from "./images";
import MUSIC from "./songs";

export const BASE_URL = "http://192.241.138.167";

export const SLIDERSETTINGS = {
  arrows: false,
  dots: false,
  draggable: true,
  infinite: true,
  centerMode: false,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 5
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    }
  ]
};

export const SONGS = [
  {
    id: "song-1",
    album: "single",
    artist: "wizkid",
    genre: "pop",
    image: IMAGES.songs.soco,
    url: MUSIC.fever,
    title: "fever"
  },
  {
    id: "song-2",
    album: "the invasion of privacy",
    artist: "cardi b",
    genre: "hiphop",
    image: IMAGES.songs.bodakBlue,
    url: MUSIC.fever,
    title: "bodak blue"
  },
  {
    id: "song-3",
    album: "single",
    artist: "tuface",
    genre: "pop",
    image: IMAGES.songs.amaka,
    url: MUSIC.fever,
    title: "amaka"
  },
  {
    id: "song-4",
    album: "about 30",
    artist: "adekunle gold",
    genre: "afro",
    image: IMAGES.songs.ire,
    url: MUSIC.fever,
    title: "ire"
  },
  {
    id: "song-5",
    album: "zombie",
    artist: "fela kuti",
    genre: "afro",
    image: IMAGES.songs.zombie,
    url: MUSIC.fever,
    title: "zombie"
  },
  {
    id: "song-6",
    album: "good girl gone bad",
    artist: "rihanna",
    genre: "pop",
    image: IMAGES.songs.umbrella,
    url: MUSIC.fever,
    title: "umbrella"
  },
  {
    id: "song-7",
    album: "african giant",
    artist: "burna boy",
    genre: "afro",
    image: IMAGES.albums.africanGiant,
    url: MUSIC.AfricanGiant,
    title: "african giant"
  },
  {
    id: "song-8",
    album: "african giant",
    artist: "burna boy",
    genre: "afro",
    image: IMAGES.albums.africanGiant,
    url: MUSIC.AnotherStory,
    title: "another story ft manifest"
  },
  {
    id: "song-9",
    album: "african giant",
    artist: "burna boy",
    genre: "afro",
    image: IMAGES.albums.africanGiant,
    url: MUSIC.Anybody,
    title: "anybody"
  },
  {
    id: "song-10",
    album: "african giant",
    artist: "burna boy",
    genre: "afro",
    image: IMAGES.albums.africanGiant,
    url: MUSIC.BlakRyno,
    title: "blak ryno skit"
  },
  {
    id: "song-11",
    album: "african giant",
    artist: "burna boy",
    genre: "afro",
    image: IMAGES.albums.africanGiant,
    url: MUSIC.CollateralDamage,
    title: "collateral damage"
  },
  {
    id: "song-12",
    album: "african giant",
    artist: "burna boy",
    genre: "afro",
    image: IMAGES.albums.africanGiant,
    url: MUSIC.Dangote,
    title: "dangote"
  },
  {
    id: "song-13",
    album: "african giant",
    artist: "burna boy",
    genre: "afro",
    image: IMAGES.albums.africanGiant,
    url: MUSIC.Destiny,
    title: "destiny"
  },
  {
    id: "song-14",
    album: "african giant",
    artist: "burna boy",
    genre: "afro",
    image: IMAGES.albums.africanGiant,
    url: MUSIC.Different,
    title: "different ft damian marley & angelique kidjo"
  },
  {
    id: "song-15",
    album: "african giant",
    artist: "burna boy",
    genre: "afro",
    image: IMAGES.albums.africanGiant,
    url: MUSIC.Gbona,
    title: "gbona"
  },
  {
    id: "song-16",
    album: "african giant",
    artist: "burna boy",
    genre: "afro",
    image: IMAGES.albums.africanGiant,
    url: MUSIC.GumBody,
    title: "gum body ft jorja-smith"
  },
  {
    id: "song-17",
    album: "african giant",
    artist: "burna boy",
    genre: "afro",
    image: IMAGES.albums.africanGiant,
    url: MUSIC.KillinDem,
    title: "killin dem ft zlatan"
  },
  {
    id: "song-18",
    album: "african giant",
    artist: "burna boy",
    genre: "afro",
    image: IMAGES.albums.africanGiant,
    url: MUSIC.Omo,
    title: "omo"
  },
  {
    id: "song-19",
    album: "african giant",
    artist: "burna boy",
    genre: "afro",
    image: IMAGES.albums.africanGiant,
    url: MUSIC.OnTheLow,
    title: "on the low"
  },
  {
    id: "song-20",
    album: "african giant",
    artist: "burna boy",
    genre: "afro",
    image: IMAGES.albums.africanGiant,
    url: MUSIC.PullUp,
    title: "pull up"
  },
  {
    id: "song-21",
    album: "african giant",
    artist: "burna boy",
    genre: "afro",
    image: IMAGES.albums.africanGiant,
    url: MUSIC.Secret,
    title: "secret"
  },
  {
    id: "song-22",
    album: "african giant",
    artist: "burna boy",
    genre: "afro",
    image: IMAGES.albums.africanGiant,
    url: MUSIC.ShowTell,
    title: "show tell"
  },
  {
    id: "song-23",
    album: "african giant",
    artist: "burna boy",
    genre: "afro",
    image: IMAGES.albums.africanGiant,
    url: MUSIC.Spiritual,
    title: "spiritual"
  },
  {
    id: "song-24",
    album: "african giant",
    artist: "burna boy",
    genre: "afro",
    image: IMAGES.albums.africanGiant,
    url: MUSIC.ThisSide,
    title: "this side"
  },
  {
    id: "song-25",
    album: "african giant",
    artist: "burna boy",
    genre: "afro",
    image: IMAGES.albums.africanGiant,
    url: MUSIC.WetinManGoDo,
    title: "wetin man go do"
  }
];

export const ALBUMS = [
  {
    id: "album-1",
    artist: "falz",
    image: IMAGES.albums.storiesThatTouch,
    songs: [],
    title: "stories that touch"
  },
  {
    id: "album-2",
    artist: "burna boy",
    image: IMAGES.albums.africanGiant,
    songs: [
      {
        id: "song-7",
        album: "african giant",
        artist: "burna boy",
        genre: "afro",
        image: IMAGES.albums.africanGiant,
        url: MUSIC.AfricanGiant,
        title: "african giant"
      },
      {
        id: "song-8",
        album: "african giant",
        artist: "burna boy",
        genre: "afro",
        image: IMAGES.albums.africanGiant,
        url: MUSIC.AnotherStory,
        title: "another story ft manifest"
      },
      {
        id: "song-9",
        album: "african giant",
        artist: "burna boy",
        genre: "afro",
        image: IMAGES.albums.africanGiant,
        url: MUSIC.Anybody,
        title: "anybody"
      },
      {
        id: "song-10",
        album: "african giant",
        artist: "burna boy",
        genre: "afro",
        image: IMAGES.albums.africanGiant,
        url: MUSIC.BlakRyno,
        title: "blak ryno skit"
      },
      {
        id: "song-11",
        album: "african giant",
        artist: "burna boy",
        genre: "afro",
        image: IMAGES.albums.africanGiant,
        url: MUSIC.CollateralDamage,
        title: "collateral damage"
      },
      {
        id: "song-12",
        album: "african giant",
        artist: "burna boy",
        genre: "afro",
        image: IMAGES.albums.africanGiant,
        url: MUSIC.Dangote,
        title: "dangote"
      },
      {
        id: "song-13",
        album: "african giant",
        artist: "burna boy",
        genre: "afro",
        image: IMAGES.albums.africanGiant,
        url: MUSIC.Destiny,
        title: "destiny"
      },
      {
        id: "song-14",
        album: "african giant",
        artist: "burna boy",
        genre: "afro",
        image: IMAGES.albums.africanGiant,
        url: MUSIC.Different,
        title: "different ft damian marley & angelique kidjo"
      },
      {
        id: "song-15",
        album: "african giant",
        artist: "burna boy",
        genre: "afro",
        image: IMAGES.albums.africanGiant,
        url: MUSIC.Gbona,
        title: "gbona"
      },
      {
        id: "song-16",
        album: "african giant",
        artist: "burna boy",
        genre: "afro",
        image: IMAGES.albums.africanGiant,
        url: MUSIC.GumBody,
        title: "gum body ft jorja-smith"
      },
      {
        id: "song-17",
        album: "african giant",
        artist: "burna boy",
        genre: "afro",
        image: IMAGES.albums.africanGiant,
        url: MUSIC.KillinDem,
        title: "killin dem ft zlatan"
      },
      {
        id: "song-18",
        album: "african giant",
        artist: "burna boy",
        genre: "afro",
        image: IMAGES.albums.africanGiant,
        url: MUSIC.Omo,
        title: "omo"
      },
      {
        id: "song-19",
        album: "african giant",
        artist: "burna boy",
        genre: "afro",
        image: IMAGES.albums.africanGiant,
        url: MUSIC.OnTheLow,
        title: "on the low"
      },
      {
        id: "song-20",
        album: "african giant",
        artist: "burna boy",
        genre: "afro",
        image: IMAGES.albums.africanGiant,
        url: MUSIC.PullUp,
        title: "pull up"
      },
      {
        id: "song-21",
        album: "african giant",
        artist: "burna boy",
        genre: "afro",
        image: IMAGES.albums.africanGiant,
        url: MUSIC.Secret,
        title: "secret"
      },
      {
        id: "song-22",
        album: "african giant",
        artist: "burna boy",
        genre: "afro",
        image: IMAGES.albums.africanGiant,
        url: MUSIC.ShowTell,
        title: "show tell"
      },
      {
        id: "song-23",
        album: "african giant",
        artist: "burna boy",
        genre: "afro",
        image: IMAGES.albums.africanGiant,
        url: MUSIC.Spiritual,
        title: "spiritual"
      },
      {
        id: "song-24",
        album: "african giant",
        artist: "burna boy",
        genre: "afro",
        image: IMAGES.albums.africanGiant,
        url: MUSIC.ThisSide,
        title: "this side"
      },
      {
        id: "song-25",
        album: "african giant",
        artist: "burna boy",
        genre: "afro",
        image: IMAGES.albums.africanGiant,
        url: MUSIC.WetinManGoDo,
        title: "wetin man go do"
      }
    ],
    title: "african giant"
  },
  {
    id: "album-3",
    artist: "cardi b",
    image: IMAGES.albums.invasionOfPrivacy,
    songs: [],
    title: "invasion of privacy"
  },
  {
    id: "album-4",
    artist: "beyonce",
    image: IMAGES.albums.theLionKing,
    songs: [],
    title: "the lion king"
  },
  {
    id: "album-5",
    artist: "kendrick lemar",
    image: IMAGES.albums.damn,
    songs: [],
    title: "damn"
  },
  {
    id: "album-6",
    artist: "olamide",
    image: IMAGES.albums.streetOt,
    songs: [],
    title: "street ot"
  }
];

export const ARTISTS = [
  {
    id: "artist-1",
    bio: "",
    image: IMAGES.artists.burnaBoy,
    title: "burna boy"
  },
  {
    id: "artist-2",
    bio: "",
    image: IMAGES.artists.davido,
    title: "davido"
  },
  {
    id: "artist-3",
    bio: "",
    image: IMAGES.artists.falz,
    title: "falz"
  },
  {
    id: "artist-4",
    bio: "",
    image: IMAGES.artists.niniola,
    title: "niniola"
  },
  {
    id: "artist-5",
    bio: "",
    image: IMAGES.artists.patoranking,
    title: "patoranking"
  },
  {
    id: "artist-6",
    bio: "",
    image: IMAGES.artists.tuface,
    title: "tuface"
  }
];

export const GENRES = [
  {
    id: "genre-1",
    image: IMAGES.genres.afro,
    title: "afro"
  },
  {
    id: "genre-2",
    image: IMAGES.genres.hiphop,
    title: "hip hop"
  },
  {
    id: "genre-3",
    image: IMAGES.genres.jazz,
    title: "jazz"
  },
  {
    id: "genre-4",
    image: IMAGES.genres.oldies,
    title: "oldies"
  },
  {
    id: "genre-5",
    image: IMAGES.genres.pop,
    title: "pop"
  },
  {
    id: "genre-6",
    image: IMAGES.genres.rock,
    title: "rock"
  }
];

export const DEFAULTUSER = {
  fullname: "olusegun omilabu",
  email: "omilabuolusegun@gmail.com",
  bio:
    "Creator. Avid aperture practitioner. Tea lover. Passio nate organizer. Beer enthusiast. Internet fanatic.",
  phone: "+2348037222844",
  bookingDetails: "+2348037222844",
  location: "Lagos, Nigeria",
  facebook: "#",
  twitter: "#",
  instagram: "#"
};
