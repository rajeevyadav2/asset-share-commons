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

jQuery((function($, ns, semanticModal) {
    "use strict";
    MyAssetShare.SemanticUI.Modals.ContactSheetModal = (function () {
        var CONTACT_SHEET_URL = "/content/asset-share-commons/en/light/actions/contact-sheet.html", //ns.Data.val("contact-sheet-url"),
            CONTACT_SHEET_MODAL_ID = "contact-sheet-modal";

        function getId() {
            return CONTACT_SHEET_MODAL_ID;
        }

        function getUrl() {
            return CONTACT_SHEET_URL;
        }

        function getModal(formDataOrAssetPath) {
            var formData = formDataOrAssetPath;

            if (typeof formDataOrAssetPath === 'string') {
                formData = new ns.FormData();
                formData.add("path", formDataOrAssetPath);
            }

            return {
                id: CONTACT_SHEET_MODAL_ID,
                url: CONTACT_SHEET_URL,
                data: formData.serialize(),
                options: {
                    show: function (modal) {
                        modal.modal("show");
                    }
                }
            };
        }

        return {
            id: getId,
            url: getUrl,
            modal: getModal
        };
    }());
}(jQuery,
    AssetShare,
    AssetShare.SemanticUI.Modal)));

