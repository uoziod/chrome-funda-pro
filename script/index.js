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

		$tooltip.append("<span id='fundapro-tooltop-extended'></span>");
		var $extended = $("#fundapro-tooltop-extended");

		var energy = $(data).find(".energielabel-label");
		var cadastral = $(data).find(".specs-val:contains('Paid until'),.specs-val:contains('Afgekocht tot'),.specs-val:contains('Full ownership'),.specs-val:contains('Volle eigendom')").text();

		$extended.append(energy);
		$extended.append(cadastral.length ? cadastral : "No cadastral data found");
	}

});

