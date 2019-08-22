WebViewer({
  path: '../../../lib',
  pdftronServer: 'https://demo.pdftron.com/', // comment this out to do client-side only
  initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/legal-contract.pdf'
}, document.getElementById('viewer'))
  .then(function(instance) {
    var docViewer = instance.docViewer;
    var annotManager = instance.annotManager;
    var Annotations = instance.Annotations;
    var textInput = document.getElementById('text');
    var pagesDiv = document.getElementById('pages');

    docViewer.on('documentLoaded', function() {
      var doc = docViewer.getDocument();
      var pageIndex;

      for (pageIndex = 0; pageIndex < docViewer.getPageCount(); pageIndex++) {
        var input = document.createElement('input');
        input.id = 'page-' + pageIndex;
        input.type = 'checkbox';
        input.checked = false;
        input.value = pageIndex;
        input.onchange = function(e) {
          if (e.target.checked) {
            doc.loadPageText(Number(e.target.value), function(text) {
              var textStartIndex = 0;
              var textIndex;
              var annotations = [];
              var searchText = textInput.value;

              while ((textIndex = text.indexOf(searchText, textStartIndex)) > -1) {
                textStartIndex = textIndex + searchText.length;
                // Get text position
                doc.getTextPosition(Number(e.target.value), textIndex, textIndex + searchText.length, function(quads) {
                  var annotation = new Annotations.TextHighlightAnnotation();
                  annotation.Author = instance.getAnnotationUser();
                  annotation.PageNumber = Number(e.target.value) + 1;
                  annotation.Quads = quads;
                  annotation.StrokeColor = new Annotations.Color(136, 39, 31);
                  annotations.push(annotation);
                });
              }
              annotManager.addAnnotations(annotations);
              annotManager.selectAnnotations(annotations);
            });
          } else {
            var annotations = annotManager.getAnnotationsList().filter(function(annotation) {
              return annotation.PageNumber === Number(e.target.value) + 1;
            });
            annotManager.deleteAnnotations(annotations);
          }
        };

        var label = document.createElement('label');
        label.htmlFor = 'page-' + pageIndex;
        label.innerHTML = 'Page ' + (pageIndex + 1);

        var lineBreak = document.createElement('br');

        pagesDiv.appendChild(input);
        pagesDiv.appendChild(label);
        pagesDiv.appendChild(lineBreak);
      }
    });
  });