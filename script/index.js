$(window).ready(function () {

	if (document.location.href.indexOf('koop/kaart') < 0) {
		return false;
	}

	//var originalExecuteLoadDataTile = ZOK.ExecuteLoadDataTile;
	//ZOK.ExecuteLoadDataTile = function(x, y, z, zoekOpdrachtZonderLocatie, item) {
	//	originalExecuteLoadDataTile.call(ZOK, x, y, z, zoekOpdrachtZonderLocatie, item);
	//};

	$.ajaxSetup({
		complete: function (xhr) {
			xhr.success(function(data) {

				if (data.points && data.points.length > 0) {
					gatherPoints(data.points);
				}

				if ($.isArray(data) && data.length === 1 && data[0].id && data[0].url) {
					fetchPointInfo(data[0]);
				}

			});
		}
	});

	function gatherPoints(points) {
		//console.log(points);
	}

	function fetchPointInfo(point) {
		$.ajax({
			url: point.url + "kenmerken/",
			success: extendTooltip
		});
	}

	function extendTooltip(data) {
		var $tooltip = $("#zokPreview .specs");

		$("#fundapro-tooltop-extended").remove();
		var $extended = $tooltip.append("<span id='fundapro-tooltop-extended'></span>");

		var jaar = $(data).find(".object-kenmerken-list dt:contains('ouwjaar'):first, .object-kenmerken-list dt:contains('ear of construction'):first, .object-kenmerken-list dt:contains('onstruction period'):first, .object-kenmerken-list dt:contains('ouwperiode'):first").next().text();
		$extended.append('Year of construction: ' + jaar + '<br />');

		var outdoor = $(data).find(".object-kenmerken-list dt:contains('alcony'):first, .object-kenmerken-list dt:contains('alkon'):first").next().text();
		$extended.append(outdoor.length ? outdoor + "<br />" : "");

		$extended.append($(data).find(".energielabel-label"));

		var cadastral = $(data).find(".object-kenmerken-list dt:contains('igendomssituatie'):first, .object-kenmerken-list dt:contains('wnership situation'):first").next().text();
		$extended.append(cadastral.length ? cadastral : "No cadastral data found");
	}

});

