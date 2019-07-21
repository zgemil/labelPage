
function loadDoc(info, formatting) {
	iterClick(info, formatting);
}

function screenshot() {
	html2canvas(document.getElementById("lst"), { width: 322 }).then(function (canvas) {
		let placeImage = document.getElementById("pic");
		placeImage.innerHTML = "<div>Right click the below image and click \"Save image as...\"</div>";
		placeImage.appendChild(canvas);
	});
}

function iterClick(jsonData, jsonFormatting) {
	var tbl = document.getElementById("lstBlank");
	var Newtxt = "<li id = \"header\">Nutrition Facts</li>";

	for (section in jsonData) {
		// console.log(jsonData[section]);
		Newtxt += "<li><ul class = \"section\" id = \"" + section + "\">";
		if (section == "calories") {
			Newtxt += "<div>Amount Per Serving</div>";
		} else if (section == "nutrientsLimit") {
			Newtxt += "<li><div class=\"alignright\">% Daily Value*</div></li>\
				<div style=\"clear: both;\"></div>";
		}

		for (subsection in jsonData[section]) {
			// console.log(jsonData[section][subsection]);
			Newtxt += formatLine(jsonData[section][subsection], jsonFormatting, section);

		}



		Newtxt += "</ul></li>";
	}
	tbl.innerHTML = Newtxt;

}

function formatLine(jsonData, jsonFormatting, section) {
	// console.log(section);
	// console.log(jsonData);
	var txt = "<li>";
	if (section == "start") {
		if (jsonData.name == "servingSize") {
			txt += "" + jsonData.name + " " + jsonData.amount;
		} else {
			txt += "" + jsonData.amount + " " + jsonData.name;
		}
	}
	else if (section == "calories") {
		txt += "<div class=\"alignleft\">" +jsonData.name + "</div> \
		<div class=\"alignright\"> " + jsonData.amount + "</div> \
		<div style=\"clear: both;\"></div>";
	}
	else {
		txt += "<div class=\"alignleft\">" + jsonFormatting[jsonData.name] + printMGrams(jsonData.mgrams) + "</div>";
		if(jsonData.percent){
		txt += "<div class=\"alignright\"> " + jsonData.percent + "%</div>";
		}
		txt += "<div style=\"clear: both;\"></div>";

	}
	if (jsonData.subs) {
		txt += "<ul>";
		for (sub in jsonData.subs) {
			console.log(sub);
			txt += formatLine(jsonData.subs[sub], jsonFormatting, section);
		}
		txt += "</ul>";
	}
	txt += "</li>";
	return txt;
}

function printMGrams(mgrams){
	let txt = "";
	if(mgrams >= 1000){
		txt = " " + (mgrams/1000) + "g";
	} else if(mgrams < 1 && mgrams >0){
		txt = " " + (mgrams*1000) + "mcg";
	}else{
		txt = " " + mgrams + "mg";
	}
	return txt;

}