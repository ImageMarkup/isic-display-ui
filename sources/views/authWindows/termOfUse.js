import windowWithHeader from "../components/windowWithHeader";
import authService from "../../services/auth";

import termsOfUseDownloadingPanel from "../parts/termsOfUseLinks";
import constants from "../../constants";
import mdTemplate from "../templates/termsOfUse.md";
import mdLoader from "../../services/mdLoader";

const body = {
	width: 700,
	paddingX: 20,
	paddingY: 10,
	rows: [
		{
			align: "absolute",
			body: {
				view: "scrollview",
				height: 250,
				body: {
					rows: [
						{
							view: "template",
							template: () => `<div class='inner-page-content terms-of-use'>${mdLoader.render(mdTemplate)}</div>`,
							autoheight: true,
							borderless: true
						}
					]
				}
			}
		},
		termsOfUseDownloadingPanel.getDownloadingPanel(),
		{
			paddingY: 10,
			cols: [
				{},
				{
					view: "button",
					css: "btn-contour",
					value: "I Accept",
					width: 100,
					on: {
						onItemClick() {
							const thisWindow = this.getTopParentView();
							if (typeof thisWindow.okCallback === "function") {
								thisWindow.okCallback();
							}
							authService.acceptTermOfUse().then(() => {
								this.getTopParentView().hide();
							});
						}
					}
				},
				{width: 15},
				{
					view: "button",
					css: "btn",
					value: "I decline",
					width: 100,
					on: {
						onItemClick() {
							this.getTopParentView().hide();
							authService.showMainPage();
						}
					}
				}
			]
		}
	]
};

function getConfig(id) {
	return windowWithHeader.getConfig(id, body, "Terms of Use", authService.showMainPage);
}

function getIdFromConfig() {
	return windowWithHeader.getIdFromConfig();
}

export default {
	getConfig,
	getIdFromConfig
};
