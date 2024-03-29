function formatDateString(dateStr) {
	const date = new Date(dateStr);
	if (date === "Invalid Date") {
		return dateStr;
	}
	const format = webix.Date.dateToStr("%F %d, %Y at %H:%i:%s");
	return format(date);
}

function formatDateStringForManagement(dateStr) {
	const date = new Date(dateStr);
	if (date === "Invalid Date") {
		return dateStr;
	}
	const format = webix.Date.dateToStr("%F %d, %Y");
	return format(date);
}

export default {
	formatDateString, formatDateStringForManagement
};
