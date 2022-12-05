/*
college-majors/majors-list (https://fivethirtyeight.datasettes.com/fivethirtyeight/college-majors~2Fmajors-list)
by Simon Willison (https://github.com/simonw)
is licensed by CC 4.0 (https://creativecommons.org/licenses/by/4.0/).
*/
const majors = [
	[
		1,
		"1100",
		"GENERAL AGRICULTURE",
		"Agriculture & Natural Resources"
	],
	[
		2,
		"1101",
		"AGRICULTURE PRODUCTION AND MANAGEMENT",
		"Agriculture & Natural Resources"
	],
	[
		3,
		"1102",
		"AGRICULTURAL ECONOMICS",
		"Agriculture & Natural Resources"
	],
	[
		4,
		"1103",
		"ANIMAL SCIENCES",
		"Agriculture & Natural Resources"
	],
	[
		5,
		"1104",
		"FOOD SCIENCE",
		"Agriculture & Natural Resources"
	],
	[
		6,
		"1105",
		"PLANT SCIENCE AND AGRONOMY",
		"Agriculture & Natural Resources"
	],
	[
		7,
		"1106",
		"SOIL SCIENCE",
		"Agriculture & Natural Resources"
	],
	[
		8,
		"1199",
		"MISCELLANEOUS AGRICULTURE",
		"Agriculture & Natural Resources"
	],
	[
		9,
		"1302",
		"FORESTRY",
		"Agriculture & Natural Resources"
	],
	[
		10,
		"1303",
		"NATURAL RESOURCES MANAGEMENT",
		"Agriculture & Natural Resources"
	],
	[
		11,
		"6000",
		"FINE ARTS",
		"Arts"
	],
	[
		12,
		"6001",
		"DRAMA AND THEATER ARTS",
		"Arts"
	],
	[
		13,
		"6002",
		"MUSIC",
		"Arts"
	],
	[
		14,
		"6003",
		"VISUAL AND PERFORMING ARTS",
		"Arts"
	],
	[
		15,
		"6004",
		"COMMERCIAL ART AND GRAPHIC DESIGN",
		"Arts"
	],
	[
		16,
		"6005",
		"FILM VIDEO AND PHOTOGRAPHIC ARTS",
		"Arts"
	],
	[
		17,
		"6007",
		"STUDIO ARTS",
		"Arts"
	],
	[
		18,
		"6099",
		"MISCELLANEOUS FINE ARTS",
		"Arts"
	],
	[
		19,
		"1301",
		"ENVIRONMENTAL SCIENCE",
		"Biology & Life Science"
	],
	[
		20,
		"3600",
		"BIOLOGY",
		"Biology & Life Science"
	],
	[
		21,
		"3601",
		"BIOCHEMICAL SCIENCES",
		"Biology & Life Science"
	],
	[
		22,
		"3602",
		"BOTANY",
		"Biology & Life Science"
	],
	[
		23,
		"3603",
		"MOLECULAR BIOLOGY",
		"Biology & Life Science"
	],
	[
		24,
		"3604",
		"ECOLOGY",
		"Biology & Life Science"
	],
	[
		25,
		"3605",
		"GENETICS",
		"Biology & Life Science"
	],
	[
		26,
		"3606",
		"MICROBIOLOGY",
		"Biology & Life Science"
	],
	[
		27,
		"3607",
		"PHARMACOLOGY",
		"Biology & Life Science"
	],
	[
		28,
		"3608",
		"PHYSIOLOGY",
		"Biology & Life Science"
	],
	[
		29,
		"3609",
		"ZOOLOGY",
		"Biology & Life Science"
	],
	[
		30,
		"3611",
		"NEUROSCIENCE",
		"Biology & Life Science"
	],
	[
		31,
		"3699",
		"MISCELLANEOUS BIOLOGY",
		"Biology & Life Science"
	],
	[
		32,
		"4006",
		"COGNITIVE SCIENCE AND BIOPSYCHOLOGY",
		"Biology & Life Science"
	],
	[
		33,
		"6200",
		"GENERAL BUSINESS",
		"Business"
	],
	[
		34,
		"6201",
		"ACCOUNTING",
		"Business"
	],
	[
		35,
		"6202",
		"ACTUARIAL SCIENCE",
		"Business"
	],
	[
		36,
		"6203",
		"BUSINESS MANAGEMENT AND ADMINISTRATION",
		"Business"
	],
	[
		37,
		"6204",
		"OPERATIONS LOGISTICS AND E-COMMERCE",
		"Business"
	],
	[
		38,
		"6205",
		"BUSINESS ECONOMICS",
		"Business"
	],
	[
		39,
		"6206",
		"MARKETING AND MARKETING RESEARCH",
		"Business"
	],
	[
		40,
		"6207",
		"FINANCE",
		"Business"
	],
	[
		41,
		"6209",
		"HUMAN RESOURCES AND PERSONNEL MANAGEMENT",
		"Business"
	],
	[
		42,
		"6210",
		"INTERNATIONAL BUSINESS",
		"Business"
	],
	[
		43,
		"6211",
		"HOSPITALITY MANAGEMENT",
		"Business"
	],
	[
		44,
		"6212",
		"MANAGEMENT INFORMATION SYSTEMS AND STATISTICS",
		"Business"
	],
	[
		45,
		"6299",
		"MISCELLANEOUS BUSINESS & MEDICAL ADMINISTRATION",
		"Business"
	],
	[
		46,
		"1901",
		"COMMUNICATIONS",
		"Communications & Journalism"
	],
	[
		47,
		"1902",
		"JOURNALISM",
		"Communications & Journalism"
	],
	[
		48,
		"1903",
		"MASS MEDIA",
		"Communications & Journalism"
	],
	[
		49,
		"1904",
		"ADVERTISING AND PUBLIC RELATIONS",
		"Communications & Journalism"
	],
	[
		50,
		"2001",
		"COMMUNICATION TECHNOLOGIES",
		"Computers & Mathematics"
	],
	[
		51,
		"2100",
		"COMPUTER AND INFORMATION SYSTEMS",
		"Computers & Mathematics"
	],
	[
		52,
		"2101",
		"COMPUTER PROGRAMMING AND DATA PROCESSING",
		"Computers & Mathematics"
	],
	[
		53,
		"2102",
		"COMPUTER SCIENCE",
		"Computers & Mathematics"
	],
	[
		54,
		"2105",
		"INFORMATION SCIENCES",
		"Computers & Mathematics"
	],
	[
		55,
		"2106",
		"COMPUTER ADMINISTRATION MANAGEMENT AND SECURITY",
		"Computers & Mathematics"
	],
	[
		56,
		"2107",
		"COMPUTER NETWORKING AND TELECOMMUNICATIONS",
		"Computers & Mathematics"
	],
	[
		57,
		"3700",
		"MATHEMATICS",
		"Computers & Mathematics"
	],
	[
		58,
		"3701",
		"APPLIED MATHEMATICS",
		"Computers & Mathematics"
	],
	[
		59,
		"3702",
		"STATISTICS AND DECISION SCIENCE",
		"Computers & Mathematics"
	],
	[
		60,
		"4005",
		"MATHEMATICS AND COMPUTER SCIENCE",
		"Computers & Mathematics"
	],
	[
		61,
		"2300",
		"GENERAL EDUCATION",
		"Education"
	],
	[
		62,
		"2301",
		"EDUCATIONAL ADMINISTRATION AND SUPERVISION",
		"Education"
	],
	[
		63,
		"2303",
		"SCHOOL STUDENT COUNSELING",
		"Education"
	],
	[
		64,
		"2304",
		"ELEMENTARY EDUCATION",
		"Education"
	],
	[
		65,
		"2305",
		"MATHEMATICS TEACHER EDUCATION",
		"Education"
	],
	[
		66,
		"2306",
		"PHYSICAL AND HEALTH EDUCATION TEACHING",
		"Education"
	],
	[
		67,
		"2307",
		"EARLY CHILDHOOD EDUCATION",
		"Education"
	],
	[
		68,
		"2308",
		"SCIENCE AND COMPUTER TEACHER EDUCATION",
		"Education"
	],
	[
		69,
		"2309",
		"SECONDARY TEACHER EDUCATION",
		"Education"
	],
	[
		70,
		"2310",
		"SPECIAL NEEDS EDUCATION",
		"Education"
	],
	[
		71,
		"2311",
		"SOCIAL SCIENCE OR HISTORY TEACHER EDUCATION",
		"Education"
	],
	[
		72,
		"2312",
		"TEACHER EDUCATION: MULTIPLE LEVELS",
		"Education"
	],
	[
		73,
		"2313",
		"LANGUAGE AND DRAMA EDUCATION",
		"Education"
	],
	[
		74,
		"2314",
		"ART AND MUSIC EDUCATION",
		"Education"
	],
	[
		75,
		"2399",
		"MISCELLANEOUS EDUCATION",
		"Education"
	],
	[
		76,
		"3501",
		"LIBRARY SCIENCE",
		"Education"
	],
	[
		77,
		"1401",
		"ARCHITECTURE",
		"Engineering"
	],
	[
		78,
		"2400",
		"GENERAL ENGINEERING",
		"Engineering"
	],
	[
		79,
		"2401",
		"AEROSPACE ENGINEERING",
		"Engineering"
	],
	[
		80,
		"2402",
		"BIOLOGICAL ENGINEERING",
		"Engineering"
	],
	[
		81,
		"2403",
		"ARCHITECTURAL ENGINEERING",
		"Engineering"
	],
	[
		82,
		"2404",
		"BIOMEDICAL ENGINEERING",
		"Engineering"
	],
	[
		83,
		"2405",
		"CHEMICAL ENGINEERING",
		"Engineering"
	],
	[
		84,
		"2406",
		"CIVIL ENGINEERING",
		"Engineering"
	],
	[
		85,
		"2407",
		"COMPUTER ENGINEERING",
		"Engineering"
	],
	[
		86,
		"2408",
		"ELECTRICAL ENGINEERING",
		"Engineering"
	],
	[
		87,
		"2409",
		"ENGINEERING MECHANICS PHYSICS AND SCIENCE",
		"Engineering"
	],
	[
		88,
		"2410",
		"ENVIRONMENTAL ENGINEERING",
		"Engineering"
	],
	[
		89,
		"2411",
		"GEOLOGICAL AND GEOPHYSICAL ENGINEERING",
		"Engineering"
	],
	[
		90,
		"2412",
		"INDUSTRIAL AND MANUFACTURING ENGINEERING",
		"Engineering"
	],
	[
		91,
		"2413",
		"MATERIALS ENGINEERING AND MATERIALS SCIENCE",
		"Engineering"
	],
	[
		92,
		"2414",
		"MECHANICAL ENGINEERING",
		"Engineering"
	],
	[
		93,
		"2415",
		"METALLURGICAL ENGINEERING",
		"Engineering"
	],
	[
		94,
		"2416",
		"MINING AND MINERAL ENGINEERING",
		"Engineering"
	],
	[
		95,
		"2417",
		"NAVAL ARCHITECTURE AND MARINE ENGINEERING",
		"Engineering"
	],
	[
		96,
		"2418",
		"NUCLEAR ENGINEERING",
		"Engineering"
	],
	[
		97,
		"2419",
		"PETROLEUM ENGINEERING",
		"Engineering"
	],
	[
		98,
		"2499",
		"MISCELLANEOUS ENGINEERING",
		"Engineering"
	],
	[
		99,
		"2500",
		"ENGINEERING TECHNOLOGIES",
		"Engineering"
	],
	[
		100,
		"2501",
		"ENGINEERING AND INDUSTRIAL MANAGEMENT",
		"Engineering"
	],
	[
		101,
		"2502",
		"ELECTRICAL ENGINEERING TECHNOLOGY",
		"Engineering"
	],
	[
		102,
		"2503",
		"INDUSTRIAL PRODUCTION TECHNOLOGIES",
		"Engineering"
	],
	[
		103,
		"2504",
		"MECHANICAL ENGINEERING RELATED TECHNOLOGIES",
		"Engineering"
	],
	[
		104,
		"2599",
		"MISCELLANEOUS ENGINEERING TECHNOLOGIES",
		"Engineering"
	],
	[
		105,
		"5008",
		"MATERIALS SCIENCE",
		"Engineering"
	],
	[
		106,
		"4002",
		"NUTRITION SCIENCES",
		"Health"
	],
	[
		107,
		"6100",
		"GENERAL MEDICAL AND HEALTH SERVICES",
		"Health"
	],
	[
		108,
		"6102",
		"COMMUNICATION DISORDERS SCIENCES AND SERVICES",
		"Health"
	],
	[
		109,
		"6103",
		"HEALTH AND MEDICAL ADMINISTRATIVE SERVICES",
		"Health"
	],
	[
		110,
		"6104",
		"MEDICAL ASSISTING SERVICES",
		"Health"
	],
	[
		111,
		"6105",
		"MEDICAL TECHNOLOGIES TECHNICIANS",
		"Health"
	],
	[
		112,
		"6106",
		"HEALTH AND MEDICAL PREPARATORY PROGRAMS",
		"Health"
	],
	[
		113,
		"6107",
		"NURSING",
		"Health"
	],
	[
		114,
		"6108",
		"PHARMACY PHARMACEUTICAL SCIENCES AND ADMINISTRATION",
		"Health"
	],
	[
		115,
		"6109",
		"TREATMENT THERAPY PROFESSIONS",
		"Health"
	],
	[
		116,
		"6110",
		"COMMUNITY AND PUBLIC HEALTH",
		"Health"
	],
	[
		117,
		"6199",
		"MISCELLANEOUS HEALTH MEDICAL PROFESSIONS",
		"Health"
	],
	[
		118,
		"1501",
		"AREA ETHNIC AND CIVILIZATION STUDIES",
		"Humanities & Liberal Arts"
	],
	[
		119,
		"2601",
		"LINGUISTICS AND COMPARATIVE LANGUAGE AND LITERATURE",
		"Humanities & Liberal Arts"
	],
	[
		120,
		"2602",
		"FRENCH GERMAN LATIN AND OTHER COMMON FOREIGN LANGUAGE STUDIES",
		"Humanities & Liberal Arts"
	],
	[
		121,
		"2603",
		"OTHER FOREIGN LANGUAGES",
		"Humanities & Liberal Arts"
	],
	[
		122,
		"3301",
		"ENGLISH LANGUAGE AND LITERATURE",
		"Humanities & Liberal Arts"
	],
	[
		123,
		"3302",
		"COMPOSITION AND RHETORIC",
		"Humanities & Liberal Arts"
	],
	[
		124,
		"3401",
		"LIBERAL ARTS",
		"Humanities & Liberal Arts"
	],
	[
		125,
		"3402",
		"HUMANITIES",
		"Humanities & Liberal Arts"
	],
	[
		126,
		"4001",
		"INTERCULTURAL AND INTERNATIONAL STUDIES",
		"Humanities & Liberal Arts"
	],
	[
		127,
		"4801",
		"PHILOSOPHY AND RELIGIOUS STUDIES",
		"Humanities & Liberal Arts"
	],
	[
		128,
		"4901",
		"THEOLOGY AND RELIGIOUS VOCATIONS",
		"Humanities & Liberal Arts"
	],
	[
		129,
		"5502",
		"ANTHROPOLOGY AND ARCHEOLOGY",
		"Humanities & Liberal Arts"
	],
	[
		130,
		"6006",
		"ART HISTORY AND CRITICISM",
		"Humanities & Liberal Arts"
	],
	[
		131,
		"6402",
		"HISTORY",
		"Humanities & Liberal Arts"
	],
	[
		132,
		"6403",
		"UNITED STATES HISTORY",
		"Humanities & Liberal Arts"
	],
	[
		133,
		"2201",
		"COSMETOLOGY SERVICES AND CULINARY ARTS",
		"Industrial Arts & Consumer Services"
	],
	[
		134,
		"2901",
		"FAMILY AND CONSUMER SCIENCES",
		"Industrial Arts & Consumer Services"
	],
	[
		135,
		"3801",
		"MILITARY TECHNOLOGIES",
		"Industrial Arts & Consumer Services"
	],
	[
		136,
		"4101",
		"PHYSICAL FITNESS PARKS RECREATION AND LEISURE",
		"Industrial Arts & Consumer Services"
	],
	[
		137,
		"5601",
		"CONSTRUCTION SERVICES",
		"Industrial Arts & Consumer Services"
	],
	[
		138,
		"5701",
		"ELECTRICAL, MECHANICAL, AND PRECISION TECHNOLOGIES AND PRODUCTION",
		"Industrial Arts & Consumer Services"
	],
	[
		139,
		"5901",
		"TRANSPORTATION SCIENCES AND TECHNOLOGIES",
		"Industrial Arts & Consumer Services"
	],
	[
		140,
		"4000",
		"MULTI/INTERDISCIPLINARY STUDIES",
		"Interdisciplinary"
	],
	[
		141,
		"3201",
		"COURT REPORTING",
		"Law & Public Policy"
	],
	[
		142,
		"3202",
		"PRE-LAW AND LEGAL STUDIES",
		"Law & Public Policy"
	],
	[
		143,
		"5301",
		"CRIMINAL JUSTICE AND FIRE PROTECTION",
		"Law & Public Policy"
	],
	[
		144,
		"5401",
		"PUBLIC ADMINISTRATION",
		"Law & Public Policy"
	],
	[
		145,
		"5402",
		"PUBLIC POLICY",
		"Law & Public Policy"
	],
	[
		146,
		"bbbb ",
		"N/A (less than bachelor's degree)",
		null
	],
	[
		147,
		"5000",
		"PHYSICAL SCIENCES",
		"Physical Sciences"
	],
	[
		148,
		"5001",
		"ASTRONOMY AND ASTROPHYSICS",
		"Physical Sciences"
	],
	[
		149,
		"5002",
		"ATMOSPHERIC SCIENCES AND METEOROLOGY",
		"Physical Sciences"
	],
	[
		150,
		"5003",
		"CHEMISTRY",
		"Physical Sciences"
	],
	[
		151,
		"5004",
		"GEOLOGY AND EARTH SCIENCE",
		"Physical Sciences"
	],
	[
		152,
		"5005",
		"GEOSCIENCES",
		"Physical Sciences"
	],
	[
		153,
		"5006",
		"OCEANOGRAPHY",
		"Physical Sciences"
	],
	[
		154,
		"5007",
		"PHYSICS",
		"Physical Sciences"
	],
	[
		155,
		"5098",
		"MULTI-DISCIPLINARY OR GENERAL SCIENCE",
		"Physical Sciences"
	],
	[
		156,
		"5102",
		"NUCLEAR, INDUSTRIAL RADIOLOGY, AND BIOLOGICAL TECHNOLOGIES",
		"Physical Sciences"
	],
	[
		157,
		"5200",
		"PSYCHOLOGY",
		"Psychology & Social Work"
	],
	[
		158,
		"5201",
		"EDUCATIONAL PSYCHOLOGY",
		"Psychology & Social Work"
	],
	[
		159,
		"5202",
		"CLINICAL PSYCHOLOGY",
		"Psychology & Social Work"
	],
	[
		160,
		"5203",
		"COUNSELING PSYCHOLOGY",
		"Psychology & Social Work"
	],
	[
		161,
		"5205",
		"INDUSTRIAL AND ORGANIZATIONAL PSYCHOLOGY",
		"Psychology & Social Work"
	],
	[
		162,
		"5206",
		"SOCIAL PSYCHOLOGY",
		"Psychology & Social Work"
	],
	[
		163,
		"5299",
		"MISCELLANEOUS PSYCHOLOGY",
		"Psychology & Social Work"
	],
	[
		164,
		"5403",
		"HUMAN SERVICES AND COMMUNITY ORGANIZATION",
		"Psychology & Social Work"
	],
	[
		165,
		"5404",
		"SOCIAL WORK",
		"Psychology & Social Work"
	],
	[
		166,
		"4007",
		"INTERDISCIPLINARY SOCIAL SCIENCES",
		"Social Science"
	],
	[
		167,
		"5500",
		"GENERAL SOCIAL SCIENCES",
		"Social Science"
	],
	[
		168,
		"5501",
		"ECONOMICS",
		"Social Science"
	],
	[
		169,
		"5503",
		"CRIMINOLOGY",
		"Social Science"
	],
	[
		170,
		"5504",
		"GEOGRAPHY",
		"Social Science"
	],
	[
		171,
		"5505",
		"INTERNATIONAL RELATIONS",
		"Social Science"
	],
	[
		172,
		"5506",
		"POLITICAL SCIENCE AND GOVERNMENT",
		"Social Science"
	],
	[
		173,
		"5507",
		"SOCIOLOGY",
		"Social Science"
	],
	[
		174,
		"5599",
		"MISCELLANEOUS SOCIAL SCIENCES",
		"Social Science"
	]
]

export default majors;