import $ from "jquery";

for (var x=0; x < 100; x++) {
	$(".board").append(`<div class="square ${x}">
		</div>
		`)
};

$(".board").append(`<div id="player">
	<img src="http://placecage.com/50/50">
	</div>`);

$(".board").append(`<div class="zombie">
	<img src="http://placekitten.com/50/50">
	</div>`);