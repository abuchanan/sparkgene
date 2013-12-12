sparkgene v1.0


Given a DOM element with a spark gene definition in its dataset,
append a <canvas> and draw a gene model.

Sparkgenes are defined like this:
<div class='sparkgene' data-gene='0, 5, 10, 15, 18, 20'></div>

The "data-gene" attribute describes the start/stop coordinates
of the exons that make up a gene model. The example above describes
a model like this (X's are exons, -'s are introns):

XXXXXX----XXXXXX--XXX

TODO: possibly the code doesn't actually draw the pixels
     to match this example

The height of the drawn model can be controlled with "data-gene-height":

<div class='sparkgene' data-gene='0, 5, 10, 15' data-gene-height='10'></div>

Color is controlled with "data-gene-color":

<div class='sparkgene' data-gene='0, 5, 10, 15' data-gene-color='gray'></div>

To initialize sparkgenes, call sparkgene():

 By default it looks for elements with the "sparkgene" class:

    sparkgene();

 You can pass a selector string:

    sparkgene('.my-spark-string-class');

 Or, pass in a DOM element:

    document.querySelectorAll('.sparkgene').forEach(function(el) {
      sparkgene(el);
    });


Known issues and TODOs:
- sparkgene() doesn't check if the exon positions list is even
- possibly the exon positions don't match the actual pixels drawn
- TODO: add options to sparkgene() for default color, height, etc:
        e.g. sparkgene({color: 'gray', height: '10px')
- TODO: allow positions to be configured via javascript
- TODO: better error handling/reporting
- TODO: could just require that sparkgene elements are <canvas> elements
        instead of appending <canvas> elements to the DOM.
