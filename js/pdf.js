window.onload = function() {
    document.getElementById('generePDF').addEventListener('click', () => {
        kendo.pdf.defineFont({
            //Si on doit utiliser une police sur un CDN
            //"DejaVu Sans": "https://cdn.kendostatic.com/2017.2.621/styles/fonts/DejaVu/DejaVuSans.ttf"
            //Sinon on les importe en dur dans l'arbo
            'Roboto': 'fonts/Roboto/Roboto-Regular.ttf',
            'Roboto|Bold': 'fonts/Roboto/Roboto-Bold.ttf'
                //Exemple pour les variantes de font
                // 'Verdana|Bold|Italic': '/fonts/Verdana_Bold_Italic.ttf',

        });

        kendo.drawing
            .drawDOM("#imprime", {
                paperSize: "A4",
                margin: { top: "1cm", bottom: "1cm" },
                scale: 0.4,
                template: $("#page-template").html(),
                height: 500
            })
            .then(function(group) {
                kendo.drawing.pdf.saveAs(group, "le_nord_aide_les_aidants.pdf")
            });


    })

}