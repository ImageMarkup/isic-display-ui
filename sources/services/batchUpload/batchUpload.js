import AWS from "aws-sdk";
import ajaxActions from "../ajaxActions";
import createDatasetModel from "../../models/createDatasetModel";
import constants from "../../constants";

class BatchUploadService {
	constructor(view, form, uploader, buttonDeleteFile, datasetInfoPanel) {
		this._view = view;
		this._form = form;
		this._uploader = uploader;
		this._buttonDeleteFiles = buttonDeleteFile;
		this._datasetInfoPanel = datasetInfoPanel;
		this._init();
	}

	_init() {
		this._descriptionTemplate = this._view.$scope.getDescriptionTemplate();
		webix.extend(this._view, webix.ProgressBar);

		ajaxActions.getDataset({detail: true})
			.then((data) => {
				if (data && data.filter) {
					const preparedData = data.filter((item) => {
						const newItem = webix.copy(item);
						newItem.id = item._id;
						if (newItem._accessLevel >= 1) {
							return newItem;
						}
					});

					this._form.elements.dataset.getList().parse(preparedData);
					let hasDatasetCreated = createDatasetModel.getHasDatasetCreated();
					if (hasDatasetCreated) {
						let createdDatasetId = this._form.elements.dataset.getList().getFirstId();
						this._form.elements.dataset.getList().select(createdDatasetId);
						this._form.elements.dataset.setValue(createdDatasetId);
						hasDatasetCreated = false;
						createDatasetModel.setHasDatasetCreated(hasDatasetCreated);
					}
				}
			});

		this._form.elements.dataset.attachEvent("onChange", (newv) => {
			const dataset = this._form.elements.dataset.getList().getItem(newv);
			this._form.setValues(dataset, true);
			this._descriptionTemplate.setValues(dataset.description);
			this._datasetInfoPanel.show();
		});

		this._uploader.attachEvent("onBeforeFileAdd", (file) => {
			if (this._uploader.files.count() !== 0 || file.type !== "zip") {
				webix.alert({type: "alert-warning", text: "You can upload only one zip archive"});
				return false;
			}
			this._uploader.filename = file.name;
			return true;
		});

		this._uploader.attachEvent("onAfterFileAdd", () => {
			this._buttonDeleteFiles.enable();
		});

		this._uploader.attachEvent("onFileUploadError", (item, response) => {
			webix.message({type: "error", text: "Uploading error"});
		});

		this._buttonDeleteFiles.attachEvent("onItemClick", () => {
			this._uploader.files.clearAll(); // remove all files from uploader
			this._buttonDeleteFiles.disable();
		});

		this._form.elements.submit.attachEvent("onItemClick", () => {
			const values = this._form.getValues();
			if (!this._uploader.files.count()) {
				webix.alert(
					{
						type: "alert-warning",
						text: "There is no file for uploading. Please, add zip archive"
					});
				return;
			}
			if (this._form.validate()) {
				const datasetWebixId = values.dataset;
				const datasetItem = this._form.elements.dataset.getList().getItem(datasetWebixId);
				const datasetId = datasetItem._id;
				let signatureObject = {
					signature: values.signature
				};

				this._uploader.files.find((obj) => {
					this._view.showProgress();
					ajaxActions.postBatchUpload(datasetId, signatureObject)
						.then((responseData) => {
							AWS.config.update({
								accessKeyId: responseData.accessKeyId,
								secretAccessKey: responseData.secretAccessKey,
								sessionToken: responseData.sessionToken
							});

							// Store batch identifier
							let batchId = responseData.batchId;

							let s3 = new AWS.S3({
								apiVersion: "2006-03-01"
							});

							let params = {
								Bucket: responseData.bucketName,
								Key: responseData.objectKey,
								Body: obj.file
							};
							s3.upload(params, (err, data) => {
								if (err) {
									this._view.hideProgress();
								}
								else {
									ajaxActions.finalizePostBatchUpload(datasetId, batchId)
										.then(() => {
											webix.message("You've uploaded zip archive to the server!");
											this._buttonDeleteFiles.callEvent("onItemClick");
											this._view.hideProgress();
											const path = `${constants.PATH_REGISTER_METADATA}?datasetId=${datasetId}`;
											this._view.$scope.app.show(path);
										})
										.fail(() => {
											this._buttonDeleteFiles.callEvent("onItemClick");
											this._view.hideProgress();
										});
								}
							});
						})
						.fail(() => {
							this._buttonDeleteFiles.callEvent("onItemClick");
							this._view.hideProgress();
						});
				});
			}
		});
	}
}

export default BatchUploadService;
