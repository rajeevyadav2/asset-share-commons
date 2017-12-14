/*
 * Asset Share Commons
 *
 * Copyright [2017]  Adobe
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*global jQuery: false, AssetShare: false; MyAssetShare: false*/

var MyAssetShare = MyAssetShare || {};
MyAssetShare.SemanticUI = MyAssetShare.SemanticUI || {};
MyAssetShare.SemanticUI.Modals = MyAssetShare.SemanticUI.Modals || {};


/* This implementation doesnt have to be a 'new' cart modal, since we can just draft on the OOTB CartModal JS implementation.
   All this needs to do is attach an event listener to the View Contact Sheet button and make a call and pass the asset paths to it.
 */
jQuery((function($, ns, cart, semanticModal, contactSheetModal) {
    "use strict";

    /* Copy over method from cart.js as its not exposed via the modal */
    /* We need to collect this data from the `cart` in order to pass it to the Contact Sheet Modal via the line: semanticModal.show([contactSheetModal.modal(asFormData())]);
 */
    function asFormData() {
        var formData = new ns.FormData();

        cart.paths().forEach(function (path) {
            formData.add("path", path);
        });

        // Set this to prevent odd placeholder injection when running on AEM Author; This will be a NOOP
        formData.add("wcmmode", "disabled");

        return formData;
    }

    /** REGISTER NEW CONTACT SHEET EVENTS **/

    $((function registerEvents() {
        /* Since the OOTB cart.js is loaded w/ and it binds all the events, etc. we can just handle our new click and let the OOTB CartModal handle the other actions */
        /* This requires the other data-asset-share-id's in the cart-with-contact-sheet to match for the event binding in cart.js */
        $("body").on("click", ns.Elements.selector(["view-contact-sheet"]), function(e) {

            e.preventDefault();
            e.stopPropagation();

            semanticModal.show([contactSheetModal.modal(asFormData())]);
        });

    }()));

}(jQuery,
    AssetShare,
    AssetShare.Cart,
    AssetShare.SemanticUI.Modal,
    MyAssetShare.SemanticUI.Modals.ContactSheetModal)));
