import React, { useState, useEffect } from "react";

const Testing2 = () => {
  const [reverseGeocodedAddresses, setReverseGeocodedAddresses] = useState([]);
  const inputStrings = [
    "Latitude: 23.80414, Longitude: 90.37696",
    "Latitude: 23.70767, Longitude: 90.28467",
"Latitude: 23.86513, Longitude: 90.32697",
"Latitude: 23.74777, Longitude: 90.43814",
"Latitude: 23.86749, Longitude: 90.46512",
"Latitude: 23.8677, Longitude: 90.27203",
"Latitude: 23.69589, Longitude: 90.48994",
"Latitude: 23.71456, Longitude: 90.46938",
"Latitude: 23.86186, Longitude: 90.46801",
"Latitude: 23.77066, Longitude: 90.36691",
"Latitude: 23.79659, Longitude: 90.42054",
"Latitude: 23.79551, Longitude: 90.28607",
"Latitude: 23.87318, Longitude: 90.42187",
"Latitude: 23.82752, Longitude: 90.39042",
"Latitude: 23.9088, Longitude: 90.27904",
"Latitude: 23.84755, Longitude: 90.43339",
"Latitude: 23.8114, Longitude: 90.27597",
"Latitude: 23.7231, Longitude: 90.46325",
"Latitude: 23.78851, Longitude: 90.28934",
"Latitude: 23.87294, Longitude: 90.349",
"Latitude: 23.77955, Longitude: 90.48565",
"Latitude: 23.7639, Longitude: 90.43128",
"Latitude: 23.73885, Longitude: 90.40682",
"Latitude: 23.72314, Longitude: 90.29444",
"Latitude: 23.76865, Longitude: 90.37325",
"Latitude: 23.80021, Longitude: 90.32986",
"Latitude: 23.68584, Longitude: 90.40355",
"Latitude: 23.7866, Longitude: 90.34164",
"Latitude: 23.89207, Longitude: 90.33015",
"Latitude: 23.70067, Longitude: 90.41759",
"Latitude: 23.83673, Longitude: 90.36892",
"Latitude: 23.8731, Longitude: 90.37729",
"Latitude: 23.78713, Longitude: 90.50193",
"Latitude: 23.89124, Longitude: 90.29628",
"Latitude: 23.80209, Longitude: 90.44719",
"Latitude: 23.87732, Longitude: 90.48773",
"Latitude: 23.82232, Longitude: 90.31641",
"Latitude: 23.84828, Longitude: 90.47664",
"Latitude: 23.73345, Longitude: 90.35992",
"Latitude: 23.83965, Longitude: 90.34257",
"Latitude: 23.73362, Longitude: 90.39463",
"Latitude: 23.85971, Longitude: 90.5051",
"Latitude: 23.70944, Longitude: 90.43015",
"Latitude: 23.79201, Longitude: 90.27789",
"Latitude: 23.72877, Longitude: 90.30161",
"Latitude: 23.70669, Longitude: 90.29029",
"Latitude: 23.82881, Longitude: 90.35895",
"Latitude: 23.86932, Longitude: 90.36164",
"Latitude: 23.78484, Longitude: 90.48309",
"Latitude: 23.77405, Longitude: 90.27415",
"Latitude: 23.89868, Longitude: 90.29919",
"Latitude: 23.7118, Longitude: 90.30245",
"Latitude: 23.74117, Longitude: 90.43046",
"Latitude: 23.75793, Longitude: 90.38141",
"Latitude: 23.89266, Longitude: 90.42914",
"Latitude: 23.82578, Longitude: 90.31372",
"Latitude: 23.82544, Longitude: 90.49166",
"Latitude: 23.7665, Longitude: 90.30152",
"Latitude: 23.90536, Longitude: 90.33529",
"Latitude: 23.78171, Longitude: 90.3875",
"Latitude: 23.82659, Longitude: 90.33347",
"Latitude: 23.70813, Longitude: 90.44972",
"Latitude: 23.82186, Longitude: 90.403",
"Latitude: 23.74425, Longitude: 90.50157",
"Latitude: 23.84408, Longitude: 90.35803",
"Latitude: 23.71221, Longitude: 90.2519",
"Latitude: 23.69904, Longitude: 90.34559",
"Latitude: 23.89, Longitude: 90.48205",
"Latitude: 23.78135, Longitude: 90.47763",
"Latitude: 23.68328, Longitude: 90.38182",
"Latitude: 23.69109, Longitude: 90.31716",
"Latitude: 23.82573, Longitude: 90.36676",
"Latitude: 23.8761, Longitude: 90.44708",
"Latitude: 23.79117, Longitude: 90.49016",
"Latitude: 23.68322, Longitude: 90.34112",
"Latitude: 23.82296, Longitude: 90.43156",
"Latitude: 23.82226, Longitude: 90.38356",
"Latitude: 23.89249, Longitude: 90.4522",
"Latitude: 23.7506, Longitude: 90.40795",
"Latitude: 23.88939, Longitude: 90.29479",
"Latitude: 23.84661, Longitude: 90.29078",
"Latitude: 23.90481, Longitude: 90.34431",
"Latitude: 23.86466, Longitude: 90.4356",
"Latitude: 23.74254, Longitude: 90.33424",
"Latitude: 23.8105, Longitude: 90.25272",
"Latitude: 23.85983, Longitude: 90.43331",
"Latitude: 23.78268, Longitude: 90.39503",
"Latitude: 23.81058, Longitude: 90.39262",
"Latitude: 23.7938, Longitude: 90.50182",
"Latitude: 23.86383, Longitude: 90.34226",
"Latitude: 23.70949, Longitude: 90.25838",
"Latitude: 23.76347, Longitude: 90.33134",
"Latitude: 23.84916, Longitude: 90.50852",
"Latitude: 23.86604, Longitude: 90.41549",
"Latitude: 23.83404, Longitude: 90.45593",
"Latitude: 23.69583, Longitude: 90.34419",
"Latitude: 23.73004, Longitude: 90.33823",
"Latitude: 23.72986, Longitude: 90.32846",
"Latitude: 23.73271, Longitude: 90.41734",
"Latitude: 23.76966, Longitude: 90.30314",
"Latitude: 23.78277, Longitude: 90.29191",
"Latitude: 23.7096, Longitude: 90.26366",
"Latitude: 23.71567, Longitude: 90.3848",
"Latitude: 23.76878, Longitude: 90.4152",
"Latitude: 23.75083, Longitude: 90.36407",
"Latitude: 23.71025, Longitude: 90.48887",
"Latitude: 23.7943, Longitude: 90.4491",
"Latitude: 23.69233, Longitude: 90.34703",
"Latitude: 23.80262, Longitude: 90.40334",
"Latitude: 23.88043, Longitude: 90.47517",
"Latitude: 23.68951, Longitude: 90.44647",
"Latitude: 23.68132, Longitude: 90.41189",
"Latitude: 23.80077, Longitude: 90.44213",
"Latitude: 23.8448, Longitude: 90.40538",
"Latitude: 23.8461, Longitude: 90.32553",
"Latitude: 23.79413, Longitude: 90.4764",
"Latitude: 23.68316, Longitude: 90.27607",
"Latitude: 23.89426, Longitude: 90.40896",
"Latitude: 23.77395, Longitude: 90.43436",
"Latitude: 23.87291, Longitude: 90.33969",
"Latitude: 23.79037, Longitude: 90.35351",
"Latitude: 23.72272, Longitude: 90.34691",
"Latitude: 23.82597, Longitude: 90.40138",
"Latitude: 23.86161, Longitude: 90.42232",
"Latitude: 23.75735, Longitude: 90.29932",
"Latitude: 23.81717, Longitude: 90.27687",
"Latitude: 23.75042, Longitude: 90.31946",
"Latitude: 23.7391, Longitude: 90.35084",
"Latitude: 23.75949, Longitude: 90.27542",
"Latitude: 23.89789, Longitude: 90.44526",
"Latitude: 23.90932, Longitude: 90.32598",
"Latitude: 23.85884, Longitude: 90.30821",
"Latitude: 23.76849, Longitude: 90.36653",
"Latitude: 23.76039, Longitude: 90.27796",
"Latitude: 23.88806, Longitude: 90.34293",
"Latitude: 23.89846, Longitude: 90.26846",
"Latitude: 23.89028, Longitude: 90.45252",
"Latitude: 23.84659, Longitude: 90.25729",
"Latitude: 23.88704, Longitude: 90.41101",
"Latitude: 23.89394, Longitude: 90.41777",
"Latitude: 23.84233, Longitude: 90.29856",
"Latitude: 23.83266, Longitude: 90.43259",
"Latitude: 23.79475, Longitude: 90.27753",
"Latitude: 23.70107, Longitude: 90.43563",
"Latitude: 23.75587, Longitude: 90.34023",
"Latitude: 23.84913, Longitude: 90.47617",
"Latitude: 23.74226, Longitude: 90.29531",
"Latitude: 23.72408, Longitude: 90.27026",
"Latitude: 23.76234, Longitude: 90.4952",
"Latitude: 23.89094, Longitude: 90.37166",
"Latitude: 23.7418, Longitude: 90.3226",
"Latitude: 23.87986, Longitude: 90.36454",
"Latitude: 23.7778, Longitude: 90.32466",
"Latitude: 23.85177, Longitude: 90.42501",
"Latitude: 23.85271, Longitude: 90.30273",
"Latitude: 23.81142, Longitude: 90.36697",
"Latitude: 23.84653, Longitude: 90.27068",
"Latitude: 23.75862, Longitude: 90.30223",
"Latitude: 23.85404, Longitude: 90.43112",
"Latitude: 23.85071, Longitude: 90.29789",
"Latitude: 23.86929, Longitude: 90.41326",
"Latitude: 23.78474, Longitude: 90.26477",
"Latitude: 23.83402, Longitude: 90.30716",
"Latitude: 23.8308, Longitude: 90.41147",
"Latitude: 23.76334, Longitude: 90.48707",
"Latitude: 23.89866, Longitude: 90.37562",
"Latitude: 23.76197, Longitude: 90.39237",
"Latitude: 23.89408, Longitude: 90.25814",
"Latitude: 23.78038, Longitude: 90.2885",
"Latitude: 23.72432, Longitude: 90.30116",
"Latitude: 23.78442, Longitude: 90.39199",
"Latitude: 23.71458, Longitude: 90.4851",
"Latitude: 23.83921, Longitude: 90.42831",
"Latitude: 23.75523, Longitude: 90.28256",
"Latitude: 23.80803, Longitude: 90.44963",
"Latitude: 23.74755, Longitude: 90.31759",
"Latitude: 23.88364, Longitude: 90.29627",
"Latitude: 23.76761, Longitude: 90.50541",
"Latitude: 23.80312, Longitude: 90.26138",
"Latitude: 23.82096, Longitude: 90.46198",
"Latitude: 23.76475, Longitude: 90.42324",
"Latitude: 23.813, Longitude: 90.39523",
"Latitude: 23.84608, Longitude: 90.46134",
"Latitude: 23.83058, Longitude: 90.39045",
"Latitude: 23.70032, Longitude: 90.30623",
"Latitude: 23.71384, Longitude: 90.48645",
"Latitude: 23.70697, Longitude: 90.35298",
"Latitude: 23.83606, Longitude: 90.40734",
"Latitude: 23.76784, Longitude: 90.27572",
"Latitude: 23.84992, Longitude: 90.34277",
"Latitude: 23.82973, Longitude: 90.49674",
"Latitude: 23.7794, Longitude: 90.42322",
"Latitude: 23.78748, Longitude: 90.46833",
"Latitude: 23.89235, Longitude: 90.25218",
"Latitude: 23.76569, Longitude: 90.27341",
"Latitude: 23.81828, Longitude: 90.31984",
"Latitude: 23.86771, Longitude: 90.26864",
"Latitude: 23.8366, Longitude: 90.43309",
"Latitude: 23.89921, Longitude: 90.28519",
"Latitude: 23.77531, Longitude: 90.5021",
"Latitude: 23.82559, Longitude: 90.35505",
"Latitude: 23.76537, Longitude: 90.41215",
"Latitude: 23.8442, Longitude: 90.42562",
"Latitude: 23.7896, Longitude: 90.26156",
"Latitude: 23.85461, Longitude: 90.3864",
"Latitude: 23.83353, Longitude: 90.27747",
"Latitude: 23.72741, Longitude: 90.38465",
"Latitude: 23.79779, Longitude: 90.35829",
"Latitude: 23.9046, Longitude: 90.39229",
"Latitude: 23.76335, Longitude: 90.27571",
"Latitude: 23.74652, Longitude: 90.48915",
"Latitude: 23.86112, Longitude: 90.31718",
"Latitude: 23.77859, Longitude: 90.32011",
"Latitude: 23.89372, Longitude: 90.29908",
"Latitude: 23.8893, Longitude: 90.42106",
"Latitude: 23.89565, Longitude: 90.33543",
"Latitude: 23.81705, Longitude: 90.26423",
"Latitude: 23.89523, Longitude: 90.50966",
"Latitude: 23.82545, Longitude: 90.34662",
"Latitude: 23.89963, Longitude: 90.31429",
"Latitude: 23.9011, Longitude: 90.31111",
"Latitude: 23.80889, Longitude: 90.43828",
"Latitude: 23.79099, Longitude: 90.38748",
"Latitude: 23.90359, Longitude: 90.40291",
"Latitude: 23.70605, Longitude: 90.31085",
"Latitude: 23.7626, Longitude: 90.45773",
"Latitude: 23.74842, Longitude: 90.26376",
"Latitude: 23.82908, Longitude: 90.42502",
"Latitude: 23.84296, Longitude: 90.28015",
"Latitude: 23.73855, Longitude: 90.4423",
"Latitude: 23.89507, Longitude: 90.28893",
"Latitude: 23.7714, Longitude: 90.47066",
"Latitude: 23.88767, Longitude: 90.46374",
"Latitude: 23.8925, Longitude: 90.35838",
"Latitude: 23.70774, Longitude: 90.28279",
"Latitude: 23.68178, Longitude: 90.25253",
"Latitude: 23.81477, Longitude: 90.37712",
"Latitude: 23.71652, Longitude: 90.33244",
"Latitude: 23.84066, Longitude: 90.33634",
"Latitude: 23.85523, Longitude: 90.33407",
"Latitude: 23.75501, Longitude: 90.49691",
"Latitude: 23.84907, Longitude: 90.30625",
"Latitude: 23.77304, Longitude: 90.36488",
"Latitude: 23.90623, Longitude: 90.39709",
"Latitude: 23.82312, Longitude: 90.416",
"Latitude: 23.75044, Longitude: 90.34675",
"Latitude: 23.75813, Longitude: 90.31824",
"Latitude: 23.86024, Longitude: 90.44078",
"Latitude: 23.89627, Longitude: 90.27655",
"Latitude: 23.78738, Longitude: 90.48539",
"Latitude: 23.7883, Longitude: 90.29833",
"Latitude: 23.68151, Longitude: 90.36761",
"Latitude: 23.83659, Longitude: 90.2584",
"Latitude: 23.78187, Longitude: 90.46835",
"Latitude: 23.85285, Longitude: 90.38924",
"Latitude: 23.84051, Longitude: 90.46486",
"Latitude: 23.82244, Longitude: 90.33641",
"Latitude: 23.78081, Longitude: 90.32953",
"Latitude: 23.87642, Longitude: 90.38243",
"Latitude: 23.70725, Longitude: 90.27868",
"Latitude: 23.70158, Longitude: 90.27103",
"Latitude: 23.87362, Longitude: 90.50226",
"Latitude: 23.82753, Longitude: 90.30001",
"Latitude: 23.75367, Longitude: 90.34778",
"Latitude: 23.76959, Longitude: 90.38532",
"Latitude: 23.69082, Longitude: 90.34201",
"Latitude: 23.76595, Longitude: 90.31242",
"Latitude: 23.80263, Longitude: 90.39557",
"Latitude: 23.76519, Longitude: 90.30268",
"Latitude: 23.83691, Longitude: 90.29032",
"Latitude: 23.71131, Longitude: 90.28954",
"Latitude: 23.75885, Longitude: 90.40619",
"Latitude: 23.80174, Longitude: 90.50355",
"Latitude: 23.71126, Longitude: 90.32627",
"Latitude: 23.85496, Longitude: 90.2758",
"Latitude: 23.89418, Longitude: 90.39071",
"Latitude: 23.84444, Longitude: 90.44702",
"Latitude: 23.8372, Longitude: 90.46672",
"Latitude: 23.7217, Longitude: 90.304",
"Latitude: 23.74513, Longitude: 90.38414",
"Latitude: 23.69499, Longitude: 90.43727",
"Latitude: 23.80601, Longitude: 90.37245",
"Latitude: 23.76887, Longitude: 90.25187",
"Latitude: 23.90665, Longitude: 90.3707",
"Latitude: 23.70673, Longitude: 90.40585",
"Latitude: 23.86325, Longitude: 90.30047",
"Latitude: 23.70202, Longitude: 90.48666",
"Latitude: 23.83086, Longitude: 90.28333",
"Latitude: 23.75554, Longitude: 90.46984",
"Latitude: 23.74748, Longitude: 90.31853",
"Latitude: 23.89045, Longitude: 90.50398",
"Latitude: 23.90863, Longitude: 90.43191",
"Latitude: 23.73604, Longitude: 90.33341",
"Latitude: 23.82938, Longitude: 90.27798",
"Latitude: 23.79919, Longitude: 90.3971",
"Latitude: 23.75443, Longitude: 90.36849",
"Latitude: 23.82552, Longitude: 90.40807",
"Latitude: 23.87727, Longitude: 90.40802",
"Latitude: 23.90136, Longitude: 90.50691",
"Latitude: 23.90104, Longitude: 90.43219",
"Latitude: 23.79179, Longitude: 90.47281",
"Latitude: 23.81164, Longitude: 90.454",
"Latitude: 23.74994, Longitude: 90.26096",
"Latitude: 23.85286, Longitude: 90.32594",
"Latitude: 23.73648, Longitude: 90.25684",
"Latitude: 23.75807, Longitude: 90.28024",
"Latitude: 23.88265, Longitude: 90.27718",
"Latitude: 23.89218, Longitude: 90.49949",
"Latitude: 23.76792, Longitude: 90.37324",
"Latitude: 23.72189, Longitude: 90.46065",
"Latitude: 23.83614, Longitude: 90.50781",
"Latitude: 23.71267, Longitude: 90.26923",
"Latitude: 23.71632, Longitude: 90.33227",
"Latitude: 23.71187, Longitude: 90.30515",
"Latitude: 23.8376, Longitude: 90.37108",
"Latitude: 23.74861, Longitude: 90.28584",
"Latitude: 23.72124, Longitude: 90.25294",
"Latitude: 23.72848, Longitude: 90.26813",
"Latitude: 23.88649, Longitude: 90.34071",
"Latitude: 23.75377, Longitude: 90.35222",
"Latitude: 23.68099, Longitude: 90.35849",
"Latitude: 23.81644, Longitude: 90.27126",
"Latitude: 23.73126, Longitude: 90.41947",
"Latitude: 23.8167, Longitude: 90.42272",
"Latitude: 23.8591, Longitude: 90.34666",
"Latitude: 23.80097, Longitude: 90.47578",
"Latitude: 23.86216, Longitude: 90.33685",
"Latitude: 23.82492, Longitude: 90.31002",
"Latitude: 23.69359, Longitude: 90.32078",
"Latitude: 23.68716, Longitude: 90.46061",
"Latitude: 23.82737, Longitude: 90.49496",
"Latitude: 23.90873, Longitude: 90.28727",
"Latitude: 23.71183, Longitude: 90.2917",
"Latitude: 23.79219, Longitude: 90.45243",
"Latitude: 23.83521, Longitude: 90.3281",
"Latitude: 23.82904, Longitude: 90.43524",
"Latitude: 23.7709, Longitude: 90.46735",
"Latitude: 23.80509, Longitude: 90.38766",
"Latitude: 23.70687, Longitude: 90.35781",
"Latitude: 23.83659, Longitude: 90.32702",
"Latitude: 23.71548, Longitude: 90.2775",
"Latitude: 23.79189, Longitude: 90.4407",
"Latitude: 23.85415, Longitude: 90.26293",
"Latitude: 23.68029, Longitude: 90.27766",
"Latitude: 23.69311, Longitude: 90.33584",
"Latitude: 23.79516, Longitude: 90.40914",
"Latitude: 23.70776, Longitude: 90.2776",
"Latitude: 23.902, Longitude: 90.48778",
"Latitude: 23.86192, Longitude: 90.37199",
"Latitude: 23.79281, Longitude: 90.36613",
"Latitude: 23.70727, Longitude: 90.46875",
"Latitude: 23.6853, Longitude: 90.35913",
"Latitude: 23.86435, Longitude: 90.33918",
"Latitude: 23.84326, Longitude: 90.42821",
"Latitude: 23.77022, Longitude: 90.40968",
"Latitude: 23.87062, Longitude: 90.38198",
"Latitude: 23.80076, Longitude: 90.44991",
"Latitude: 23.80211, Longitude: 90.2862",
"Latitude: 23.72789, Longitude: 90.28538",
"Latitude: 23.72042, Longitude: 90.26278",
"Latitude: 23.87548, Longitude: 90.28993",
"Latitude: 23.82138, Longitude: 90.47648",
"Latitude: 23.89824, Longitude: 90.40489",
"Latitude: 23.75067, Longitude: 90.39577",
"Latitude: 23.77194, Longitude: 90.38947",
"Latitude: 23.71419, Longitude: 90.3905",
"Latitude: 23.68002, Longitude: 90.41272",
"Latitude: 23.88886, Longitude: 90.39513",
"Latitude: 23.86456, Longitude: 90.25341",
"Latitude: 23.84915, Longitude: 90.49374",
"Latitude: 23.75218, Longitude: 90.37883",
"Latitude: 23.87442, Longitude: 90.43572",
"Latitude: 23.81822, Longitude: 90.33585",
"Latitude: 23.89402, Longitude: 90.38568",
"Latitude: 23.7142, Longitude: 90.48975",
"Latitude: 23.71339, Longitude: 90.48272",
"Latitude: 23.90403, Longitude: 90.31719",
"Latitude: 23.7237, Longitude: 90.30932",
"Latitude: 23.80193, Longitude: 90.28495",
"Latitude: 23.85472, Longitude: 90.49846",
"Latitude: 23.89604, Longitude: 90.26933",
"Latitude: 23.7772, Longitude: 90.48438",
"Latitude: 23.78363, Longitude: 90.4579",
"Latitude: 23.80999, Longitude: 90.4742",
"Latitude: 23.86883, Longitude: 90.43622",
"Latitude: 23.90941, Longitude: 90.35902",
"Latitude: 23.87691, Longitude: 90.28561",
"Latitude: 23.77458, Longitude: 90.40255",
"Latitude: 23.75558, Longitude: 90.50138",
"Latitude: 23.77852, Longitude: 90.28684",
"Latitude: 23.73717, Longitude: 90.50268",
"Latitude: 23.8529, Longitude: 90.50984",
"Latitude: 23.70778, Longitude: 90.252",
"Latitude: 23.74844, Longitude: 90.41305",
"Latitude: 23.80122, Longitude: 90.36412",
"Latitude: 23.69235, Longitude: 90.38348",
"Latitude: 23.69997, Longitude: 90.46518",
"Latitude: 23.83828, Longitude: 90.32713",
"Latitude: 23.85265, Longitude: 90.33826",
"Latitude: 23.80989, Longitude: 90.41123",
"Latitude: 23.78693, Longitude: 90.35289",

    // Add 99 more input strings with different latitudes and longitudes
    // ...
  ];

  useEffect(() => {
    const apiKey = "pk.abc469b9f78bca652e6cedf09705e250";

    const fetchAddresses = async () => {
      const addresses = [];

      for (let i = 0; i < inputStrings.length; i++) {
        const inputString = inputStrings[i];

        // Extract latitude and longitude from the input string
        const match = inputString.match(
          /Latitude:\s*(\d+\.\d+),\s*Longitude:\s*(\d+\.\d+)/
        );

        if (match && match.length === 3) {
          const latitude = match[1];
          const longitude = match[2];

          // Construct the API URL for reverse geocoding
          const apiUrl = `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`;

          try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const fullAddress = data.display_name;
            const dhakaIndex = fullAddress.indexOf("Dhaka");
            let address =
              dhakaIndex !== -1
                ? fullAddress.slice(0, dhakaIndex + "Dhaka".length)
                : fullAddress;

            const addressParts = address.split(", ");

            if (addressParts.length >= 3) {
              address = addressParts.slice(-3).join(", ");
            } else {
              address = addressParts.join(", ");
            }

            addresses.push({
              latitude,
              longitude,
              location: address,
            });

            // Set the addresses in the state to display
            setReverseGeocodedAddresses(addresses);

            // Delay for 3 seconds before the next request
            await new Promise((resolve) => setTimeout(resolve, 2000));
          } catch (error) {
            console.error("Error fetching address:", error);
          }
        } else {
          console.error("Invalid input format for input string:", inputString);
        }
      }
    };

    fetchAddresses();
  }, []);

  return (
    <div>
      <h2>Reverse Geocoded Addresses:</h2>
      <ul>
        {reverseGeocodedAddresses.map((item, index) => (
          <li key={index}>
           {`{`} "Latitude": {item.latitude}, "Longitude": {item.longitude}, "Location":{" "}
            "{item.location}" {`}`},
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Testing2;
