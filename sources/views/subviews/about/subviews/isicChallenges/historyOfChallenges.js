import {JetView} from "webix-jet";

import "app-components/templateWithImages";
import BreadcrumbsManager from "app-services/breadcrumbs";
import mdLoader from "app-services/mdLoader";
import mdTemplate from "app-templates/about/isicChallenges/history.md";

export default class IsicChallengesHistory extends JetView {
	config() {
		const ui = {
			rows: [
				BreadcrumbsManager.getBreadcrumbsTemplate("about:isicChallengesHistory"),
				{
					view: "templateWithImages",
					template: () => `<div class='inner-page-content history-page'>${mdLoader.render(mdTemplate)}</div>`,
					autoheight: true,
					borderless: true
				}
			]
		};
		return ui;
	}
}
