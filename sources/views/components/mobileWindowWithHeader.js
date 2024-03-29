let configId;

function getConfig(id, windowBody, windowTitle, closeCallback) {
	configId = id || `window-${webix.uid()}`;
	return {
		view: "window",
		id: configId,
		css: "window-with-header",
		modal: true,
		position: "center",
		headHeight: 30,
		move: false,
		head: {
			view: "toolbar",
			css: "window-header-toolbar",
			borderless: true,
			type: "clean",
			height: 32,
			cols: [
				{
					template: windowTitle || "",
					css: "window-header-toolbar-text main-subtitle3",
					borderless: true,
					autoheight: true
				},
				{gravity: 0.001},
				{
					view: "button",
					css: "window-close-button",
					label: '<svg viewBox="0 0 26 26" class="close-icon-svg"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#close-icon" class="close-icon-svg-use"></use></svg>',
					type: "htmlbutton",
					width: 30,
					align: "right",
					on: {
						onItemClick() {
							this.getTopParentView().hide();
							if (typeof closeCallback === "function") {
								closeCallback();
							}
						}
					}
				},
				{width: 5}
			]
		},
		body: windowBody
	};
}

function getIdFromConfig() {
	return configId;
}

export default {
	getConfig,
	getIdFromConfig
};
