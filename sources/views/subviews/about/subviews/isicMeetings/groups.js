import {JetView} from "webix-jet";

import "app-components/templateWithImages";
import BreadcrumbsManager from "app-services/breadcrumbs";
import mdLoader from "app-services/mdLoader";
import mdTemplate from "app-templates/about/isicMeetings/groups.md";

export default class IsicMeetingsGroups extends JetView {
	config() {
		const ui = {
			rows: [
				BreadcrumbsManager.getBreadcrumbsTemplate("about:isicMeetingsGroups"),
				{
					view: "templateWithImages",
					template: () => `<div class='inner-page-content'>${mdLoader.render(mdTemplate)}</div>`,
					autoheight: true,
					borderless: true
				}
			]
		};
		return ui;
	}
}
