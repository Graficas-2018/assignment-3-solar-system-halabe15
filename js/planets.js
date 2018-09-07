var earthRadius = 6371;
var scale = 0.00001;

var moon = { map: "images/moon_1024.jpg", bump: "images/moon_bump.jpg"};

var planets = {
  sun: {
    map: "images/sunmap.jpg",
    bump: '' ,
    sphere:{
      radius: scale * (earthRadius * 109.1),
      width: 20,
      height: 20
    },
    moons: 0,
    distanceSun: 0
  },

  mercury: {
    map:"images/mercurymap.jpg",
    bump: "images/mercurybump.jpg",
    sphere: {
      radius: scale * (earthRadius * 0.38),
      width:20,
      height: 20
    },
    moons: 0,
    distanceSun: (57910 * scale) + (695508 * scale)
  },

  venus: {
    map:"images/venusmap.jpg",
    bump: "images/venusbump.jpg",
    sphere: {
      radius: scale * (earthRadius * 0.95),
      width:20,
      height: 20
    },
    moons: 0,
    distanceSun: (108200 * scale) + (695508 * scale)
  },

  earth: {
    map: "images/earthmap.jpg",
    bump: "images/earth_normal.jpg",
    sphere: {
      radius: scale * (earthRadius * 1),
      width:20,
      height: 20
    },
    moons: 1,
    distanceSun: (146600 * scale) + (695508 * scale)
  },

  mars: {
    map:"images/marsmap1k.jpg",
    bump: "images/marsbump1k.jpg",
    sphere: {
      radius: scale * (earthRadius * 0.53),
      width:20,
      height: 20
    },
    moons: 2,
    distanceSun: (227940 * scale) + (695508 * scale)
  },

  jupiter: {
    map:"images/jupitermap.jpg",
    bump: '',
    sphere: {
      radius: scale * (earthRadius * 11.2),
      width:20,
      height: 20
    },
    moons: 79,
    distanceSun: (778330 * scale) + (695508 * scale)
  },
  saturn: {
    map: "images/saturnmap.jpg",
    bump: '', ring: "images/saturnringcolor.jpg", pattern: "images/saturnringpattern.gif",
    sphere: {
      radius: scale * (earthRadius * 9.45),
      width:20,
      height: 20
    },
    moons: 62,
    distanceSun: (1429400 * scale) + (695508 * scale)
  },
  uranus: {
    map:"images/uranusmap.jpg",
    bump: '', ring: "images/uranusringcolor.jpg", trans: "images/uranusringtrans.gif",
    sphere: {
      radius: scale * (earthRadius * 4),
      width:20,
      height: 20
    },
    moons: 27,
    distanceSun: (2870990 * scale) + (695508 * scale)
  },
  neptune: {
    map:"images/neptunemap.jpg",
    bump: '',
    sphere: {
      radius: scale * (earthRadius * 3.88),
      width:20,
      height: 20
    },
    moons: 14,
    distanceSun: (4504300 * scale) + (695508 * scale)
  },
  pluto: {
    map:"images/plutomap1k.jpg",
    bump: "images/plutobump1k.jpg",
    sphere: {
      radius: scale * (earthRadius * 0.18),
      width:20,
      height: 20
    },
    moons: 5,
    distanceSun: (5934456.5 * scale) + (695508 * scale)
  }
};
