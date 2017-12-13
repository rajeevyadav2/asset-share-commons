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

jQuery((function($, ns, cart, semanticModal, contactSheetModal) {
    "use strict";
    AssetShare.SemanticUI.Modals.CartWithContactSheetModal = (function () {
        var CART_URL = ns.Data.val("cart-url"),
            CART_MODAL_ID = "cart-modal";

        function asFormData() {
            var formData = new ns.FormData();

            cart.paths().forEach(function (path) {
                formData.add("path", path);
            });

            // Set this to prevent odd placeholder injection when running on AEM Author; This will be a NOOP
            formData.add("wcmmode", "disabled");

            return formData;
        }

        function serialize() {
            return asFormData().serialize();
        }

        function getId() {
            return CART_MODAL_ID;
        }

        function getModal() {
            return {
                id: CART_MODAL_ID,
                url: CART_URL,
                data: serialize(),
                options: {}
            };
        }

        function show(e) {
            e.preventDefault();
            e.stopPropagation();

            semanticModal.show([getModal()]);
        }

        function viewContactSheet(e) {
            e.preventDefault();
            e.stopPropagation();

            semanticModal.show([contactSheetModal.modal(asFormData())]);
        }

        /** REGISTER EVENTS **/

        $((function registerEvents() {
            /* Since the OOTB cart.js is loaded w/ and it binds all the events, etc. we can just handle our new click and let the OOTB CartModal handle the other actions */
            /* This requires the other data-asset-share-id's in the cart-with-contact-sheet to match for the event binding in cart.js */
            $("body").on("click", ns.Elements.selector(["view-contact-sheet"]), viewContactSheet);

        }()));

        return {
            show: show
        };
    }());
}(jQuery,
    AssetShare,
    AssetShare.Cart,
    AssetShare.SemanticUI.Modal,
    MyAssetShare.SemanticUI.Modals.ContactSheetModal)));
