/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/admin/dubco-meta-box.js":
/*!*******************************************!*\
  !*** ./assets/js/admin/dubco-meta-box.js ***!
  \*******************************************/
/***/ (function() {

window.jQuery(document).ready(function ($) {
  const updateShortLink = async (postId, linkId, key) => {
    return window.wp.apiFetch({
      path: `/dubco/v1/links/${linkId}`,
      method: 'PATCH',
      data: {
        post_id: postId,
        key
      }
    });
  };
  $('.dubinc-add-class-notices').each(function () {
    $(this).addClass('notice notice-warning');
  });
  $('#dubco_create_button').on('click', function (event) {
    event.preventDefault();
    const postId = $('#post_ID').val();
    $.ajax({
      url: window.dubcoMetaBox.ajax_url,
      method: 'POST',
      data: {
        action: 'dubco_create_short_link',
        nonce: window.dubcoMetaBox.nonce,
        post_id: postId
      },
      success(response) {
        if (response.success) {
          $('#dubco-short-link').show();
          $('#dubco_short_url_id').val(response.data.id);
          $('#dubco_short_url').val(response.data.shortLink);
          $('#dubco_create_button').hide();
          $('#dubco_edit_button').show();
        } else {
          $('#dubco_error').text(response.data).show();
        }
      }
    });
  });
  $('#dubco_edit_button').on('click', function (event) {
    event.preventDefault();
    $('#dubco_short_url').hide();
    $('#dubco_edit_button').hide();
    $('#dubco_update_button').show();
    $('#dubco_key').show();
  });
  $('#dubco_update_button').on('click', async function (event) {
    event.preventDefault();
    const postId = $('#post_ID').val();
    const linkId = $('#dubco_short_url_id').val();
    const key = $('#dubco_key').val();
    $(this).text(wp.i18n.__('Updating...', 'dubinc'));
    try {
      $('#dubco_error').hide();
      const response = await updateShortLink(postId, linkId, key);
      if (response) {
        $('#dubco_short_url').val(response.shortLink).show();
        $('#dubco_key').hide();
        $('#dubco_update_button').hide();
        $('#dubco_edit_button').show();
      }
    } catch (error) {
      $('#dubco_error').addClass('error').text(error?.message || error).show();
    } finally {
      $(this).text(wp.i18n.__('Update', 'dubinc'));
    }
  });
});

/***/ }),

/***/ "./assets/css/admin/admin-style.css":
/*!******************************************!*\
  !*** ./assets/css/admin/admin-style.css ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
!function() {
"use strict";
/*!**********************************!*\
  !*** ./assets/js/admin/admin.js ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_admin_admin_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../css/admin/admin-style.css */ "./assets/css/admin/admin-style.css");
/* harmony import */ var _dubco_meta_box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dubco-meta-box */ "./assets/js/admin/dubco-meta-box.js");
/* harmony import */ var _dubco_meta_box__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_dubco_meta_box__WEBPACK_IMPORTED_MODULE_1__);


}();
/******/ })()
;
//# sourceMappingURL=admin.js.map