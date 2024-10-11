var abcEditor;
var currentTune;
var midiBuffer;

window.onload = function() {
    var abcInput = document.getElementById("abc");
    var warnings = document.getElementById("warnings");

    abcEditor = new ABCJS.Editor("abc", { 
        canvas_id: "paper",
        warnings_id: "warnings",
        abcjsParams: {
            responsive: "resize"
        }
    });

    abcInput.addEventListener("input", updateSheet);

    document.querySelector(".play-all").addEventListener("click", playAll);
    document.getElementById("download-midi").addEventListener("click", downloadMidi);

    updateSheet();
};

function updateSheet() {
    var abc = document.getElementById("abc").value;
    if (abc) {
        currentTune = ABCJS.renderAbc("paper", abc, {
            responsive: "resize"
        })[0];
    }
}

function playAll() {
    if (!currentTune) return;

    if (ABCJS.synth.supportsAudio()) {
        var audioContext = new (window.AudioContext || window.webkitAudioContext)();
        midiBuffer = new ABCJS.synth.CreateSynth();

        midiBuffer.init({
            visualObj: currentTune,
            audioContext: audioContext,
            millisecondsPerMeasure: currentTune.millisecondsPerMeasure()
        }).then(function () {
            return midiBuffer.prime();
        }).then(function () {
            midiBuffer.start();
        }).catch(function (error) {
            console.warn("Audio problem:", error);
        });
    } else {
        console.warn("Audio is not supported in this browser.");
    }
}

function stopAudio() {
    if (midiBuffer) {
        midiBuffer.stop();
    }
    document.querySelector(".play-all").style.display = "inline";
    document.querySelector(".stop-audio").style.display = "none";
}

function downloadMidi() {
    var abc = document.getElementById("abc").value;
    var midiBlob = new Blob([ABCJS.synth.getMidiFile(abc)], {type: "audio/midi"});
    var downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(midiBlob);
    downloadLink.download = "sheet_music.mid";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}