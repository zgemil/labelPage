
function loadDoc(info, formatting) {
	iterClick(info, formatting);
}

function iterClick(jsonResponse, jsonFormatting) {
	// console.log(jsonResponse);
	// console.log(jsonResponse[""]);
	var tbl = document.getElementById("lstBlank");
	var Newtxt = "<li id = \"header\">Nutrition Facts</li>";

	for (section in jsonFormatting) {
		if (section != "units") {
			//console.log(section);
			Newtxt += "<li><ul class = \"section\" id = \"" + section + "\">";
			if (section == "calories") {
				Newtxt += "<div>Amount Per Serving</div>";
			}else if(section=="nutrientsLimit"){
				Newtxt += "<li><div class=\"alignright\">% Daily Value*</div></li>\
				<div style=\"clear: both;\"></div>";
			}

			//line
			var sectionValues = joinJson(jsonResponse, jsonFormatting[section]);

			// console.log(sectionValues);
			for (name in sectionValues) {
				console.log(name);
				Newtxt += formatList(sectionValues, name, jsonFormatting, section);
			}

			Newtxt += "</ul></li>";
		}
	}
	tbl.innerHTML = Newtxt;

}
/*
formatList: takes json, formats ul and li


formatText: takes json line, formats names & units


*/

function formatList(jsonObj, name, jsonFormat, section) {
	// console.log(jsonObj);
	var txt = "";
	var subTxt = "";

	txt += "<li>";
	txt += formatText(jsonObj, name, jsonFormat, section);
	var subs = joinJson(jsonObj[name], jsonFormat[section]);
	for (subNames in subs) {

		if (typeof subs[subNames] == "object") {
			subTxt += formatList(subs, subNames, jsonFormat, section);
		}
	}
	if (subTxt.length > 0) {
		txt += "<ul>" + subTxt + "</ul>";
	}
	if (txt.length > 4) {
		txt += "</li>";
		return txt;
	} else {
		// console.log("hi");
		return "";
	}

}



function formatText(jsonObj, name, jsonFormat, section) {

	var txt = "";
	if (section == "start") {
		if (name == "Serving size") {
			txt += "" + name + " " + jsonObj[name];
		} else {
			txt += "" + jsonObj[name] + " " + name;
		}
	}
	else if (section == "calories") {
		txt += "<div class=\"alignleft\">" + name + "</div> \
		<div class=\"alignright\"> " + jsonObj[name] + "</div> \
		<div style=\"clear: both;\"></div>";
	}
	else {
		var measures = joinJson(jsonObj[name], jsonFormat.units);
		txt += "<div class=\"alignleft\">"  + name + "</div>";

		for (unit in measures) {
			if (unit == "%") {
				txt += "<div class=\"alignright\"> ";
				txt += " " + measures[unit] + unit;
				txt += "</div>";

			} else {
				txt += "<div class=\"alignleft\">" + measures[unit] + unit +"</div>";
			}
		}
		txt += "<div style=\"clear: both;\"></div>";

	}
	// console.log(txt);
	return txt;
}


//joins where key = value, value = jsonvalue
function joinJson(jsonValue, jsonKey) {
	var isEmpty = true;
	// console.log(jsonKey);
	var jsonTxt = "{";
	for (key in jsonKey) {
		for (value in jsonValue) {
			if (key == value) {
				isEmpty = false;
				jsonTxt += "\"" + jsonKey[key] + "\":";
				jsonTxt += JSON.stringify(jsonValue[key]);
				jsonTxt += ",";
			}
		}
	}
	// console.log(jsonTxt);
	if (isEmpty) {
		jsonTxt = "{}";
	} else {
		jsonTxt = jsonTxt.substring(0, jsonTxt.length - 1) + "}";
	}
	// console.log(jsonTxt);
	return JSON.parse(jsonTxt);
}