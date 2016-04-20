var app = new Vue({
	el: "#app",
	data: {
		notes: [
			{
				"pitch": 1
			},
			{
				"pitch": 2
			},
			{
				"pitch": 3
			},
			{
				"pitch": 4
			},
			{
				"pitch": 5
			},
			{
				"pitch": 6
			},
			{
				"pitch": 7
			},
			{
				"pitch": 8
			}
		],
		clickedNotes: [],
		randomNotes: []
	},
	ready: function() {
		this.shuffleArray(this.notes);
	},
	methods: {
		addPitch: function(index) {
			this.clickedNotes.push(this.notes[index].pitch);
			this.checkWin();
		},
		checkWin: function() {
			var _this = this;
			var sorted = this.lastEight.toString();
			var inOrder = [1, 2, 3, 4, 5, 6, 7, 8].toString();

			if ( sorted == inOrder ) {
				alert("Win!");
				_this.shuffleArray(_this.notes);
			} 
		},
		shuffleArray: function(array) {
		  	var m = array.length, t, i;

			while (m) {

				i = Math.floor(Math.random() * m--);

				t = array[m];
				array[m] = array[i];
				array[i] = t;
			}
			this.randomNotes = array;
		},
	},
	computed: {
		lastEight: function() {
			return this.clickedNotes.slice(-8);
		}
	}
});