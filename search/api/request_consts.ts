
// constants used for creating the search xhr

export const SEARCH_URL = "https://www.bibb.de/dienst/ausbildungplus/de/api/data";

export const SEARCH_HEADERS = {
    // "accept": "*/*",
    // "accept-language": "en-US,en;q=0.9",
    "cache-control": "max-age=0",
    "content-type": "application/json",
    // "priority": "u=1, i",
    // "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\"",
    // "sec-ch-ua-mobile": "?0",
    // "sec-ch-ua-platform": "\"Linux\"",
    // "sec-fetch-dest": "empty",
    // "sec-fetch-mode": "same-origin",
    // "sec-fetch-site": "same-origin"
};

export const REQUEST_BODY_DEFAULTS = {
    numberOfTableEntries: 10,
    datasetName: "DsFeSearch",
    sortFieldName: null,
    sortAscending: false,
    filter: null
};

export const SEARCH_PARAM_DEFAULTS = [
        {
          "fieldName": "type_1", // ausbildungsintegrierend
          "value": true
        },
        {
          "fieldName": "type_2", // praxisintegrierend
          "value": true
        },
        {
          "fieldName": "type_3", // berufsintegrierend
          "value": false
        },
        {
          "fieldName": "type_4", // berufsbegleitend
          "value": false
        },
        {
          "fieldName": "type_6", // studiumintegrierend
          "value": true
        },
        {
          "fieldName": "category_48",
          "value": false
        },
        {
          "fieldName": "category_50",
          "value": false
        },
        {
          "fieldName": "category_6",
          "value": false
        },
        {
          "fieldName": "category_37",
          "value": false
        },
        {
          "fieldName": "category_31",
          "value": false
        },
        {
          "fieldName": "category_29",
          "value": false
        },
        {
          "fieldName": "category_45",
          "value": false
        },
        {
          "fieldName": "category_3",
          "value": false
        },
        {
          "fieldName": "category_39",
          "value": false
        },
        {
          "fieldName": "category_47",
          "value": false
        },
        {
          "fieldName": "category_49",
          "value": false
        },
        {
          "fieldName": "category_44",
          "value": false
        },
        {
          "fieldName": "category_41",
          "value": false
        },
        {
          "fieldName": "category_8",
          "value": false
        },
        {
          "fieldName": "category_1",
          "value": false
        },
        {
          "fieldName": "category_43",
          "value": false
        },
        {
          "fieldName": "category_46",
          "value": false
        },
        {
          "fieldName": "category_40",
          "value": false
        },
        {
          "fieldName": "category_2",
          "value": false
        },
        {
          "fieldName": "category_52",
          "value": false
        },
        {
          "fieldName": "category_27",
          "value": false
        },
        {
          "fieldName": "category_26",
          "value": false
        },
        {
          "fieldName": "category_30",
          "value": false
        },
        {
          "fieldName": "category_28",
          "value": false
        },
        {
          "fieldName": "category_5",
          "value": false
        },
        {
          "fieldName": "category_33",
          "value": false
        },
        {
          "fieldName": "category_35",
          "value": false
        },
        {
          "fieldName": "category_34",
          "value": false
        },
        {
          "fieldName": "category_42",
          "value": false
        },
        {
          "fieldName": "category_56",
          "value": false
        },
        {
          "fieldName": "category_4",
          "value": false
        },
        {
          "fieldName": "category_51",
          "value": false
        },
        {
          "fieldName": "category_36",
          "value": false
        },
        {
          "fieldName": "category_38",
          "value": false
        },
        {
          "fieldName": "venuezip",
          "value": ""
        },
        {
          "fieldName": "venue",
          "value": ""
        },
        {
          "fieldName": "state",
          "value": "Alle Bundesländer"
        },
        {
          "fieldName": "fulltext",
          "value": ""
        },
        {
          "fieldName": "kind_4",
          "value": false
        },
        {
          "fieldName": "kind_1",
          "value": false
        },
        {
          "fieldName": "kind_12",
          "value": false
        },
        {
          "fieldName": "kind_13",
          "value": false
        },
        {
          "fieldName": "kind_2",
          "value": false
        },
        {
          "fieldName": "kind_3",
          "value": false
        }
]