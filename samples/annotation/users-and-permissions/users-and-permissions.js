WebViewer({
  path: '../../../lib',
  pdftronServer: 'https://demo.pdftron.com/', // comment this out to do client-side only
  initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf'
}, document.getElementById('viewer'))
  .then(function(instance) {
    instance.setAnnotationUser('Justin');
    instance.setAdminUser(true);
    instance.openElement('notesPanel');

    document.getElementById('justin').onchange = function() {
      instance.setAnnotationUser('Justin');
      instance.setAdminUser(true);
      instance.setReadOnly(false);
      instance.setToolMode('AnnotationEdit');
    };

    document.getElementById('sally').onchange = function() {
      instance.setAnnotationUser('Sally');
      instance.setAdminUser(false);
      instance.setReadOnly(false);
      instance.setToolMode('AnnotationEdit');
    };

    document.getElementById('brian').onchange = function() {
      instance.setAnnotationUser('Brian');
      instance.setAdminUser(false);
      instance.setReadOnly(true);
      instance.setToolMode('AnnotationEdit');
    };

    document.getElementById('display').onchange = function(e) {
      var currentUser = instance.getAnnotationUser();
      var allAnnotations = instance.annotManager.getAnnotationsList().filter(function(annot) {
        return annot.Listable
      });

      if (e.target.checked) {
        instance.annotManager.showAnnotations(allAnnotations);
      } else {
        var annotationsToHide = allAnnotations.filter(function(annot) {
          return annot.Author !== currentUser
        });
        instance.annotManager.hideAnnotations(annotationsToHide);
      }
    };
  });