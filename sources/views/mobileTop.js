import {JetView} from "webix-jet";

import MobileHeader from "./header/mobileHeader";

export default class MobileTopView extends JetView {
	config() {
		const ui = {
			view: "scrollview",
			scroll: false,
			body: {
				rows: [
					MobileHeader,
					{$subview: true}
				]
			}
		};
		return ui;
	}
}
