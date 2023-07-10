"use strict";(self.webpackChunkholaglow=self.webpackChunkholaglow||[]).push([[630],{"./src/components/Carousel/Carousel.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CarouselDefault:()=>CarouselDefault,default:()=>Carousel_stories});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),react=__webpack_require__("./node_modules/react/index.js"),esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),index_es=__webpack_require__("./node_modules/pure-react-carousel/dist/index.es.js"),Icons=__webpack_require__("./src/icons/Icons.tsx"),injectStylesIntoStyleTag=(__webpack_require__("./node_modules/pure-react-carousel/dist/react-carousel.es.css"),__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),customCss=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/postcss-loader/dist/cjs.js!./src/components/Carousel/customCss.css"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(customCss.Z,options);customCss.Z&&customCss.Z.locals&&customCss.Z.locals;var _CarouselDefault$para,_CarouselDefault$para2,_CarouselDefault$para3,_excluded=["children","hasDots","hasControls","isIntrinsicHeight","naturalSlideHeight","naturalSlideWidth","visibleSlides","totalSlides","step","currentSlide","dragEnabled","touchEnabled"],__jsx=react.createElement,Carousel=function Carousel(_ref){var children=_ref.children,_ref$hasControls=(_ref.hasDots,_ref.hasControls),hasControls=void 0!==_ref$hasControls&&_ref$hasControls,_ref$isIntrinsicHeigh=_ref.isIntrinsicHeight,isIntrinsicHeight=void 0===_ref$isIntrinsicHeigh||_ref$isIntrinsicHeigh,_ref$naturalSlideHeig=_ref.naturalSlideHeight,naturalSlideHeight=void 0===_ref$naturalSlideHeig?100:_ref$naturalSlideHeig,_ref$naturalSlideWidt=_ref.naturalSlideWidth,naturalSlideWidth=void 0===_ref$naturalSlideWidt?100:_ref$naturalSlideWidt,_ref$currentSlide=(_ref.visibleSlides,_ref.totalSlides,_ref.step,_ref.currentSlide),currentSlide=void 0===_ref$currentSlide?1:_ref$currentSlide,_ref$dragEnabled=_ref.dragEnabled,dragEnabled=void 0!==_ref$dragEnabled&&_ref$dragEnabled,_ref$touchEnabled=_ref.touchEnabled,touchEnabled=void 0!==_ref$touchEnabled&&_ref$touchEnabled,props=(0,objectWithoutProperties.Z)(_ref,_excluded),_useState=(0,react.useState)(0),currentSlideIndex=_useState[0],setCurrentSlideIndex=_useState[1],childrens=react.Children.toArray(children);return __jsx(index_es.sj,(0,esm_extends.Z)({className:"relative w-full",isIntrinsicHeight,naturalSlideHeight,naturalSlideWidth,totalSlides:childrens.length,currentSlide,infinite:!0,lockOnWindowScroll:!0,dragEnabled,touchEnabled},props),hasControls?__jsx(index_es.jp,{onClick:function onClick(){!function handleBackButton(){setCurrentSlideIndex(0===currentSlideIndex?childrens.length-1:currentSlideIndex-1)}()}},__jsx(Icons.r_,{height:20,width:20,className:"rotate-180"})):null,hasControls?__jsx(index_es.P1,{onClick:function onClick(){!function handleNextButton(){currentSlideIndex===childrens.length-1?setCurrentSlideIndex(0):setCurrentSlideIndex(currentSlideIndex+1)}()}},__jsx(Icons.r_,{height:20,width:20})):null,__jsx(index_es.iR,null,childrens.map((function(children,i){return __jsx(index_es.Mi,{index:i,key:i},children)}))))};Carousel.displayName="Carousel",Carousel.__docgenInfo={description:"",methods:[],displayName:"Carousel",props:{hasDots:{defaultValue:{value:"false",computed:!1},required:!1,tsType:{name:"boolean"},description:""},hasControls:{defaultValue:{value:"false",computed:!1},required:!1,tsType:{name:"boolean"},description:""},isIntrinsicHeight:{defaultValue:{value:"true",computed:!1},required:!1,tsType:{name:"boolean"},description:""},naturalSlideHeight:{defaultValue:{value:"100",computed:!1},required:!1,tsType:{name:"number"},description:""},naturalSlideWidth:{defaultValue:{value:"100",computed:!1},required:!1,tsType:{name:"number"},description:""},visibleSlides:{defaultValue:{value:"1",computed:!1},required:!1,tsType:{name:"number"},description:""},totalSlides:{defaultValue:{value:"1",computed:!1},required:!1,tsType:{name:"number"},description:""},step:{defaultValue:{value:"1",computed:!1},required:!1,tsType:{name:"number"},description:""},currentSlide:{defaultValue:{value:"1",computed:!1},required:!1,tsType:{name:"number"},description:""},dragEnabled:{defaultValue:{value:"false",computed:!1},required:!1,tsType:{name:"boolean"},description:""},touchEnabled:{defaultValue:{value:"false",computed:!1},required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""}}};try{Carousel.displayName="Carousel",Carousel.__docgenInfo={description:"",displayName:"Carousel",props:{hasDots:{defaultValue:{value:"false"},description:"",name:"hasDots",required:!1,type:{name:"boolean"}},hasControls:{defaultValue:{value:"false"},description:"",name:"hasControls",required:!1,type:{name:"boolean"}},isIntrinsicHeight:{defaultValue:{value:"true"},description:"",name:"isIntrinsicHeight",required:!1,type:{name:"boolean"}},naturalSlideHeight:{defaultValue:{value:"100"},description:"",name:"naturalSlideHeight",required:!1,type:{name:"number"}},naturalSlideWidth:{defaultValue:{value:"100"},description:"",name:"naturalSlideWidth",required:!1,type:{name:"number"}},visibleSlides:{defaultValue:{value:"1"},description:"",name:"visibleSlides",required:!1,type:{name:"number"}},totalSlides:{defaultValue:{value:"1"},description:"",name:"totalSlides",required:!1,type:{name:"number"}},step:{defaultValue:{value:"1"},description:"",name:"step",required:!1,type:{name:"number"}},currentSlide:{defaultValue:{value:"1"},description:"",name:"currentSlide",required:!1,type:{name:"number"}},dragEnabled:{defaultValue:{value:"false"},description:"",name:"dragEnabled",required:!1,type:{name:"boolean"}},touchEnabled:{defaultValue:{value:"false"},description:"",name:"touchEnabled",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Carousel/Carousel.tsx#Carousel"]={docgenInfo:Carousel.__docgenInfo,name:"Carousel",path:"src/components/Carousel/Carousel.tsx#Carousel"})}catch(__react_docgen_typescript_loader_error){}var Carousel_stories_jsx=react.createElement;function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,defineProperty.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const Carousel_stories={component:Carousel,tags:["autodocs"]};var CarouselDefault={render:function render(){return Carousel_stories_jsx(Carousel,{totalSlides:4,currentSlide:0,class:"w-[50%] m-auto"},Carousel_stories_jsx("div",{className:"rounded-lg p-16 bg-[#e2e2e2] text-center"},"1"),Carousel_stories_jsx("div",{className:"rounded-lg p-16 bg-[#e2e2e2] text-center"},"2"),Carousel_stories_jsx("div",{className:"rounded-lg p-16 bg-[#e2e2e2] text-center"},"3"),Carousel_stories_jsx("div",{className:"rounded-lg p-16 bg-[#e2e2e2] text-center"},"4"))}};CarouselDefault.parameters=_objectSpread(_objectSpread({},CarouselDefault.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_CarouselDefault$para=CarouselDefault.parameters)||void 0===_CarouselDefault$para?void 0:_CarouselDefault$para.docs),{},{source:_objectSpread({originalSource:"{\n  render: () => <Carousel totalSlides={4} currentSlide={0} class='w-[50%] m-auto'>\n      <div className='rounded-lg p-16 bg-[#e2e2e2] text-center'>1</div>\n      <div className='rounded-lg p-16 bg-[#e2e2e2] text-center'>2</div>\n      <div className='rounded-lg p-16 bg-[#e2e2e2] text-center'>3</div>\n      <div className='rounded-lg p-16 bg-[#e2e2e2] text-center'>4</div>\n    </Carousel>\n}"},null===(_CarouselDefault$para2=CarouselDefault.parameters)||void 0===_CarouselDefault$para2||null===(_CarouselDefault$para3=_CarouselDefault$para2.docs)||void 0===_CarouselDefault$para3?void 0:_CarouselDefault$para3.source)})})},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/postcss-loader/dist/cjs.js!./src/components/Carousel/customCss.css":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,"/* Avoid black border on sliders */\n.carousel__slide-focus-ring {\n  display: none;\n}\n","",{version:3,sources:["webpack://./src/components/Carousel/customCss.css"],names:[],mappings:"AAAA,kCAAkC;AAClC;EACE,aAAa;AACf",sourcesContent:["/* Avoid black border on sliders */\n.carousel__slide-focus-ring {\n  display: none;\n}\n"],sourceRoot:""}]);const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);