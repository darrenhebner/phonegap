var app = new Vue({
	el: "#app",
	data: {
		notes: [
			{
				"pitch": 1,
				"freq": 523.25
			},
			{
				"pitch": 2,
				"freq": 587.33
			},
			{
				"pitch": 3,
				"freq": 659.25
			},
			{
				"pitch": 4,
				"freq": 698.46
			},
			{
				"pitch": 5,
				"freq": 783.99
			},
			{
				"pitch": 6,
				"freq": 880.00
			},
			{
				"pitch": 7,
				"freq": 987.77
			},
			{
				"pitch": 8,
				"freq": 1046.50
			}
		],
		clickedNotes: [],
		randomNotes: [],
		showHelp: false,
		showWin: false
	},
	ready: function() {
		this.shuffleArray(this.notes);
	},
	methods: {
		restart: function() {
			this.shuffleArray(this.notes);
			this.showWin = false;
		},
		addPitch: function(index) {
			this.clickedNotes.push(this.notes[index].pitch);
			this.playSound(this.notes[index].freq);
			this.checkWin();
		},
		checkWin: function() {
			var _this = this;
			var sorted = this.lastEight.toString();
			var inOrder = [1, 2, 3, 4, 5, 6, 7, 8].toString();

			if ( sorted == inOrder ) {
				_this.showWin = true;
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

			this.$set('randomNotes', array);
			this.randomNotes.sort();
		},
		playSound: function(freq) {
			var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

			//create oscillators
			var oscillator = audioCtx.createOscillator();

			var gainNode = audioCtx.createGain();
			gainNode.gain.value = 1;

			oscillator.type = 'sine';
			oscillator.frequency.value = freq;
			oscillator.start();

			oscillator.connect(gainNode);
			gainNode.connect(audioCtx.destination);

			setTimeout(function(){
				oscillator.stop();
				audioCtx.close();
			}, 300);
		}
	},
	computed: {
		lastEight: function() {
			return this.clickedNotes.slice(-8);
		}
	}
});
