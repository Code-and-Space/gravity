// Benedikt Groß

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let ground;
let wall01;
let wall02;
let bridge;
let ball;

let compositeConstruction;

let circ01;
let rect01;
let circ02;
let rect02;
let circ03;
let rect03;

let constraint01;
let constraint02;
let constraint03;
let constraint04;
let constraint05;
let constraint06;
let constraint07;
let constraint08;
let constraint09;
let constraint010;
let constraint011;

let wheelbase;
let wheelAOffset;
let wheelYOffest;

let group1;

let canvas;

function setup() {
  canvas = createCanvas(800, 800);

  // create an engine
  engine = Engine.create();
  engine.world.gravity.scale = 0.0005;


  group1 = Body.nextGroup(true),
  wheelBase = 20,
  wheelAOffset = -width * 0.5 + wheelBase,
  // wheelBOffset = width * 0.5 - wheelBase,
  wheelYOffset = 0;

  compositeConstruction = Composite.create({ label: 'Car'});



  // wrench bottom circle (black)
  circ01 = Bodies.circle(400, 600, 40, {
    collisionFilter: {
      group: group1
    },
    density: 0.0002
  });

  // wrench body rect (black)
  rect01 = Bodies.rectangle(360, 300, 80, 300, {
    collisionFilter: {
      group: group1
    },
    density: 0.0002
  });

  // wrench bottom circle void (white)
  circ02 = Bodies.circle(400, 600, 20, {
    collisionFilter: {
      group: group1
    },
    density: 0.0002
  });

  // wrench body skinny rect void (white)
  rect02 = Bodies.rectangle(397.5, 320, 5, 270, {
    collisionFilter: {
      group: group1
    },
    friction: 0.8
  });

  // wrench head circle (black)
  circ03 = Bodies.circle(400, 250, 75, {
    // isStatic: true,
    collisionFilter: {
      group: group1
    },
    density: 0.0002
  });

  // wrench void rect at head (white)
  rect03 = Bodies.rectangle(430, 250, 60, 110, {
    collisionFilter: {
      group: group1
    },
    chamfer: {
      radius:10
    },
    friction: 0.8
  });

  let rotateRect03 = Body.rotate(rect03, -29)


// Ties wrench bottom (black) to wrench body (black)
  constraint01 = Constraint.create({
    bodyA: circ01,
    // pointA: offsetA,
    pointA: { x: 0, y: 0 },
    bodyB: rect01,
    pointB: { x: 0, y: 150 },
    stiffness: 0.01,
    length: 0
  });

  //Ties wrench bottom circle (black) to wrench bottom circle (black)
  constraint02 = Constraint.create({
    bodyA: circ01,
    // pointA: offsetA,
    pointA: { x: 0, y: 0 },
    bodyB: circ02,
    pointB: { x: 0, y: 0 },
    stiffness: 0.01,
    length: 0
  });

  //Ties wrench head circle (black) to wrench body rect (black)
  constraint03 = Constraint.create({
    bodyA: circ03,
    // pointA: offsetA,
    pointA: { x: 0, y: 150 },
    bodyB: rect01,
    pointB: { x: 0, y: 0 },
    stiffness: 0.01,
    length: 0
  });

  //Ties wrench body skinny rect void (white) to wrench bottom circle (black)
  constraint04 = Constraint.create({
    bodyA: rect02,
    // pointA: offsetA,
    pointA: { x: 0, y: 150 },
    bodyB: circ01,
    pointB: { x: 0, y: 0 },
    stiffness: 0.00001,
    length: 0
  });

  //Ties wrench head circle (black) to wrench body rect void (white)
  constraint05 = Constraint.create({
    bodyA: circ03,
    // pointA: offsetA,
    pointA: { x: 0, y: 150 },
    bodyB: rect02,
    pointB: { x: 0, y: 0 },
    stiffness: 0.01,
    length: 0
  });

  //Ties wrench head circle (black) to wrench void rect at head (white)
  constraint06 = Constraint.create({
    bodyA: circ03,
    // pointA: offsetA,
    pointA: { x: -50, y: -20 },
    bodyB: rect03,
    pointB: { x: 0, y: 0 },
    stiffness: 0.01,
    length: 0
  });

  constraint07 = Constraint.create({
    bodyA: circ02,
    // pointA: offsetA,
    pointA: { x: 0, y: 120 },
    bodyB: rect02,
    pointB: { x: 0, y: 0 },
    stiffness: 0.01,
    length: 0
  });




  Composite.add(compositeConstruction, [circ01, rect01, circ02, rect02, circ03, rect03, constraint01, constraint02, constraint03, constraint04, constraint05, constraint06, constraint07]);


  World.add(engine.world, [compositeConstruction]);





  // // add bridge
  // const group = Body.nextGroup(true);
  // const rects = Composites.stack(100, 200, 10, 1, 10, 10, function(x, y) {
  //   return Bodies.rectangle(x, y, 50, 20, { collisionFilter: { group: group } });
  // });
  // bridge = Composites.chain(rects, 0.5, 0, -0.5, 0, {stiffness: 0.8, length: 2, render: {type: 'line'}});
  // World.add(engine.world, [bridge]);
  //
  // // left and right fix point of bridge
  // Composite.add(rects, Constraint.create({
  //   pointA: {x: 100, y: 200},
  //   bodyB: rects.bodies[0],
  //   pointB: {x: -25, y: 0},
  //   stiffness: 0.1
  // }));
  // Composite.add(rects, Constraint.create({
  //   pointA: {x: 700, y: 200},
  //   bodyB: rects.bodies[rects.bodies.length-1],
  //   pointB: {x: +25, y: 0},
  //   stiffness: 0.02
  // }));
  //
  // // add ball
  // ball = Bodies.circle(400, 0, 50);
  // World.add(engine.world, [ball]);

  // ground

  wall01 = Bodies.rectangle(-250, 0, 500, height * 50, {isStatic: true});
  wall02 = Bodies.rectangle(width+1000, 0, 1000, height * 50, {isStatic: true});

  World.add(engine.world, [wall01, wall02])

  ground = Bodies.rectangle(0, height + 50, 1810, 100, {isStatic: true});
  World.add(engine.world, [ground]);

  // setup mouse
  const mouse = Mouse.create(canvas.elt);
  const mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);

  // run the engine
  Engine.run(engine);
}

function draw() {
  background(255);

  noStroke();
//   stroke('red');
//   noFill();
  // drawVertices(ball.vertices);
  // drawBodies(bridge.bodies);

  fill(0);
  drawVertices(circ01.vertices);
  drawVertices(rect01.vertices);
  fill(255);
  drawVertices(circ02.vertices);
  drawVertices(rect02.vertices);
  fill(0);
  drawVertices(circ03.vertices);
  fill(255);
  drawVertices(rect03.vertices);


  stroke(128);
  strokeWeight(2);
  // drawConstraints(bridge.constraints);

  noStroke();
  fill(128);
  drawVertices(ground.vertices);
  drawVertices(wall01.vertices);
  drawVertices(wall02.vertices);

  drawMouse(mouseConstraint);
}

function drawConstraints(constraints) {
  for (let i = 0; i < constraints.length; i++) {
    drawConstraint(constraints[i]);
  }
}

function drawBodies(bodies) {
  for (let i = 0; i < bodies.length; i++) {
    drawVertices(bodies[i].vertices);
  }
}

function drawConstraint(constraint) {
  const offsetA = constraint.pointA;
  let posA = {x:0, y:0};
  if (constraint.bodyA) {
    posA = constraint.bodyA.position;
  }
  const offsetB = constraint.pointB;
  let posB = {x:0, y:0};
  if (constraint.bodyB) {
    posB = constraint.bodyB.position;
  }
  line(
    posA.x + offsetA.x,
    posA.y + offsetA.y,
    posB.x + offsetB.x,
    posB.y + offsetB.y
  );
}

function drawMouse(mouseConstraint) {
  if (mouseConstraint.body) {
    const pos = mouseConstraint.body.position;
    const offset = mouseConstraint.constraint.pointB;
    const m = mouseConstraint.mouse.position;
    stroke(0, 255, 0);
    strokeWeight(2);
    line(pos.x + offset.x, pos.y + offset.y, m.x, m.y);
  }
}

function drawVertices(vertices) {
  beginShape();
  for (let i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}
