import $ from "jquery";

for (var x=0; x < 100; x++) {
	$(".board").append(`<div class="square ${x}">
		</div>
		`)
};

$(".95").append(`<div id="player">
	<img src="http://placecage.com/50/50">
	</div>`);

$(".5").append(`<div class="zombie">
	<img src="http://placekitten.com/50/50">
	</div>`);