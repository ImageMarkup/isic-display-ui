export default {
	CONTENT_WIDTH: 1220,

	COOKIE_VERSION_KEY: "app-version",
	KEY_TOKEN: "girderToken",
	KEY_ACCEPT_TERMS: "acceptTerms",

	TEXT_PASSWORD_REQUIREMENTS: "Password must contain at least 6 characters, must not include spaces.",

	MAX_COUNT_IMAGES_SELECTION: 50,

	SELECTED_BY_ALL_ON_PAGE: "allOnPage",
	SELECTED_BY_ON_ALL_PAGES: "onAllPages",

	PATTERN_PASSWORD: "^[!@_#$%^&?*()\"\\\/0-9a-zA-Z]{6,15}$",
	PATTERN_PASSWORD_HAS_SPEC_SYMBOLS: "[!@_#$%^&?*()\"\\\/0-9]+",
	PATTERN_LOGIN: "^[a-zA-Z]{1}[a-zA-Z0-9_.]{3,}$",

	ID_WINDOW_RECOVERY: "recovery-window",
	ID_WINDOW_LOGIN: "login-window",
	ID_WINDOW_SIGNUP: "signup-window",
	ID_WINDOW_UPLOAD_TYPE: "upload-type-selection",
	ID_WINDOW_CHALLENGES_TYPE: "challenges-type-selection",
	ID_WINDOW_API: "api-info-window",
	ID_WINDOW_ACCESS_REQUEST: "create-dataset-access-request-window",
	ID_WINDOW_TERMS_OF_USE: "term-of-use-window",
	ID_MOBILE_WINDOW_TERMS_OF_USE: "mobile-term-of-use-window",
	ID_MOBILE_LANDSCAPE_TERMS_OF_USE: "mobile-landscape-term-of-use-window",

	ID_MENU_DOWNLOAD_SEL_IMAGES_METADATA: "download-selected-images-metadata",
	ID_MENU_DOWNLOAD_SEL_IMAGES: "download-selected-images",
	ID_MENU_DOWNLOAD_SEL_METADATA: "download-selected-metadata",
	ID_MENU_DOWNLOAD_IMAGES_METADATA: "download-images-metadata",
	ID_MENU_DOWNLOAD_IMAGES: "download-images",
	ID_MENU_DOWNLOAD_METADATA: "download-metadata",

	ID_HEADER_MENU_MAIN: "isic",
	ID_HEADER_MENU_ABOUT: "about",
	ID_HEADER_MENU_FORUM: "forum",
	ID_HEADER_MENU_GALLERY: "gallery",
	ID_HEADER_MENU_CHALLENGES: "challenges",
	ID_HEADER_MENU_STUDIES: "studies",
	ID_HEADER_MENU_DERMO: "dermo",
	ID_HEADER_MENU_ARCHIVE: "archive",
	ID_HEADER_MENU_DOWNLOAD: "download",
	ID_HEADER_MENU_DASHBOARD: "dashboard",
	ID_HEADER_SUB_MENU_CHALLENGE2016: "challenge2016",
	ID_HEADER_SUB_MENU_CHALLENGE2017: "challenge2017",
	ID_HEADER_SUB_MENU_CHALLENGE2018: "challenge2018",
	ID_HEADER_SUB_MENU_CHALLENGE2019: "challenge2019",
	ID_HEADER_SUB_MENU_CHALLENGE2020: "challenge2020",
	ID_HEADER_SUB_MENU_CHALLENGES_LIVE: "challenges-live",
	ID_GALLERY_RICHSELECT: "gallery-richselect-viewid",
	ID_GALLERY_ACTIVE_CART_LIST: "active-cart-list-id",
	ID_GALLERY_LEFT_PANEL: "gallery-left-panel",
	ID_GALLERY_RIGHT_PANEL: "gallery-right-panel",

	NEW_STUDY_BUTTON_ID: "create-new-study-button-id",
	DOWNLOAD_MENU_ID: "download-menu",
	DOWNLOAD_AND_CREATE_STUDY_BUTTON_LAYOUT_ID: "gallery-buttons-layout-id",
	DOWNLOAD_ZIP_SINGLE_IMAGE: "download-zip-single-image",
	DOWNLOAD_FULL_RESOLUTION_IMAGE: "download-full-resolution-image",
	DOWNLOAD_SELECTED_IMAGES: "download-selected-images",
	DOWNLOAD_FILTERED_IMAGES: "download-filtered-images",

	ID_GALLERY_CONTEXT_MENU_SAVE_IMAGE: "Save image",

	PYTHON_MENU_ID: "Python",
	R_MENU_ID: "R",

	TWO_DATAVIEW_COLUMNS: "Display two columns",
	THREE_DATAVIEW_COLUMNS: "Display three columns",
	FOUR_DATAVIEW_COLUMNS: "Display four columns",
	FIVE_DATAVIEW_COLUMNS: "Display five columns",
	SIX_DATAVIEW_COLUMNS: "Display six columns",
	DEFAULT_DATAVIEW_COLUMNS: "Automatic width compilation",

	PATH_MULTIRATER: "/topWithHeader/onlyHeaderTop/multirater",
	PATH_MAIN: "/topWithHeader/wideContentTop/main",
	PATH_STUDIES: "/topWithHeader/tightDarkContentTop/studies",
	PATH_GALLERY: "/topWithHeader/onlyHeaderTop/gallery",
	PATH_GALLERY_MOBILE: "/mobileTop/onlyHeaderTop/mobileGallery",
	PATH_MEDICAL_DISCLAIMER: "/topWithHeader/tightDarkContentTop/medicalDisclaimer",
	PATH_PRIVACY_POLICY: "/topWithHeader/tightDarkContentTop/privacyPolicy",
	PATH_TERMS_OF_USE: "/topWithHeader/tightDarkContentTop/termsOfUse",
	PATH_DASHBOARD: "/topWithHeader/tightContentTop/dashboard",
	PATH_USER_ACCOUNT: "/topWithHeader/tightContentTop/userAccount",
	PATH_CREATE_DATASET: "/topWithHeader/tightContentTop/createDataset",
	PATH_UPLOAD_DATA: "/topWithHeader/tightContentTop/uploadData",
	PATH_MANAGEMENT_UI: "/topWithHeader/wideContentTop/managementUI",
	PATH_MANAGEMENT_UI_ABOUT: "/topWithHeader/wideContentTop/managementUI/aboutManagement",
	PATH_MANAGEMENT_COLLECTIONS: "/topWithHeader/wideContentTop/managementUI/managementCollections",
	PATH_MANAGEMENT_GROUPS: "/topWithHeader/wideContentTop/managementUI/managementGroups",
	PATH_MANAGEMENT_USERS: "/topWithHeader/wideContentTop/managementUI/managementUsers",
	PATH_INVITE_USER: "/topWithHeader/tightContentTop/inviteUser",
	PATH_WIZZARD_UPLOADER: "/topWithHeader/tightContentTop/wizardUploader",
	PATH_CHALLENGES: "/topWithHeader/tightContentTop/challenges",
	PATH_BATCH_UPLOADER: "/topWithHeader/tightContentTop/batchUploader",
	PATH_APPLY_METADATA: "/topWithHeader/tightContentTop/applyMetadata",
	PATH_REGISTER_METADATA: "/topWithHeader/tightContentTop/registerMetadata",
	PATH_CREATE_STUDY: "/topWithHeader/tightContentTop/createStudy",
	PATH_API_DOCUMENTATION: "/topWithHeader/onlyHeaderTop/apiDocumentation",
	// about section
	PATH_ABOUT: "/topWithHeader/tightContentTop/about",
	PATH_ABOUT_CONTACT_INFO: "/topWithHeader/tightContentTop/about/contactInfo",
	PATH_ABOUT_HISTORY: "/topWithHeader/tightContentTop/about/isicHistory",
	PATH_ABOUT_ISIC_STANDARDS: "/topWithHeader/tightContentTop/about/isicStandards",
	PATH_ABOUT_LITERATURE: "/topWithHeader/tightContentTop/about/literature",
	PATH_ABOUT_WORKING_GROUPS: "/topWithHeader/tightContentTop/about/workingGroups",
	PATH_ABOUT_PARTNERS_AND_SPONSORS: "/topWithHeader/tightContentTop/about/partnersAndSponsors",

	PATH_ABOUT_ISIC_OVERVIEW: "/topWithHeader/tightContentTop/about/aboutIsicOverview",
	PATH_ABOUT_ISIC_BACKGROUND: "/topWithHeader/tightContentTop/about/aboutIsicBackground",
	PATH_ABOUT_ISIC_GOALS: "/topWithHeader/tightContentTop/about/aboutIsicGoals",
	PATH_ABOUT_ISIC_ORGANIZATION: "/topWithHeader/tightContentTop/about/aboutIsicOrganization",
	PATH_ABOUT_ISIC_SPONSORS_AND_PARTNERS: "/topWithHeader/tightContentTop/about/aboutIsicSponsorsAndPartners",
	PATH_ABOUT_WG_TECHNOLOGY: "/topWithHeader/tightContentTop/about/workingGroupsTechnology",
	PATH_ABOUT_WG_TECHNIQUE: "/topWithHeader/tightContentTop/about/workingGroupsTechnique",
	PATH_ABOUT_WG_TERMINOLOGY: "/topWithHeader/tightContentTop/about/workingGroupsTerminology",
	PATH_ABOUT_WG_PRIVACY: "/topWithHeader/tightContentTop/about/workingGroupsPrivacy",
	PATH_ABOUT_WG_METADATA: "/topWithHeader/tightContentTop/about/workingGroupsMetadata",
	PATH_ABOUT_WG_AI: "/topWithHeader/tightContentTop/about/workingGroupsAI",
	PATH_ABOUT_WG_EDUCATION: "/topWithHeader/tightContentTop/about/workingGroupsEducation",
	PATH_ABOUT_ARCHIVE_GOALS: "/topWithHeader/tightContentTop/about/isicArchiveGoals",
	PATH_ABOUT_ARCHIVE_CONTENT: "/topWithHeader/tightContentTop/about/isicArchiveContent",
	PATH_ABOUT_ARCHIVE_INFRASTRUCTURE: "/topWithHeader/tightContentTop/about/isicArchiveInfrastructure",
	PATH_ABOUT_ARCHIVE_DATA_DICTIONARY: "/topWithHeader/tightContentTop/about/isicArchiveDataDictionary",
	PATH_ABOUT_CHALLENGES_GOALS: "/topWithHeader/tightContentTop/about/isicChallengesGoals",
	PATH_ABOUT_CHALLENGES_GRAND_V_LIVE: "/topWithHeader/tightContentTop/about/isicChallengesGrandVLive",
	PATH_ABOUT_CHALLENGES_HISTORY: "/topWithHeader/tightContentTop/about/isicChallengesHistory",
	PATH_ABOUT_CHALLENGES_PLANNED: "/topWithHeader/tightContentTop/about/isicChallengesPlanned",
	PATH_ABOUT_MEETINGS_GROUPS: "/topWithHeader/tightContentTop/about/isicMeetingsGroups",
	PATH_ABOUT_MEETINGS_WORKSHOPS: "/topWithHeader/tightContentTop/about/isicMeetingsWorkshops",
	PATH_ABOUT_PUBLICATIONS: "/topWithHeader/tightContentTop/about/isicPublications",
	PATH_ABOUT_FAQ: "/topWithHeader/tightContentTop/about/faq",
	PATH_ABOUT_CONTACT_INFORMATION: "/topWithHeader/tightContentTop/about/contactInfo",

	PATH_DOWNLOAD_PDF_TERMS_OF_USE: "/sources/filesForDownload/termsOfUse.pdf",
	PATH_DOWNLOAD_TXT_TERMS_OF_USE: "/sources/filesForDownload/termsOfUse.txt",

	URL_ISIC_LANDING_PAGE: "https://www.isic-archive.com/",
	URL_DERMOSCOPEDIA: "https://dermoscopedia.org/Main_Page",
	URL_CHALLENGES: "https://challenge.isic-archive.com",
	URL_CHALLENGES_STATS: "https://challenge.isic-archive.com/stats",
	URL_CHALLENGES_LIVE: "https://challenge.isic-archive.com/challenges",
	URL_API: `${process.env.ISIC_NEW_API_URL}`,
	URL_CHALLENGE_2016: "https://challenge2016.isic-archive.com/",
	URL_CHALLENGE_2017: "https://challenge2017.isic-archive.com/",
	URL_CHALLENGE_2018: "https://challenge2018.isic-archive.com/",
	URL_CHALLENGE_2019: "https://challenge2019.isic-archive.com/",
	URL_CHALLENGE_2020: "https://challenge2020.isic-archive.com/",
	URL_MULTIRATER: "https://dermannotator.org/multirater/",
	URL_FORUM: "https://forum.isic-archive.com",
	URL_DASHBOARD: "https://api.isic-archive.com/stats/",
	URL_PARTICIPATE_BUTTON: "http://bit.ly/ISICpart",
	URL_NEW_API_DOCS: `${process.env.ISIC_NEW_API_DOCS_URL}`,

	NAME_VIEW_DASHBOARD: "dashboard",
	TOOLTIP_CLASS_NAME_FOR_DATAVIEW: "tooltip-for-dataview-templates",

	// Documentation page layouts ids

	ISIC_ARCHIVE_API_ID: "isicArchive",
	TERMINOLOGY_ID: "terminology",
	LIBRARIES_ID: "libraries",
	AUTHENTICATION_ID: "authentication",
	IMAGES_ID: "images",
	LIST_IMAGES_ID: "listImages",
	DETAILS_IMAGES_ID: "detailsImages",
	DOWNLOAD_IMAGES_ID: "downloadImages",
	STUDIES_ID: "studies",
	LIST_STUDIES_ID: "listStudies",
	DETAILS_STUDY_ID: "detailsStudy",
	SUPERPIXELS_ID: "superpixels",
	DOWNLOAD_SUPERPIXELS_ID: "downloadSuperpixels",
	SEGMENTATIONS_ID: "segmentations",
	LIST_SEGMENTATIONS_ID: "listSegmentations",
	DETAILS_SEGMENTATIONS_ID: "detailsSegmentations",
	DOWNLOAD_SEGMENTATIONS_ID: "downloadSegmentations",
	ANNOTATIONS_ID: "annotations",
	LIST_ANNOTATIONS_ID: "listAnnotations",
	DETAILS_ANNOTATIONS_ID: "detailsAnnotations",
	DOWNLOAD_ANNOTATIONS_ID: "downloadAnnotations",
	NULL_OPTION_VALUE: "unknown",

	DEFAULT_GALLERY_IMAGE_ICON_WIDTH: 18,
	DEFAULT_GALLERY_IMAGE_ICON_HEIGHT: 18,
	DEFAULT_GALLERY_IMAGE_ICON_CONTAINER_WIDTH: 22,
	DEFAULT_GALLERY_IMAGE_ICON_CONTAINER_HEIGHT: 22,
	DEFAULT_GALLERY_IMAGE_NAME_FONT_SIZE: 14,
	DEFAULT_GALLERY_IMAGE_WIDTH: 180,
	DEFAULT_GALLERY_IMAGE_HEIGHT: 123
};
