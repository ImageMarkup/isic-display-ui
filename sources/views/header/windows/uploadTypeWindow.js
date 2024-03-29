import constants from "../../../constants";
import state from "../../../models/state";
import auth from "../../../services/auth";
import windowWithHeader from "../../components/windowWithHeader";
import template from "../../templates/uploadTypeBtns.html";

const body = {
	width: 800,
	rows: [
		{
			view: "template",
			template,
			autoheight: true,
			borderless: true,
			onClick: {
				"wizzard-upload-btn": function () {
					if (auth.canCreateDataset()) {
						this.getTopParentView().hide();
						state.app.show(constants.PATH_WIZZARD_UPLOADER);
					}
				},
				"batch-upload-btn": function () {
					if (auth.canCreateDataset()) {
						this.getTopParentView().hide();
						state.app.show(constants.PATH_BATCH_UPLOADER);
					}
				}
			}
		}
	]
};

function getConfig(id) {
	return windowWithHeader.getConfig(id, body, "Contribute to Archive");
}

function getIdFromConfig() {
	return windowWithHeader.getIdFromConfig();
}

export default {
	getConfig,
	getIdFromConfig
};
