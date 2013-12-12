function sparkgene(element) {

    function isString(obj) {
      return Object.prototype.toString.call(obj) == '[object String]';
    }

    var DEFAULT_SELECTOR = '.sparkgene';
    var DEFAULT_COLOR = '#00BEF2';
    var DEFAULT_HEIGHT = 20;

    // Handle argument overloading
    if (element === undefined) {
      element = DEFAULT_SELECTOR;
    }

    
    if (isString(element)) {
      var nodeList = document.querySelectorAll(element);
      for (var i = 0, ii = nodeList.length; i < ii; i++) {
        sparkgene(nodeList[i]);
      }
      return;
    }

    if (!(element instanceof HTMLElement)) {
      throw 'Error: unrecognized element or selector';
    }

    // Parse the positions string
    var rawPositions = element.dataset.gene.split(',');
    var positions = [];

    for (var j = 0; j < rawPositions.length; j++) {
      var rawPos = rawPositions[j];
      var pos = parseInt(rawPos);
      positions.push(pos);
    }

    // Figure out some drawing configuration
    var color = element.dataset.geneColor || DEFAULT_COLOR;
    var height = element.dataset.geneHeight || DEFAULT_HEIGHT;
    var width = positions[positions.length - 1] + 10;

    // Create our <canvas> element and append it to the DOM
    var el = document.createElement('canvas');
    el.style.width = width + 'px';
    el.style.height = height + 'px';
    el.width = width;
    el.height = height;
    element.appendChild(el);

    // Draw to the <canvas>
    var ctx = el.getContext('2d');
    ctx.fillStyle = color;

    // Loop over the positions with a step of 2
    for (var j = 0, jj = positions.length - 1; j < jj; j += 2) {
      var exon_start = positions[j];
      var exon_end = positions[j + 1];

      var width = exon_end - exon_start + 1;
      ctx.fillRect(exon_start, 0, width, height);

      // Draw a connector to the previous exon.
      if (j > 0) {
        var previous_exon_end = positions[j - 1] + 1;
        var y_position = height / 2;
        ctx.beginPath();
        ctx.moveTo(previous_exon_end, y_position);
        ctx.lineTo(exon_start, y_position);
        ctx.stroke();
      }
    }
}
