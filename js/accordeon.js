var acc = document.getElementsByClassName("accordion");

for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function() {
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("show");

        // alert(this.getAttribute("aria-expanded"));
        //if aria-expanded is true set to false else set to true
        if (this.getAttribute("aria-expanded") == "true") {
            // this.element.attributeName = "false";
            this.setAttribute("aria-expanded", "false");
            // alert("false");
        } else {
            // this.element.attributeName = "true";
            this.setAttribute("aria-expanded", "true");
            // alert("true");
        }

    }
}