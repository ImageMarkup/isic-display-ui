import {JetView} from "webix-jet";

/*
 config: closed = true/false, type = left/right
 */
function getConfig(collapsedViewId, config) {
	const BTN_CLOSED_STATE_ID = `collapser-btn-closed-${webix.uid()}`;
	const BTN_OPENED_STATE_ID = `collapser-btn-opened-${webix.uid()}`;
	return {
		css: "collapser",
		width: 23,
		rows: [
			{
				view: "template",
				template: config && config.type === "left" ?
					"<span class='webix_icon fa-angle-left'></span>" :
					"<span class='webix_icon fa-angle-right'></span>",
				css: "collapser-btn",
				id: BTN_OPENED_STATE_ID,
				hidden: config && config.closed,
				onClick: {
					"collapser-btn": function () {
						const collapsedView = $$(collapsedViewId);
						collapsedView.hide();
						this.hide();
						$$(BTN_CLOSED_STATE_ID).show();
						webix.ui.resize();
					}
				}
			},
			{
				view: "template",
				template: config && config.type === "left" ?
				"<span class='webix_icon fa-angle-right'></span>" :
				"<span class='webix_icon fa-angle-left'></span>",
				css: "collapser-btn",
				id: BTN_CLOSED_STATE_ID,
				hidden: !(config && config.closed),
				onClick: {
					"collapser-btn": function () {
						const collapsedView = $$(collapsedViewId);
						collapsedView.show();
						this.hide();
						$$(BTN_OPENED_STATE_ID).show();
						webix.ui.resize();
					}
				}
			}
		]
	};
}

export default {
	getConfig
}
