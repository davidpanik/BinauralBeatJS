(function() {
  var analyserLeft, analyserRight, bBeat, canvas_height, canvas_width, context, gain, leftChannel, points, renderer, rightChannel, run, scale_left, scale_right, started, visualizerLeft, visualizerRight;

  context = new webkitAudioContext();

  bBeat = new BinauralBeat(context);

  leftChannel = bBeat.getChannel(0);

  rightChannel = bBeat.getChannel(1);

  gain = context.createGain();

  analyserLeft = context.createAnalyser();

  analyserRight = context.createAnalyser();

  bBeat.connect(gain);

  gain.connect(context.destination);

  leftChannel.connect(analyserLeft);

  rightChannel.connect(analyserRight);

  started = false;

  $(".btn").click(function(e) {
    if (started === false) {
      bBeat.start();
      return started = true;
    }
  });

  $("#btn-sine").click(function() {
    return bBeat.setWaveType(BinauralBeat.SINE);
  });

  $("#btn-square").click(function() {
    return bBeat.setWaveType(BinauralBeat.SQUARE);
  });

  $("#btn-triangle").click(function() {
    return bBeat.setWaveType(BinauralBeat.TRIANGLE);
  });

  $("#btn-sawtooth").click(function() {
    return bBeat.setWaveType(BinauralBeat.SAWTOOTH);
  });

  $("#sldr-freq").change(function(e) {
    var freq;

    freq = Number(e.target.value);
    return bBeat.setFrequency(freq);
  });

  $("#sldr-beat").change(function(e) {
    var beats;

    beats = Number(e.target.value);
    console.log(beats);
    return bBeat.setBeatFrequency(beats);
  });

  $("#sldr-volume").change(function(e) {
    var volume;

    volume = Number(e.target.value);
    return gain.gain.value = volume / 100;
  });

  $(".slider").trigger("change");

  $("#btn-sine").click();

  run = function() {
    return setTimeout(function() {
      requestAnimationFrame(run);
      return renderer.draw();
    }, 50);
  };

  canvas_width = 800;

  canvas_height = 300;

  scale_left = 0.5;

  scale_right = 0.5;

  points = 512;

  visualizerLeft = new AudioVisualizer(analyserLeft, 'red', points, scale_left);

  visualizerRight = new AudioVisualizer(analyserRight, 'blue', points, scale_right);

  renderer = new Renderer(canvas_width, canvas_height, [visualizerLeft, visualizerRight]);

  run();

  visualizerLeft.logData();

}).call(this);
