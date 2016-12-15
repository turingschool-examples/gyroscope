import Ember from 'ember';

export default Ember.Controller.extend({
  x: 0,
  y: 0,
  actions: {
    start () {
      var gyroscopeController = this;

      // check if browser supports gyroscope
      if (window.DeviceOrientationEvent) {

        // listen to gyroscope
        window.addEventListener(
          "deviceorientation",
          handleGyroscopeData,
          true
        );
      }

      // use gyroscope data
      function handleGyroscopeData (e) {
        let vals = {
          x: e.gamma,
          y: e.beta
          // z: e.alpha
        };

        gyroscopeController.updateValues(vals.x, vals.y);
      }
    }
  },
  areElementsColliding(elem1, elem2){
    var elem1Boundary = elem1.getBoundingClientRect();
    var elem2Boundary = elem2.getBoundingClientRect();

    return !(elem1Boundary.right < elem2Boundary.left ||
             elem1Boundary.left > elem2Boundary.right ||
             elem1Boundary.bottom < elem2Boundary.top ||
             elem1Boundary.top > elem2Boundary.bottom);
  },
  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },
  moveBox(x, y) {
    var target = document.getElementById('target');
    var myBox = document.getElementById('mybox');

    myBox.style.left = x + 'px';
    myBox.style.top = y + 'px';

    if ( this.areElementsColliding(target, myBox) ) {
      target.style.backgroundColor = this.getRandomColor();
    }
  },
  updateValues (x, y) {

    // get current values
    var props = this.getProperties('x', 'y');

    // add gyroscope values
    props.x = x;
    props.y = y;

    // update display props
    this.setProperties({x: props.x, y: props.y});

    // move box
    this.moveBox(props.x, props.y);
  },
});
