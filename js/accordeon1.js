//TODO:
(function accessibleAccordionClosure() {
    var controls = document.querySelectorAll(".js-accordion-control");

    //Sets the initial aria roles for the accordion component.
    function setupAriaRoles(control, lastUsed) {
        lastUsed = lastUsed || 0;

        var parent = control.parentElement,
            content = parent.querySelectorAll(".js-accordion-content"),
            id = "accordionContent" + lastUsed;

        if (content.length === 0) {
            return 0;
        }
        content = content[0];
        while (document.getElementById(id) !== null) {
            lastUsed++;
            id = "accordionContent" + lastUsed;
        }

        control.setAttribute("aria-controls", id);
        control.setAttribute("aria-role", "tab");
        control.setAttribute("id", "accordionControl" + lastUsed);
        control.setAttribute("aria-expanded", "false");
        control.setAttribute("aria-selected", "false");

        content.setAttribute("id", id);
        content.setAttribute("aria-hidden", "true");
        content.setAttribute("aria-role", "tab-panel");
        content.setAttribute("aria-labelledby", "accordionControl" + lastUsed);
        //Make the content pane focusable.
        content.setAttribute("tabindex", "-1");

        return ++lastUsed;
    }

    //Handles what happens when a control is clicked.
    function handleControlClick() {
        var control = this,
            parent = control.parentElement,
            content = parent.querySelectorAll(".js-accordion-content"),
            isExpanded;

        if (content.length === 0) {
            return false;
        }
        content = content[0];
        isExpanded = control.getAttribute("aria-expanded");
        isExpanded = (isExpanded !== "true");

        control.classList.toggle("closed");
        control.setAttribute("aria-expanded", isExpanded + "");
        content.setAttribute("aria-hidden", !isExpanded + "");

        if (isExpanded) {
            content.focus();
        }
    }

    //Selects the previous control from the passed in one.
    //If the current control is the first, select the last.
    function selectPreviousControl(currentControl, selectLast) {
        var parent = currentControl.parentElement,
            newParent,
            newControl;
        if (parent.previousElementSibling && selectLast !== true) {
            newParent = parent.previousElementSibling;
        } else {
            newParent = parent.parentElement.querySelectorAll(".js-accordion-section:last-of-type");
            if (newParent.length === 0) {
                return false;
            }
            newParent = newParent[0];
        }
        newControl = newParent.querySelectorAll(".js-accordion-control");
        if (newControl.length === 0) {
            return false;
        }
        newControl = newControl[0];
        newControl.focus();
    }

    //Selects the next control from the passed in one.
    //If the current control is the last, select the first.
    function selectNextControl(currentControl, selectFirst) {
        var parent = currentControl.parentElement,
            newParent,
            newControl;
        if (parent.nextElementSibling && selectFirst !== true) {
            newParent = parent.nextElementSibling;
        } else {
            newParent = parent.parentElement.querySelectorAll(".accordion-section:first-of-type");
            if (newParent.length === 0) {
                return false;
            }
            newParent = newParent[0];
        }
        newControl = newParent.querySelectorAll(".js-accordion-control");
        if (newControl.length === 0) {
            return false;
        }
        newControl = newControl[0];
        newControl.focus();
    }

    //The function that runs when a key is pressed and a control has focus.
    function handleKeyPress(e) {
        var control = document.activeElement;
        switch (e.keyCode) {
            case 35:
                //End
                selectPreviousControl(control, true);
                break;
            case 36:
                //Home
                selectNextControl(control, true);
                break;
            case 37:
                //Left arrow
                selectPreviousControl(control);
                break;
            case 38:
                //Up arrow
                selectPreviousControl(control);
                break;
            case 39:
                //Right arrow
                selectNextControl(control);
                break;
            case 40:
                //Down arrow
                selectNextControl(control);
                break;
        }
    };

    //Handles when a control gains focus.
    function handleFocus() {
        this.setAttribute("aria-selected", "true");
        this.addEventListener("keyup", handleKeyPress);
    }

    //Handles when a control loses focus.
    function handleBlur() {
        this.setAttribute("aria-selected", "false");
        this.removeEventListener("keyup", handleKeyPress);
    }

    //Only run if the controls exist.
    if (controls.length === 0) {
        return false;
    }

    //Initializes the accordion.
    (function initClosure() {
        var lastUsed = 0,
            control;
        for (var i = controls.length - 1; i >= 0; i--) {
            control = controls[i];
            lastUsed = setupAriaRoles(control, lastUsed);
            //Close the control
            control.classList.add("closed");

            //Setup the click listeners for the controls.
            control.removeEventListener("click", handleControlClick);
            control.addEventListener("click", handleControlClick);
            //End setup click listeners for controls.

            //Setup the onfocus listeners for the controls.
            control.addEventListener("focus", handleFocus);
            control.addEventListener("blur", handleBlur);
            //End setup onfocus listeners for controle.
        }
    })();
})();