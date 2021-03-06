import {JetView} from "webix-jet";
import pager from "./parts/galleryPager";
import collapser from "../../components/collapser";
import dataview from "./parts/galleryDataview";
import GalleryService from "../../../services/gallery/gallery";
import imageWindow from "./windows/imageWindow";
import metadataWindow from "./windows/metadataWindow";
import appliedFiltersList from "./parts/appliedFiltersList";
import constants from "../../../constants";
import authService from "../../../services/auth";
import selectedImages from "../../../models/selectedGalleryImages";
import "../../components/activeList";
import utils from "../../../utils/util";
import galleryImagesUrls from "../../../models/galleryImagesUrls";
import ajax from "../../../services/ajaxActions";
import appliedFiltersModel from "../../../models/appliedFilters";
import searchButtonModel from "../../../services/gallery/searchButtonModel";


const PAGER_ID = "gallery-pager-id";
const DATAVIEW_ID = "gallery-dataview-id";
const LEFT_PANEL_ID = constants.ID_GALLERY_LEFT_PANEL;
const IMAGE_WINDOW_ID = "gallery-image-window-id";
const METADATA_WINDOW_ID = "metadata-window";
const FILTERS_FORM_ID = "filters-form";
const APPLIED_FILTERS_LIST_ID = "applied-filters-list";
const CONTENT_HEADER_ID = "content-header";
const IMAGES_SELECTION_TEMPLATE_ID = "gallery-images-selection-template";
const DOWNLOADING_MENU_ID = constants.DOWNLOAD_MENU_ID;
const SEARCH_ID = "search-field";
const CLEAR_ALL_FILTERS_TEMPLATE_ID = "clear-all-template";
const ID_ACTIVE_CART_LIST = constants.ID_GALLERY_ACTIVE_CART_LIST;
const FILTER_SCROLL_VIEW_NAME = "filter-scroll-view-name";
const tooltipForDataviewTemplatesClassName = constants.TOOLTIP_CLASS_NAME_FOR_DATAVIEW;

export default class GalleryView extends JetView {
	config() {
		const clonePagerForNameFilter = {
			view: "pager",
			name: "clonedPagerForNameSearch",
			size: 80,
			hidden: true,
			height: 36,
			width: 250,
			template(obj, common) {
				return `${common.first()} ${common.prev()}
					<input type='text' class='pager-input' value='${common.page(obj, common)}'>	<span class="pager-amount">of ${obj.limit}</span>
				${common.next()} ${common.last()}`;
			},
			on: {
				onAfterRender() {
					const currentPager = this;
					const node = this.getNode();
					const inputNode = node.getElementsByClassName("pager-input")[0];
					inputNode.addEventListener("focus", function () {
						this.prev = this.value;
					});
					inputNode.addEventListener("keyup", function (e) {
						if (e.keyCode === 13) { // enter
							let value = parseInt(this.value);
							if (value && value > 0 && value <= currentPager.data.limit) {
								currentPager.select(value - 1); // because in pager first page is 0
							}
							else {
								this.value = this.prev;
							}
						}
					});
				}
			}
		};

		const leftPanelSwitchButton = {
			view: "switch",
			name: "leftPanelSwitchButtonName",
			css: "switch-search-gallery-button",
			label: "Search by filters",
			labelRight: "Search by name",
			width: 285,
			labelWidth: 112,
			height: 30
		};

		const leftPanel = {
			id: LEFT_PANEL_ID,
			width: 400,
			paddingX: 15,
			paddingY: 15,
			margin: 20,
			rows: [
				{
					cols: [
						{},
						leftPanelSwitchButton,
						{}
					]
				},
				{
					view: "search",
					icon: "fas fa-search",
					id: SEARCH_ID,
					value: `${appliedFiltersModel.getFilterValue()}`,
					css: "gallery-search-block",
					placeholder: "Search images",
					width: 270,
					on: {
						onAfterRender: () => {
							const searchInputWidth = $$(SEARCH_ID).$width;
							const dataviewMinWidth = 800;
							searchButtonModel.setMinCurrentTargenInnerWidth(dataviewMinWidth + searchInputWidth);
							const inputNode = $$(SEARCH_ID).$view.getElementsByClassName("webix_el_box")[0];
							const tooltipText = "Clear search value";
							searchButtonModel.createTimesSearchButton($$(SEARCH_ID), inputNode, tooltipText);
						}
					}
				},
				{
					margin: 10,
					rows: [
						{
							cols: [
								{width: 10},
								{
									template: "APPLIED FILTERS",
									css: "gallery-sidebar-title",
									width: 115,
									autoheight: true,
									borderless: true
								},
								{},
								{
									id: CLEAR_ALL_FILTERS_TEMPLATE_ID,
									template: "<span class='link clear-all-filters'>Clear applied filters</span>",
									autoheight: true,
									width: 130,
									borderless: true
								},
								{width: 10}
							]
						},
						appliedFiltersList.getConfig(APPLIED_FILTERS_LIST_ID)
					]
				},
				{
					view: "scrollview",
					scroll: "y",
					name: FILTER_SCROLL_VIEW_NAME,
					css: "gallery-sidebar-attr",
					body: {
						rows: [
							{
								id: FILTERS_FORM_ID,
								view: "form",
								paddingX: 7,
								margin: 0,
								elements: []// elements will be setted after init, in gallery service
							}
						]
					}
				}
			]
		};

		const downloadingMenu = {
			view: "menu",
			hidden: true,
			id: DOWNLOADING_MENU_ID,
			css: "downloading-menu",
			width: 150,
			openAction: "click",
			submenuConfig: {
				width: 300
			},
			data: [
				{
					id: "download-menu-item",
					value: "Download as ZIP",
					submenu: [
						{id: constants.ID_MENU_DOWNLOAD_SEL_IMAGES_METADATA, value: "Download Selected Images and Metadata"},
						//{id: constants.ID_MENU_DOWNLOAD_SEL_IMAGES, value: "Download Selected Images only"},
						{id: constants.ID_MENU_DOWNLOAD_SEL_METADATA, value: "Download Selected Metadata only"},
						{id: constants.ID_MENU_DOWNLOAD_IMAGES_METADATA, value: "Download all images and metadata in ISIC archive"},
						//{id: constants.ID_MENU_DOWNLOAD_IMAGES, value: "Download Images only"},
						{id: constants.ID_MENU_DOWNLOAD_METADATA, value: "Download all metadata in ISIC archive"}
					]
				}
			],
			type: {
				subsign: true,
				height: 30,
				width: 150
			}
		};

		const createStudyButton = {
			view: "button",
			css: "btn",
			id: constants.NEW_STUDY_BUTTON_ID,
			label: "Create Study",
			hidden: true,
			name: "createStudyButtonName",
			width: 150,
			height: 30
		};

		const dataviewYCountSelction = {
			view: "richselect",
			css: "select-field gallery-y-count-selection",
			hidden: true,
			name: "dataviewYCountSelctionName",
			id: constants.ID_GALLERY_RICHSELECT,
			width: 225,
			height: 36,
			options: [
				constants.TWO_DATAVIEW_COLUMNS,
				constants.THREE_DATAVIEW_COLUMNS,
				constants.FOUR_DATAVIEW_COLUMNS,
				constants.FIVE_DATAVIEW_COLUMNS,
				constants.SIX_DATAVIEW_COLUMNS,
				constants.DEFAULT_DATAVIEW_COLUMNS
			]
		};

		const switchView = {
			view: "switch",
			hidden: true,
			name: "toggleSelectAllButtonName",
			height: 30,
			css: "gallery-images-switch",
			width: 60,
			value: 0
		};

		const galleryHeader = {
			name: "galleryHeaderName",
			rows: [
				{height: 15},
				{
					cols: [
						{
							css: "centered",
							id: CONTENT_HEADER_ID,
							template(obj) {
								const rangeHtml = `Shown images: <b>${obj.rangeStart || ""}</b>-<b>${obj.rangeFinish || ""}</b>.`;
								const totalAmountHtml = `Total amount of images: <b>${obj.totalCount || ""}</b>.`;
								const filterdAmountHtml = `Filtered images: <b>${obj.currentCount || 0}</b>`;
								let result = "";
								if (obj.filtered) {
									result = ` ${filterdAmountHtml} ${totalAmountHtml}`;
									if (obj.rangeFinish - obj.rangeStart < obj.currentCount) {
										result = `${rangeHtml} ${result}`;
									}
								}
								else {
									result = totalAmountHtml;
									if (obj.rangeFinish - obj.rangeStart < obj.totalCount) {
										result = `${rangeHtml} ${result}`;
									}
								}
								return result;
							},
							borderless: true,
							autoheight: true
						}
					]
				},
				{
					css: {overflow: "visible;"},
					cols: [
						{
							view: "template",
							maxWidth: window.innerWidth,
							minWidth: 10,
							css: "gallery-main-header",
							id: IMAGES_SELECTION_TEMPLATE_ID,
							template: () => {
								webix.delay(() => {
									const selectImagesForDownloadTemplateNode = this.imagesSelectionTemplate.$view.firstChild.firstChild;
									const tooltipTextForDownload = `You can select maximum ${constants.MAX_COUNT_IMAGES_SELECTION} images for download.`;
									searchButtonModel.createHintForSearchTimesButton(selectImagesForDownloadTemplateNode, tooltipForDataviewTemplatesClassName, tooltipTextForDownload);
								});
								const text = "<span class='gallery-select-all-images link'> Select All on the Page for Download</span>";
								const selectedImagesCount = selectedImages.count();
								if (selectedImagesCount) {
									return `${text} <span class='unselect-images-link link'><br>Unselect ${selectedImagesCount} ${selectedImagesCount === 1 ? "image" : "images"}</span>`;
								}
								return text;
							},
							borderless: true,
							autoheight: true
						},
						{
							rows: [
								{},
								switchView,
								{}
							]
						},
						{
							name: "allPagesSelector",
							css: {overflow: "visible !important;"},
							cols: [
								{
									view: "template",
									css: "gallery-main-header",
									name: "selectAllImagesOnAllPagesTemplate",
									hidden: true,
									template: () => {
										webix.delay(() => {
											const selectImagesForStudyCreationTemplateNode = this.allPagesTemplate.$view.firstChild.firstChild;
											const tooltipTextForStudy = `You can select maximum ${constants.MAX_COUNT_IMAGES_SELECTION} images for creating a study.`;
											searchButtonModel.createHintForSearchTimesButton(selectImagesForStudyCreationTemplateNode, tooltipForDataviewTemplatesClassName, tooltipTextForStudy);
										});
										const text = `<span class='gallery-select-all-images-on-all-pages link'> Select First ${constants.MAX_COUNT_IMAGES_SELECTION} images for Study Creation</span>`;
										const selectedImagesCount = selectedImages.countForStudies();
										if (selectedImagesCount) {
											return `${text} <span class='unselect-images-on-all-pages link'><br>Unselect ${selectedImagesCount} ${selectedImagesCount === 1 ? "image" : "images"}</span>`;
										}
										return text;
									},
									autoheight: true,
									borderless: true
								}
							]
						},
						{width: 13},
						dataviewYCountSelction,
						{width: 15},
						pager.getConfig(PAGER_ID, DATAVIEW_ID),
						clonePagerForNameFilter,
						{width: 10}
					]
				}
			]
		};

		const cartList = {
			view: "activeList",
			css: "cart-list-view",
			id: ID_ACTIVE_CART_LIST,
			name: "activeGalleryCartListName",
			scroll: "auto",
			width: 180,
			activeContent: {
				deleteButton: {
					view: "button",
					type: "icon",
					icon: "fas fa-times",
					width: 25,
					height: 25,
					click: (...args) => {
						this.getActiveGalleryCartList().callEvent("onDeleteButtonClick", args);
					}
				}
			},
			template: (obj, common) => {
				const IMAGE_HEIGHT = utils.getDataviewItemHeight() - 10;
				const IMAGE_WIDTH = utils.getDataviewItemWidth();
				if (typeof galleryImagesUrls.getPreviewImageUrl(obj._id) === "undefined") {
					galleryImagesUrls.setPreviewImageUrl(obj._id, ""); // to prevent sending query more than 1 time
					ajax.getImage(obj._id, IMAGE_HEIGHT, IMAGE_WIDTH).then((data) => {
						galleryImagesUrls.setPreviewImageUrl(obj._id, URL.createObjectURL(data));
					});
				}
				return `<div>
						<span class='webix_icon template-angle fas ${utils.angleIconChange(obj)}' style="color: rgba(0, 0, 0, 0.8) !important;"></span>
						<div style='float: right'>${common.deleteButton(obj, common)}</div>
 						<div class='card-list-name'>${obj.name}</div>
 						<img src="${galleryImagesUrls.getPreviewImageUrl(obj._id) || ""}" class="cart-image">
					</div>`;
			}
		};

		const cartListCollapser = collapser.getConfig(ID_ACTIVE_CART_LIST, {
			type: "right",
			closed: false
		});

		const content = {
			css: "gallery-main",
			paddingX: 15,
			rows: [
				galleryHeader,
				{height: 5},
				{
					cols: [
						dataview.getConfig(DATAVIEW_ID),
						{
							name: "cartListViewCollapsed",
							hidden: true,
							cols: [
								cartListCollapser,
								cartList
							]
						}
					]
				},
				{height: 10},
				{
					id: constants.DOWNLOAD_AND_CREATE_STUDY_BUTTON_LAYOUT_ID,
					height: 1,
					cols: [
						{width: 10},
						createStudyButton,
						downloadingMenu,
						{}
					]
				},
				{height: 10}
			]

		};

		const leftCollapser = collapser.getConfig(LEFT_PANEL_ID, {
			type: "left"
		});

		const leftPanelWithCollapser = {
			name: "leftPanelWithCollapser",
			cols: [
				leftPanel,
				leftCollapser
			]
		};

		const ui = {
			type: "clean",
			rows: [
				{
					cols: [
						leftPanelWithCollapser,
						content
					]
				}
			]
		};
		return ui;
	}

	init(view) {
		const filterScrollView = view.queryView({name: FILTER_SCROLL_VIEW_NAME});
		this.listCollapsedView = this.getCartListCollapsedView();
		this.imageWindow = this.ui(imageWindow.getConfig(IMAGE_WINDOW_ID));
		this.metadataWindow = this.ui(metadataWindow.getConfig(METADATA_WINDOW_ID));
		this.allPagesTemplate = this.getSelectAllImagesOnAllPagesTemplate();
		this.allPagesSelector = this.getAllPagesSelector();
		this.galleryHeader = this.getGalleryHeader();
		this.createStudyButton = this.getCreateStudyButton();
		this.imagesSelectionTemplate = $$(IMAGES_SELECTION_TEMPLATE_ID);
		this.dataviewYCountSelection = this.getDataviewYCountSelection();
		this.activeGalleryList = this.getActiveGalleryCartList();
		this.toggleButton = this.getToggleButton();
		this._galleryService = new GalleryService(
			view,
			$$(PAGER_ID),
			$$(DATAVIEW_ID),
			$$(CONTENT_HEADER_ID),
			this.imageWindow,
			$$(imageWindow.getViewerId()),
			$$(imageWindow.getMetadataLayoutId()),
			this.metadataWindow,
			$$(metadataWindow.getMetadataLayoutId()),
			$$(FILTERS_FORM_ID),
			$$(appliedFiltersList.getIdFromConfig()),
			this.imagesSelectionTemplate,
			$$(DOWNLOADING_MENU_ID),
			$$(SEARCH_ID),
			$$(CLEAR_ALL_FILTERS_TEMPLATE_ID),
			this.allPagesTemplate,
			filterScrollView
		);
	}

	ready() {
		const hiddenLeftPanel = utils.getHiidenGalleryLeftPanel();
		if (hiddenLeftPanel) {
			const leftPanelCollapser = this.getLeftPanelWithCollapser().queryView({state: "wasOpened"});
			leftPanelCollapser.config.onClick["collapser-btn"](leftPanelCollapser);
		}
		this.app.callEvent("needSelectHeaderItem", [{itemName: constants.ID_HEADER_MENU_GALLERY}]);
		if (authService.isTermsOfUseAccepted()) {
			this._galleryService.load();
		}
		else {
			authService.showTermOfUse(() => {
				this._galleryService.load();
			});
		}
		if (authService.isLoggedin()) {
			this.dataviewYCountSelection.show();
			if (authService.isStudyAdmin()) {
				this.imagesSelectionTemplate.define("maxWidth", 235);
				this.allPagesTemplate.show();
				this.toggleButton.show();
			}
		}
	}

	getSelectAllImagesOnAllPagesTemplate() {
		return this.getRoot().queryView({name: "selectAllImagesOnAllPagesTemplate"});
	}

	getCreateStudyButton() {
		return this.getRoot().queryView({name: "createStudyButtonName"});
	}

	getDataviewYCountSelection() {
		return this.getRoot().queryView({name: "dataviewYCountSelctionName"});
	}

	getAllPagesSelector() {
		return this.getRoot().queryView({name: "allPagesSelector"});
	}

	getGalleryHeader() {
		return this.getRoot().queryView({name: "galleryHeaderName"});
	}

	getActiveGalleryCartList() {
		return this.getRoot().queryView({name: "activeGalleryCartListName"});
	}

	getToggleButton() {
		return this.getRoot().queryView({name: "toggleSelectAllButtonName"});
	}

	getLeftPanelToggleButton() {
		return this.getRoot().queryView({name: "leftPanelSwitchButtonName"});
	}

	getClonedPagerForNameSearch() {
		return this.getRoot().queryView({name: "clonedPagerForNameSearch"});
	}

	getCartListCollapsedView() {
		return this.getRoot().queryView({name: "cartListViewCollapsed"});
	}

	getLeftPanelWithCollapser() {
		return this.getRoot().queryView({name: "leftPanelWithCollapser"});
	}

	showList(afterInit) {
		let collapserState;
		let wasCollapsedListClosed = utils.getHiddenGalleryCartList();
		if (wasCollapsedListClosed && afterInit) {
			collapserState = "wasOpened";
		}
		else {
			collapserState = "wasClosed";
		}
		this.listCollapsedView.show();
		const listCollapser = this.listCollapsedView.queryView({state: collapserState});
		listCollapser.config.onClick["collapser-btn"](listCollapser);
		this.changeDataviewYCount();
	}

	hideList() {
		this.listCollapsedView.hide();
		this.changeDataviewYCount();
	}

	changeDataviewYCount() {
		let gallerySelectionId = utils.getDataviewSelectionId();
		if (gallerySelectionId && gallerySelectionId !== constants.DEFAULT_DATAVIEW_COLUMNS) {
			const galleryRichselect = $$(constants.ID_GALLERY_RICHSELECT);
			galleryRichselect.callEvent("onChange", [gallerySelectionId]);
		}
	}
}
