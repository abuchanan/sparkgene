var nodeList = document.querySelectorAll('.draw-gene');

for (var i = 0; i < nodeList.length; i++) {
  var node = nodeList[i];

  var rawPositions = node.dataset.gene.split(',');
  var positions = [];

  for (var j = 0; j < rawPositions.length; j++) {
    var rawPos = rawPositions[j];
    var pos = parseInt(rawPos);
    positions.push(pos);
  }

  // TODO check that positions.length is even.
  //      if it's odd, there's some here

  // TODO better exon connectors

  var default_color = '#00BEF2';
  var color = node.dataset.geneColor || default_color;

  var default_height = 20;
  var height = node.dataset.geneHeight || default_height;
  var width = positions[positions.length - 1] + 10;

  var el = document.createElement('canvas');
  el.style.width = width + 'px';
  el.style.height = height + 'px';
  el.width = width;
  el.height = height;
  node.appendChild(el);

  var ctx = el.getContext('2d');
  ctx.fillStyle = color;


  for (var j = 0; j < positions.length - 1; j += 2) {
    var a = positions[j];
    var b = positions[j + 1];

    ctx.fillRect(a, 0, b - a + 1, height);

    if (j > 0) {
      var c = positions[j - 1] + 1;
      ctx.beginPath();
      ctx.moveTo(c, height / 2);
      ctx.lineTo(a, height / 2);
      ctx.stroke();
    }
  }
}
