/* ============================================================
   jQuery 3.7.1 (latest stable, slim build)
   ============================================================ */
!function(e,t){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(C,e){"use strict";var t=[],E=Object.getPrototypeOf,s=t.slice,D=t.flat?function(e){return t.flat.call(e)}:function(e){return t.concat.apply([],e)},k=t.push; /* ... jQuery 3.7.1 minified code continues ... */ });
/* ============================================================
   FUNNY GUY CUSTOM CODE
   ============================================================ */
$(function () {
    // Make all parts draggable
    $(".draggable").draggable({
        helper: "clone",
        revert: "invalid"
    });

    // Stickman area as drop zone
    $("#right-column").droppable({
        accept: ".draggable",
        drop: function (event, ui) {
            const dropped = $(ui.helper).clone();
            dropped.removeClass("ui-draggable-dragging");

            // Position relative to stickman area
            dropped.css({
                position: "absolute",
                left: ui.offset.left - $(this).offset().left,
                top: ui.offset.top - $(this).offset().top,
                width: "80px",
                cursor: "move"
            });

            // Make dropped part movable inside stickman
            dropped.draggable({
                containment: "#right-column"
            });

            $(this).append(dropped);
        }
    });
});
