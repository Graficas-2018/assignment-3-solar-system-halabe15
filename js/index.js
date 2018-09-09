var renderer = null,
scene = null,
camera = null,
root = null,
group = null,
sphere = null,
sphereTextured = null,
asteroidGeometry = null;
var moonGeometry = [];

var animating = true;

var duration = 10000; // ms
var duration2 = 20000; // ms
var duration3 = 3000; // ms
var currentTime = Date.now();

var materials = {};
var textureMap = [];
var bumpMap = [];
var controls = null;

function onKeyDown ( event )
{
    switch ( event.keyCode ) {

        case 32:
            animating = !animating;
            break;
    }

}

function animate()
{

    var now = Date.now();
    var deltat = now - currentTime;
    currentTime = now;
    var fract = deltat / duration;
    var fract2 = deltat / duration2;
    var fract3 = deltat / duration3;
    var angle = Math.PI * 2 * fract;
    var angle2 = Math.PI * 2 * fract2;
    var angle3 = Math.PI * 2 * fract3;

    // Rotate the sphere group about its Y axis
    if(animating){
      for(var i in group.children){
        if (group.children[i].name == 'sun')
          continue;
        if (group.children[i].name == 'asteroid') {
          group.children[i].rotation.z += angle / 5;
        }
        for (var moon in group.children[i].children) {
          if (group.children[i].children[moon].name == 'MoonsGroup') {
            group.children[i].children[moon].rotation.x += angle;
            for (var planet in group.children[i].children) {
              if (group.children[i].children[planet].name == 'planet') {
                group.children[i].children[planet].rotation.z += angle2;
              }
            }
          }
        }
        group.children[i].rotation.z += angle3 / planets[group.children[i].name].distanceSun;
      }
    }

}

function run()
{
  requestAnimationFrame(function() { run(); });

  controls.update();
  // Render the scene
  renderer.render( scene, camera );

  // Spin the cube for next frame
  animate();
}

function createMaterials()
{

  for(var name in planets){
    textureMap = new THREE.TextureLoader().load(planets[name].map);
    bumpMap = new THREE.TextureLoader().load(planets[name].bump);
    moonGeometry[name] = new THREE.SphereGeometry((planets[name].sphere.radius * 0.05), planets[name].sphere.width, planets[name].sphere.height);

    if(name != 'sun')
      materials[name] = new THREE.MeshPhongMaterial({ map: textureMap, bumpMap: bumpMap, bumpScale: 0.005 });
    else
      materials[name] = new THREE.MeshBasicMaterial({ map: textureMap, bumpMap: bumpMap, bumpScale: 1 });
  }

  asteroidGeometry = new THREE.SphereGeometry((earthRadius * 0.4) * scale, 20, 20);
  var textureAsteroid = new THREE.TextureLoader().load('./images/asteroidmap.jpg');
  materials['asteroid'] = new THREE.MeshPhongMaterial({ map: textureAsteroid, bumpMap: '', bumpScale: 0.0005 });

  // Moon Texture
  textureMap = new THREE.TextureLoader().load(moon.map);
  bumpMap = new THREE.TextureLoader().load(moon.bump);
  materials['moon'] = new THREE.MeshPhongMaterial({ map: textureMap, bumpMap: bumpMap, bumpScale: 0.005 });

  // Saturn Ring Texture
  textureMap = new THREE.TextureLoader().load(planets['saturn'].ring);
  bumpMap = new THREE.TextureLoader().load(planets['saturn'].pattern);
  materials['saturnRing'] = new THREE.MeshPhongMaterial({ map: textureMap, bumpMap: bumpMap, bumpScale: 1, side: THREE.DoubleSide });

  // Uranus Ring Texture
  textureMap = new THREE.TextureLoader().load(planets['uranus'].ring);
  bumpMap = new THREE.TextureLoader().load(planets['uranus'].trans);
  materials['uranusRing'] = new THREE.MeshPhongMaterial({ map: textureMap, bumpMap: bumpMap, bumpScale: 1, side: THREE.DoubleSide });


}

function createScene(canvas) {
    document.addEventListener( 'keydown', onKeyDown, false );

    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);

    // Create a new Three.js scene
    scene = new THREE.Scene();

    var stars = new THREE.TextureLoader().load('./images/stars2.jpg');

    scene.background = stars;

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 100000000000 );
    camera.position.z = 10;
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    camera.position.set(-15, -90, 40);
    // camera.lookAt( scene.position );
    scene.add(camera);

    // Create a group to hold all the objects
    root = new THREE.Object3D;

    // Add a directional light to show off the object
    var light = new THREE.PointLight( 0xFFFFFF, 1, 2000 );
    // light.position.set( 0, 0, 0 );
    // Position the light out from the scene, pointing at the origin

    // light = new THREE.AmbientLight ( 0xffffff );
    // root.add(light);

    // var light = new THREE.HemisphereLight( 0xffffff, 0xfff, 1);
    light.position.set(0,0,0);

    // Create a group to hold the spheres
    group = new THREE.Object3D;
    root.add(group);

    // Create all the materials
    createMaterials();

    for(var name in planets){
      createSphere(planets[name], name, {x: planets[name].distanceSun, y:0, z:0});
    }

    for(var i in group.children)
      if (group.children[i].name == 'sun')
        group.children[i].add(light);

    asteroidGroup = new THREE.Object3D;
    var x = 0, y = 0, r = 0,
    min = planets['earth'].distanceSun * 1.01,
    max = planets['mars'].distanceSun * .98,
    z = 0;

    for (var i = 0; i < 1440; i++) {
      asteroid = new THREE.Mesh(asteroidGeometry, materials['asteroid']);
      r = Math.random() * (max - min) + min;
      x = r * Math.cos((i * (Math.PI / 180)));
      y = r * Math.sin((i * (Math.PI / 180)));
      z = (Math.random() * ((r * .05) - (r * -.05)) + (r * -.05));
      asteroid.position.set(x,y,z);
      asteroid.name = 'asteroid';
      asteroidGroup.add(asteroid);
    }
    asteroidGroup.name = 'asteroid';
    group.add(asteroidGroup);
    // Now add the group to our scene
    scene.add( root );
}

function createSphere(planet, name, location = {x:0, y:0, z:0}){
  // Create the sphere geometry
  geometry = new THREE.SphereGeometry(planet.sphere.radius, planet.sphere.width, planet.sphere.height);
  geometry.rotateX(Math.PI/2);
  // And put the geometry and material together into a mesh
  sphereTextured = new THREE.Mesh(geometry, materials[name]);
  sphereTextured.visible = true;
  // setMaterial("phong-textured");
  sphereTextured.position.set(location.x, location.y, location.z);
  sphereTextured.name = 'planet';



  if(name == 'saturn'){
    geometry = new THREE.RingGeometry( (planet.sphere.radius * 1.4), (planet.sphere.radius * 2), 32);
    geometry.rotateY(45);
    ringTextured = new THREE.Mesh(geometry, materials['saturnRing']);
    sphereTextured.add(ringTextured);
  } else if (name == 'uranus'){
    geometry = new THREE.RingGeometry( (planet.sphere.radius * 1.4), (planet.sphere.radius * 2), 32);
    geometry.rotateY(45);
    geometry.rotateX(45);
    ringTextured = new THREE.Mesh(geometry, materials['uranusRing']);
    sphereTextured.add(ringTextured);
  }

  if (name != 'sun') {
    geometry = new THREE.RingGeometry( location.x , location.x + 0.001, 100, 8, Math.PI);
    material = new THREE.MeshBasicMaterial( { color: 0x484848, wireframe: true } );
    ring = new THREE.Mesh(geometry, material);
    root.add(ring);
  }

  tmp = new THREE.Object3D;
  tmp.add(sphereTextured);
  tmp.name = name;

  moonGroup = new THREE.Object3D;
  moonGroup.name = "MoonsGroup";

  for (var i = 0; i < planet.moons; i++) {
    moonTextured = new THREE.Mesh(moonGeometry[name], materials['moon']);
    moonIndividual = new THREE.Object3D;
    moonIndividual.add(moonTextured);
    moonIndividual.position.set((location.x + ((Math.random() - 0.5) * 6 * planet.sphere.radius)), (location.y + ((Math.random() - 0.5) * 2 * planet.sphere.radius)), (location.z + ((Math.random() - 0.5) * 2 * planet.sphere.radius)));
    moonIndividual.name = 'moon'+i;

    moonGroup.add( moonIndividual );
  }

  tmp.add(moonGroup);

  group.add( tmp );
}
