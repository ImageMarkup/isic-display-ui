import {JetView/* , plugins */} from "webix-jet";

// import BreadcrumbsManager from "../../../services/breadcrumbs";
import constants from "../../../constants";
import state from "../../../models/state";
import authService from "../../../services/auth";
import DatasetViewService from "../../../services/dataset/dataset";
import accessControlWindow from "./windows/accessControl";
// import datasetModel from "../../../models/dataset";
// import accView from "./parts/accordionView";

const DATASET_ACCORDION_ID = "dataset-accordion-id";
const PAGER_ID = "pager-id";
const CLONE_PAGER_ID = "clone-pager-id";
const CONTENT_HEADER_TEMPLATE_ID = "content-header-template";
const ACCESS_CONTROL_WINDOW_ID = "access-control-window";

export default class DatasetView extends JetView {
	config() {
		const accordion = {
			id: DATASET_ACCORDION_ID,
			view: "accordion",
			type: "wide",
			collapsed: true,
			multi: true,
			rows: []
		};

		const pager = {
			view: "pager",
			id: PAGER_ID,
			master: false,
			size: 8,
			template: "{common.prev()} {common.next()} "
		};

		// we need all the same properties for cloned pager. we will clone it in init method
		const clonePager = webix.extend({
			id: CLONE_PAGER_ID,
			css: {"margin-top": "0 !important"}
		}, pager, false);

		const headerTemplate = {
			id: CONTENT_HEADER_TEMPLATE_ID,
			template(data) {
				let addButtomHtml = authService.canCreateDataset() ? "<span class='site-btn add-dataset-btn' title='Create new dataset'>+</span>" : "";
				return `<div class='page-header-info'><h2 class='main-subtitle2'>Datasets</h2> ${addButtomHtml} <div class='page-header-item'>${data.count} items</div></div>`;
			},
			borderless: true,
			autoheight: true,
			data: {count: ""}
		};

		const ui = {
			margin: 10,
			rows: [
				// BreadcrumbsManager.getBreadcrumbsTemplate("dataset"),
				headerTemplate,
				pager,
				accordion,
				{
					rows: [
						{},
						clonePager,
						{height: 5}
					]
				}
			]
		};
		return ui;
	}

	init(view) {
		this._setAccessWindow = this.ui(accessControlWindow.getConfig(ACCESS_CONTROL_WINDOW_ID));
		this.datasetViewService = new DatasetViewService(
			view,
			$$(PAGER_ID),
			$$(CLONE_PAGER_ID),
			$$(CONTENT_HEADER_TEMPLATE_ID),
			$$(DATASET_ACCORDION_ID),
			this._setAccessWindow
		);
	}

	async urlChange() {
		// remain previous state of accordion
		const parentViewName = this.getParentView().getName();
		let pageNumber = 0;
		let selectedDatasetIdsSet;
		// dataset may be a part of dashboard page
		if (parentViewName === constants.NAME_VIEW_DASHBOARD) {
			pageNumber = state.dashboard.datasetPage || 0;
			selectedDatasetIdsSet = state.dashboard.selectedDatasetIdsSet;
			this.datasetViewService.load(pageNumber, selectedDatasetIdsSet);
		}
		// then it is separate dataset page and we should check terms of use
		const isTermsOfUseAccepted = await authService.isTermsOfUseAccepted();
		if (isTermsOfUseAccepted) {
			this.datasetViewService.load(pageNumber, selectedDatasetIdsSet);
		}
		else {
			authService.showTermOfUse(() => {
				this.datasetViewService.load(pageNumber, selectedDatasetIdsSet);
			});
		}
	}
}
