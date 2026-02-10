/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/editor/components/components/analytics-link.js":
/*!******************************************************************!*\
  !*** ./assets/js/editor/components/components/analytics-link.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/home/nicola/Local Sites/dub/app/public/wp-content/plugins/dubinc/assets/js/editor/components/components/analytics-link.js";


const AnalitycsLink = ({
  shortLink
}) => {
  let domain;
  let key;
  try {
    const parsedUrl = new URL(shortLink);
    domain = parsedUrl.hostname;
    key = parsedUrl.pathname.split('/')[1];
  } catch (error) {
    console.error('Invalid URL:', error);
    return null;
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dubco-analytics-link",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 3
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 4
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: `https://app.dub.co/analytics?domain=${domain}&key=${key}&tab=clicks`,
    target: "_blank",
    rel: "noopener noreferrer",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 5
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Analytics for link', 'dubinc'))));
};
/* harmony default export */ __webpack_exports__["default"] = (AnalitycsLink);

/***/ }),

/***/ "./assets/js/editor/components/dubco-side-panel.js":
/*!*********************************************************!*\
  !*** ./assets/js/editor/components/dubco-side-panel.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/editor */ "@wordpress/editor");
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_analytics_link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/analytics-link */ "./assets/js/editor/components/components/analytics-link.js");
/* harmony import */ var _assets_logo_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./assets/logo.svg */ "./assets/js/editor/components/assets/logo.svg");
/* harmony import */ var _assets_click_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./assets/click.svg */ "./assets/js/editor/components/assets/click.svg");
/* harmony import */ var _assets_click_activity_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./assets/click-activity.svg */ "./assets/js/editor/components/assets/click-activity.svg");
/* harmony import */ var _assets_lead_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./assets/lead.svg */ "./assets/js/editor/components/assets/lead.svg");
/* harmony import */ var _assets_lead_activity_svg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./assets/lead-activity.svg */ "./assets/js/editor/components/assets/lead-activity.svg");
/* harmony import */ var _assets_sale_svg__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./assets/sale.svg */ "./assets/js/editor/components/assets/sale.svg");
/* harmony import */ var _assets_sale_activity_svg__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./assets/sale-activity.svg */ "./assets/js/editor/components/assets/sale-activity.svg");
var _jsxFileName = "/home/nicola/Local Sites/dub/app/public/wp-content/plugins/dubinc/assets/js/editor/components/dubco-side-panel.js";
















const createShortLink = async postId => {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_6___default()({
    path: '/dubco/v1/links',
    method: 'POST',
    data: {
      post_id: postId
    }
  });
};
const updateShortLink = async (postId, linkId, key) => {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_6___default()({
    path: `/dubco/v1/links/${linkId}`,
    method: 'PATCH',
    data: {
      post_id: postId,
      key
    }
  });
};
const retrieveLinkInfo = async postId => {
  const query = new URLSearchParams({
    post_id: String(postId)
  }).toString();
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_6___default()({
    path: `/dubco/v1/links/info?${query}`,
    method: 'GET'
  });
};
const formatMetric = value => {
  if (!Number.isFinite(value)) {
    return '0';
  }
  return new Intl.NumberFormat().format(value);
};
const LinkMetrics = ({
  linkInfo
}) => {
  if (!linkInfo) {
    return null;
  }
  const clicks = Number(linkInfo.clicks) || 0;
  const leads = Number(linkInfo.leads) || 0;
  const sales = Number(linkInfo.sales) || 0;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dubco-link-metrics",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 3
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dubco-link-metric",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Clicks', 'dubinc'),
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Clicks', 'dubinc'),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 4
    }
  }, clicks > 0 ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_assets_click_activity_svg__WEBPACK_IMPORTED_MODULE_10__.ReactComponent, {
    className: "dubco-link-metric-icon",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 6
    }
  }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_assets_click_svg__WEBPACK_IMPORTED_MODULE_9__.ReactComponent, {
    className: "dubco-link-metric-icon",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 6
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dubco-link-metric-value",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 5
    }
  }, formatMetric(clicks))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dubco-link-metric",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Leads', 'dubinc'),
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Leads', 'dubinc'),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 4
    }
  }, leads > 0 ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_assets_lead_activity_svg__WEBPACK_IMPORTED_MODULE_12__.ReactComponent, {
    className: "dubco-link-metric-icon",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 6
    }
  }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_assets_lead_svg__WEBPACK_IMPORTED_MODULE_11__.ReactComponent, {
    className: "dubco-link-metric-icon",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 6
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dubco-link-metric-value",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81,
      columnNumber: 5
    }
  }, formatMetric(leads))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dubco-link-metric",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Sales', 'dubinc'),
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Sales', 'dubinc'),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83,
      columnNumber: 4
    }
  }, sales > 0 ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_assets_sale_activity_svg__WEBPACK_IMPORTED_MODULE_14__.ReactComponent, {
    className: "dubco-link-metric-icon",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 89,
      columnNumber: 6
    }
  }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_assets_sale_svg__WEBPACK_IMPORTED_MODULE_13__.ReactComponent, {
    className: "dubco-link-metric-icon",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 6
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dubco-link-metric-value",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93,
      columnNumber: 5
    }
  }, formatMetric(sales))));
};
const MetaBox = ({
  postStatus,
  metaFields,
  setMetaFields,
  postId
}) => {
  const [editMode, setEditMode] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [pathname, setPathname] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [error, setError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [isLoading, setIsLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [isRetrying, setIsRetrying] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [linkInfo, setLinkInfo] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const {
    _dubco_short_url,
    _dubco_short_url_id,
    _dubco_short_url_error
  } = metaFields;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    async function fetchData() {
      try {
        const response = await retrieveLinkInfo(postId);
        setLinkInfo(response);
      } catch (error) {
        setError(error?.message || error);
      }
    }
    if (postId && _dubco_short_url_id) {
      fetchData();
    }
  }, [postId, _dubco_short_url_id]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (_dubco_short_url) {
      const url = new URL(_dubco_short_url);
      setPathname(url.pathname.substring(1));
    }
  }, [_dubco_short_url]);
  if (postStatus !== 'publish') {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_editor__WEBPACK_IMPORTED_MODULE_4__.PluginDocumentSettingPanel, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Dub', 'dubinc'),
      initialOpen: false,
      icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_assets_logo_svg__WEBPACK_IMPORTED_MODULE_8__.ReactComponent, {
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 135,
          columnNumber: 11
        }
      }),
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 132,
        columnNumber: 4
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Notice, {
      status: "warning",
      isDismissible: false,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 137,
        columnNumber: 5
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('You can only create short links for published posts. ' + "A short link will be created automatically, if it doesn't exists when this post is published", 'dubinc')));
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_editor__WEBPACK_IMPORTED_MODULE_4__.PluginDocumentSettingPanel, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Dub', 'dubinc'),
    initialOpen: false,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 148,
      columnNumber: 3
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 149,
      columnNumber: 4
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 150,
      columnNumber: 5
    }
  }, _dubco_short_url && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dubco-short-link",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 153,
      columnNumber: 8
    }
  }, editMode ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    value: pathname,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Edit the pathname', 'dubinc'),
    onChange: value => setPathname(value),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 155,
      columnNumber: 10
    }
  }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    value: _dubco_short_url,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Url', 'dubinc'),
    onChange: value => setMetaFields({
      _dubco_short_url: value
    }),
    readOnly: true,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 161,
      columnNumber: 10
    }
  }), editMode ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
    variant: "primary",
    onClick: async () => {
      try {
        setError('');
        setIsLoading(true);
        const response = await updateShortLink(postId, _dubco_short_url_id, pathname);
        if (response) {
          setMetaFields({
            _dubco_short_url: response.shortLink,
            _dubco_short_url_id: response.id,
            _dubco_short_url_domain: response.domain
          });
          setLinkInfo(response);
        }
      } catch (error) {
        setError(error?.message || error);
      } finally {
        setIsLoading(false);
      }
      setEditMode(!editMode);
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 171,
      columnNumber: 10
    }
  }, isLoading ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Updating', 'dubinc') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Update', 'dubinc')) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
    variant: "primary",
    onClick: () => setEditMode(!editMode),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 204,
      columnNumber: 10
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Edit', 'dubinc'))), error && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Notice, {
    status: "error",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 212,
      columnNumber: 18
    }
  }, error), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dubco-link-metrics-container",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 213,
      columnNumber: 8
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_analytics_link__WEBPACK_IMPORTED_MODULE_7__["default"], {
    shortLink: _dubco_short_url,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 214,
      columnNumber: 9
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(LinkMetrics, {
    linkInfo: linkInfo,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 215,
      columnNumber: 9
    }
  }))), !_dubco_short_url && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dubco-creat-link",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 220,
      columnNumber: 7
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
    variant: "primary",
    disabled: isLoading,
    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Create a short link for this post', 'dubinc'),
    onClick: async () => {
      try {
        setError('');
        setIsLoading(true);
        const response = await createShortLink(postId);
        if (response) {
          setMetaFields({
            _dubco_short_url: response.shortLink,
            _dubco_short_url_id: response.id,
            _dubco_short_url_domain: response.domain
          });
          setLinkInfo(response);
        }
      } catch (error) {
        setError(error?.message || error);
      } finally {
        setIsLoading(false);
      }
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 221,
      columnNumber: 8
    }
  }, isLoading ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Creating Short Link...', 'dubinc') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Create Short Link', 'dubinc')), _dubco_short_url_error && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Notice, {
    status: "error",
    onRemove: () => {
      setMetaFields({
        _dubco_short_url_error: ''
      });
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 250,
      columnNumber: 9
    }
  }, _dubco_short_url_error, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
    variant: "secondary",
    disabled: isLoading || isRetrying,
    onClick: async () => {
      try {
        setError('');
        setIsRetrying(true);
        const response = await retrieveLinkInfo(postId);
        if (response) {
          setMetaFields({
            _dubco_short_url: response.shortLink,
            _dubco_short_url_id: response.id,
            _dubco_short_url_domain: response.domain,
            _dubco_short_url_error: ''
          });
          setLinkInfo(response);
        }
      } catch (error) {
        setError(error?.message || error);
      } finally {
        setIsRetrying(false);
      }
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 257,
      columnNumber: 10
    }
  }, isRetrying ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Retrying', 'dubinc') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Retry', 'dubinc'))), error && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Notice, {
    status: "error",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 287,
      columnNumber: 18
    }
  }, error)))));
};
const applyWithSelect = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.withSelect)(select => {
  return {
    metaFields: select('core/editor').getEditedPostAttribute('meta'),
    postStatus: select('core/editor').getEditedPostAttribute('status'),
    postId: select('core/editor').getCurrentPostId()
  };
});
const applyWithDispatch = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.withDispatch)(dispatch => {
  return {
    setMetaFields(newValue) {
      dispatch('core/editor').editPost({
        meta: newValue
      });
    }
  };
});
/* harmony default export */ __webpack_exports__["default"] = ((0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.compose)([applyWithSelect, applyWithDispatch])(MetaBox));

/***/ }),

/***/ "./assets/js/editor/components/assets/click-activity.svg":
/*!***************************************************************!*\
  !*** ./assets/js/editor/components/assets/click-activity.svg ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: function() { return /* binding */ SvgClickActivity; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _g, _defs;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgClickActivity = function SvgClickActivity(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    fill: "none"
  }, props), _g || (_g = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    stroke: "#2B7FFF",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.5,
    clipPath: "url(#click-activity_svg__a)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "m7.193 6.914 6.501 2.23c.197.068.201.346.006.418l-2.914 1.097a.22.22 0 0 0-.13.13L9.56 13.702a.222.222 0 0 1-.418-.006L6.911 7.195a.223.223 0 0 1 .283-.282zM10.691 10.693l3.744 3.744M6.887 1.555v1.777M10.66 3.117 9.402 4.375M3.117 10.66l1.258-1.258M1.555 6.889h1.777M3.117 3.117l1.258 1.258"
  }))), _defs || (_defs = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("defs", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("clipPath", {
    id: "click-activity_svg__a"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M0 0h16v16H0z"
  })))));
};

/* harmony default export */ __webpack_exports__["default"] = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzQ2Njk0Xzc3MzUxKSI+CjxwYXRoIGQ9Ik03LjE5Mjc4IDYuOTEzNTdMMTMuNjk0MSA5LjE0NDY4QzEzLjg5MTQgOS4yMTIyMyAxMy44OTUgOS40ODk1NyAxMy43MDAzIDkuNTYyNDVMMTAuNzg1NyAxMC42NTg1QzEwLjcyNjEgMTAuNjgwNyAxMC42NzgxIDEwLjcyODcgMTAuNjU1OSAxMC43ODgyTDkuNTU5ODkgMTMuNzAyOUM5LjQ4NjExIDEzLjg5NzYgOS4yMDk2NyAxMy44OTQgOS4xNDIxMSAxMy42OTY3TDYuOTExIDcuMTk1MzRDNi44NTA1NiA3LjAyMDIzIDcuMDE4NTYgNi44NTMxMiA3LjE5MzY3IDYuOTEyNjhMNy4xOTI3OCA2LjkxMzU3WiIgc3Ryb2tlPSIjMkI3RkZGIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xMC42OTE0IDEwLjY5MzRMMTQuNDM1NCAxNC40Mzc0IiBzdHJva2U9IiMyQjdGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTYuODg2NzIgMS41NTQ2OVYzLjMzMjQ3IiBzdHJva2U9IiMyQjdGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTEwLjY2MDEgMy4xMTcxOUw5LjQwMjM0IDQuMzc0OTciIHN0cm9rZT0iIzJCN0ZGRiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMy4xMTcxOSAxMC42NjAxTDQuMzc0OTcgOS40MDIzNCIgc3Ryb2tlPSIjMkI3RkZGIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xLjU1NDY5IDYuODg4NjdIMy4zMzI0NyIgc3Ryb2tlPSIjMkI3RkZGIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0zLjExNzE5IDMuMTE3MTlMNC4zNzQ5NyA0LjM3NDk3IiBzdHJva2U9IiMyQjdGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF80NjY5NF83NzM1MSI+CjxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K");

/***/ }),

/***/ "./assets/js/editor/components/assets/click.svg":
/*!******************************************************!*\
  !*** ./assets/js/editor/components/assets/click.svg ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: function() { return /* binding */ SvgClick; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _g, _defs;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgClick = function SvgClick(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    fill: "none"
  }, props), _g || (_g = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    stroke: "#404040",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.5,
    clipPath: "url(#click_svg__a)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "m7.193 6.914 6.501 2.23c.197.068.201.346.006.418l-2.914 1.097a.22.22 0 0 0-.13.13L9.56 13.702a.222.222 0 0 1-.418-.006L6.911 7.195a.223.223 0 0 1 .283-.282zM10.691 10.693l3.744 3.744M6.887 1.555v1.777M10.66 3.117 9.402 4.375M3.117 10.66l1.258-1.258M1.555 6.889h1.777M3.117 3.117l1.258 1.258"
  }))), _defs || (_defs = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("defs", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("clipPath", {
    id: "click_svg__a"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M0 0h16v16H0z"
  })))));
};

/* harmony default export */ __webpack_exports__["default"] = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzQ2Njk0Xzc3MzIxKSI+CjxwYXRoIGQ9Ik03LjE5Mjc4IDYuOTEzNTdMMTMuNjk0MSA5LjE0NDY4QzEzLjg5MTQgOS4yMTIyMyAxMy44OTUgOS40ODk1NyAxMy43MDAzIDkuNTYyNDVMMTAuNzg1NyAxMC42NTg1QzEwLjcyNjEgMTAuNjgwNyAxMC42NzgxIDEwLjcyODcgMTAuNjU1OSAxMC43ODgyTDkuNTU5ODkgMTMuNzAyOUM5LjQ4NjExIDEzLjg5NzYgOS4yMDk2NyAxMy44OTQgOS4xNDIxMSAxMy42OTY3TDYuOTExIDcuMTk1MzRDNi44NTA1NiA3LjAyMDIzIDcuMDE4NTYgNi44NTMxMiA3LjE5MzY3IDYuOTEyNjhMNy4xOTI3OCA2LjkxMzU3WiIgc3Ryb2tlPSIjNDA0MDQwIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xMC42OTE0IDEwLjY5MzRMMTQuNDM1NCAxNC40Mzc0IiBzdHJva2U9IiM0MDQwNDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTYuODg2NzIgMS41NTQ2OVYzLjMzMjQ3IiBzdHJva2U9IiM0MDQwNDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTEwLjY2MDEgMy4xMTcxOUw5LjQwMjM0IDQuMzc0OTciIHN0cm9rZT0iIzQwNDA0MCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMy4xMTcxOSAxMC42NjAxTDQuMzc0OTcgOS40MDIzNCIgc3Ryb2tlPSIjNDA0MDQwIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xLjU1NDY5IDYuODg4NjdIMy4zMzI0NyIgc3Ryb2tlPSIjNDA0MDQwIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0zLjExNzE5IDMuMTE3MTlMNC4zNzQ5NyA0LjM3NDk3IiBzdHJva2U9IiM0MDQwNDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF80NjY5NF83NzMyMSI+CjxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K");

/***/ }),

/***/ "./assets/js/editor/components/assets/lead-activity.svg":
/*!**************************************************************!*\
  !*** ./assets/js/editor/components/assets/lead-activity.svg ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: function() { return /* binding */ SvgLeadActivity; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgLeadActivity = function SvgLeadActivity(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    fill: "none"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#AD46FF",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.5,
    d: "M8 6.444a2.444 2.444 0 1 0 0-4.89 2.444 2.444 0 0 0 0 4.89M11.834 10.222A5.5 5.5 0 0 0 8 8.666a5.55 5.55 0 0 0-5.074 3.307c-.325.733.077 1.577.841 1.817 1.09.344 2.53.653 4.233.653M10 13.11l1.43 1.333 3.02-4"
  })));
};

/* harmony default export */ __webpack_exports__["default"] = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcuOTk5MTMgNi40NDM1OEM5LjM0OTE2IDYuNDQzNTggMTAuNDQzNiA1LjM0OTE2IDEwLjQ0MzYgMy45OTkxM0MxMC40NDM2IDIuNjQ5MSA5LjM0OTE2IDEuNTU0NjkgNy45OTkxMyAxLjU1NDY5QzYuNjQ5MSAxLjU1NDY5IDUuNTU0NjkgMi42NDkxIDUuNTU0NjkgMy45OTkxM0M1LjU1NDY5IDUuMzQ5MTYgNi42NDkxIDYuNDQzNTggNy45OTkxMyA2LjQ0MzU4WiIgc3Ryb2tlPSIjQUQ0NkZGIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xMS44MzQxIDEwLjIyMTZDMTAuODM3NiA5LjI2MzM1IDkuNDkxODcgOC42NjYwMiA4LjAwMDMxIDguNjY2MDJDNS43MzI3NiA4LjY2NjAyIDMuNzg3ODcgMTAuMDI2IDIuOTI1NjUgMTEuOTcyN0MyLjYwMTIgMTIuNzA2IDMuMDAyOTggMTMuNTQ5NiAzLjc2NzQyIDEzLjc5MDVDNC44NTYzMSAxNC4xMzM2IDYuMjk3MiAxNC40NDI5IDguMDAwMzEgMTQuNDQyOSIgc3Ryb2tlPSIjQUQ0NkZGIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xMCAxMy4xMUwxMS40MzAyIDE0LjQ0MzRMMTQuNDQ5OCAxMC40NDM0IiBzdHJva2U9IiNBRDQ2RkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==");

/***/ }),

/***/ "./assets/js/editor/components/assets/lead.svg":
/*!*****************************************************!*\
  !*** ./assets/js/editor/components/assets/lead.svg ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: function() { return /* binding */ SvgLead; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgLead = function SvgLead(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    fill: "none"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#404040",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.5,
    d: "M8 6.444a2.444 2.444 0 1 0 0-4.89 2.444 2.444 0 0 0 0 4.89M11.834 10.222A5.5 5.5 0 0 0 8 8.666a5.55 5.55 0 0 0-5.074 3.307c-.325.733.077 1.577.841 1.817 1.09.344 2.53.653 4.233.653M10 13.11l1.43 1.333 3.02-4"
  })));
};

/* harmony default export */ __webpack_exports__["default"] = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcuOTk5MTMgNi40NDM1OEM5LjM0OTE2IDYuNDQzNTggMTAuNDQzNiA1LjM0OTE2IDEwLjQ0MzYgMy45OTkxM0MxMC40NDM2IDIuNjQ5MSA5LjM0OTE2IDEuNTU0NjkgNy45OTkxMyAxLjU1NDY5QzYuNjQ5MSAxLjU1NDY5IDUuNTU0NjkgMi42NDkxIDUuNTU0NjkgMy45OTkxM0M1LjU1NDY5IDUuMzQ5MTYgNi42NDkxIDYuNDQzNTggNy45OTkxMyA2LjQ0MzU4WiIgc3Ryb2tlPSIjNDA0MDQwIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xMS44MzQxIDEwLjIyMTZDMTAuODM3NiA5LjI2MzM1IDkuNDkxODcgOC42NjYwMiA4LjAwMDMxIDguNjY2MDJDNS43MzI3NiA4LjY2NjAyIDMuNzg3ODcgMTAuMDI2IDIuOTI1NjUgMTEuOTcyN0MyLjYwMTIgMTIuNzA2IDMuMDAyOTggMTMuNTQ5NiAzLjc2NzQyIDEzLjc5MDVDNC44NTYzMSAxNC4xMzM2IDYuMjk3MiAxNC40NDI5IDguMDAwMzEgMTQuNDQyOSIgc3Ryb2tlPSIjNDA0MDQwIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xMCAxMy4xMUwxMS40MzAyIDE0LjQ0MzRMMTQuNDQ5OCAxMC40NDM0IiBzdHJva2U9IiM0MDQwNDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==");

/***/ }),

/***/ "./assets/js/editor/components/assets/logo.svg":
/*!*****************************************************!*\
  !*** ./assets/js/editor/components/assets/logo.svg ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: function() { return /* binding */ SvgLogo; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgLogo = function SvgLogo(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 18,
    height: 18,
    fill: "none",
    style: {
      paddingTop: 4
    },
    viewBox: "0 0 64 64"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#000",
    fillRule: "evenodd",
    d: "M32 64c17.673 0 32-14.327 32-32 0-11.844-6.435-22.186-16-27.719V48h-8v-2.14A15.9 15.9 0 0 1 32 48c-8.837 0-16-7.163-16-16s7.163-16 16-16c2.914 0 5.647.78 8 2.14V1.008A32 32 0 0 0 32 0C14.327 0 0 14.327 0 32s14.327 32 32 32",
    clipRule: "evenodd"
  })));
};

/* harmony default export */ __webpack_exports__["default"] = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHN0eWxlPSJwYWRkaW5nLXRvcDogNHB4OyIgdmlld0JveD0iMCAwIDY0IDY0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzIgNjRjMTcuNjczIDAgMzItMTQuMzI3IDMyLTMyIDAtMTEuODQ0LTYuNDM1LTIyLjE4Ni0xNi0yNy43MTlWNDhoLTh2LTIuMTRBMTUuOSAxNS45IDAgMCAxIDMyIDQ4Yy04LjgzNyAwLTE2LTcuMTYzLTE2LTE2czcuMTYzLTE2IDE2LTE2YzIuOTE0IDAgNS42NDcuNzggOCAyLjE0VjEuMDA4QTMyIDMyIDAgMCAwIDMyIDBDMTQuMzI3IDAgMCAxNC4zMjcgMCAzMnMxNC4zMjcgMzIgMzIgMzIiIGZpbGw9IiMwMDAiLz48L3N2Zz4K");

/***/ }),

/***/ "./assets/js/editor/components/assets/sale-activity.svg":
/*!**************************************************************!*\
  !*** ./assets/js/editor/components/assets/sale-activity.svg ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: function() { return /* binding */ SvgSaleActivity; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path, _path2;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgSaleActivity = function SvgSaleActivity(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    fill: "none"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#00BBA7",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.5,
    d: "M13.113 3.332v11.112l-2.445-1.334-2.666 1.334-2.667-1.334-2.444 1.334V3.332c0-.982.795-1.777 1.777-1.777h6.667c.982 0 1.778.795 1.778 1.777"
  })), _path2 || (_path2 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#00BBA7",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.5,
    d: "M9.535 5.827c-.332-.787-.997-.966-1.5-.966-.468 0-1.695.25-1.582 1.428.08.827.86 1.135 1.542 1.257.681.122 1.67.381 1.695 1.378.02.844-.738 1.42-1.654 1.42-.876 0-1.485-.34-1.72-1.111M8 4.22v.64M8 10.344v.544"
  })));
};

/* harmony default export */ __webpack_exports__["default"] = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjExMjggMy4zMzI0N1YxNC40NDM2TDEwLjY2ODQgMTMuMTEwMkw4LjAwMTc0IDE0LjQ0MzZMNS4zMzUwNyAxMy4xMTAyTDIuODkwNjIgMTQuNDQzNlYzLjMzMjQ3QzIuODkwNjIgMi4zNTAyNCAzLjY4NjE4IDEuNTU0NjkgNC42Njg0IDEuNTU0NjlIMTEuMzM1MUMxMi4zMTczIDEuNTU0NjkgMTMuMTEyOCAyLjM1MDI0IDEzLjExMjggMy4zMzI0N1oiIHN0cm9rZT0iIzAwQkJBNyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNOS41MzUwNyA1LjgyNjY2QzkuMjAyNjMgNS4wNCA4LjUzNzc0IDQuODYxMzMgOC4wMzQ2MyA0Ljg2MTMzQzcuNTY3MDcgNC44NjEzMyA2LjMzOTUyIDUuMTEwMjIgNi40NTMyOSA2LjI4ODg4QzYuNTMzMjkgNy4xMTY0NCA3LjMxMjg1IDcuNDIzOTkgNy45OTQ2MyA3LjU0NTc3QzguNjc2NDEgNy42Njc1NSA5LjY2NTc0IDcuOTI3MTEgOS42ODk3NCA4LjkyNDQ0QzkuNzEwMTggOS43NjggOC45NTE5NiAxMC4zNDQgOC4wMzU1MiAxMC4zNDRDNy4xNTk5NiAxMC4zNDQgNi41NTEwNyAxMC4wMDM2IDYuMzE2NDEgOS4yMzI4OCIgc3Ryb2tlPSIjMDBCQkE3IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik04IDQuMjIwN1Y0Ljg2MDciIHN0cm9rZT0iIzAwQkJBNyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNOCAxMC4zNDM4VjEwLjg4NzgiIHN0cm9rZT0iIzAwQkJBNyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K");

/***/ }),

/***/ "./assets/js/editor/components/assets/sale.svg":
/*!*****************************************************!*\
  !*** ./assets/js/editor/components/assets/sale.svg ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: function() { return /* binding */ SvgSale; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path, _path2;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgSale = function SvgSale(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    fill: "none"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#404040",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.5,
    d: "M13.113 3.332v11.112l-2.445-1.334-2.666 1.334-2.667-1.334-2.444 1.334V3.332c0-.982.795-1.777 1.777-1.777h6.667c.982 0 1.778.795 1.778 1.777"
  })), _path2 || (_path2 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#404040",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.5,
    d: "M9.535 5.827c-.332-.787-.997-.966-1.5-.966-.468 0-1.695.25-1.582 1.428.08.827.86 1.135 1.542 1.257.681.122 1.67.381 1.695 1.378.02.844-.738 1.42-1.654 1.42-.876 0-1.485-.34-1.72-1.111M8 4.22v.64M8 10.344v.544"
  })));
};

/* harmony default export */ __webpack_exports__["default"] = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjExMjggMy4zMzI0N1YxNC40NDM2TDEwLjY2ODQgMTMuMTEwMkw4LjAwMTc0IDE0LjQ0MzZMNS4zMzUwNyAxMy4xMTAyTDIuODkwNjIgMTQuNDQzNlYzLjMzMjQ3QzIuODkwNjIgMi4zNTAyNCAzLjY4NjE4IDEuNTU0NjkgNC42Njg0IDEuNTU0NjlIMTEuMzM1MUMxMi4zMTczIDEuNTU0NjkgMTMuMTEyOCAyLjM1MDI0IDEzLjExMjggMy4zMzI0N1oiIHN0cm9rZT0iIzQwNDA0MCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNOS41MzUwNyA1LjgyNjY2QzkuMjAyNjMgNS4wNCA4LjUzNzc0IDQuODYxMzMgOC4wMzQ2MyA0Ljg2MTMzQzcuNTY3MDcgNC44NjEzMyA2LjMzOTUyIDUuMTEwMjIgNi40NTMyOSA2LjI4ODg4QzYuNTMzMjkgNy4xMTY0NCA3LjMxMjg1IDcuNDIzOTkgNy45OTQ2MyA3LjU0NTc3QzguNjc2NDEgNy42Njc1NSA5LjY2NTc0IDcuOTI3MTEgOS42ODk3NCA4LjkyNDQ0QzkuNzEwMTggOS43NjggOC45NTE5NiAxMC4zNDQgOC4wMzU1MiAxMC4zNDRDNy4xNTk5NiAxMC4zNDQgNi41NTEwNyAxMC4wMDM2IDYuMzE2NDEgOS4yMzI4OCIgc3Ryb2tlPSIjNDA0MDQwIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik04IDQuMjIwN1Y0Ljg2MDciIHN0cm9rZT0iIzQwNDA0MCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNOCAxMC4zNDM4VjEwLjg4NzgiIHN0cm9rZT0iIzQwNDA0MCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/editor":
/*!********************************!*\
  !*** external ["wp","editor"] ***!
  \********************************/
/***/ (function(module) {

module.exports = window["wp"]["editor"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/plugins":
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["plugins"];

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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
!function() {
/*!***********************************!*\
  !*** ./assets/js/editor/index.js ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_dubco_side_panel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/dubco-side-panel */ "./assets/js/editor/components/dubco-side-panel.js");


(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_0__.registerPlugin)('dubco-side-panel', {
  render: _components_dubco_side_panel__WEBPACK_IMPORTED_MODULE_1__["default"]
});
}();
/******/ })()
;
//# sourceMappingURL=editor.js.map