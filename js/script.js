// 12 Key
const scales = {
    "C": ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"],
    "F": ["F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E"],
    "Bb": ["Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A"],
    "Eb": ["Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D"],
    "Ab": ["Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G"],
    "Db": ["Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C"],
    "Gb": ["Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F"],
    "G": ["G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb"],
    "D": ["D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db"],
    "A": ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"],
    "E": ["E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb"],
    "B": ["B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb"]
};
// Map chord symbol
const chordDegreeMap = {
    "1": 0, "b9": 1, "2": 2, "b3": 3, "3": 4, "4": 5,
    "#11": 6, "5": 7, "b13": 8, "6": 9, "b7": 10, "7": 11
};
// Chord Types corresponding to scale degrees
const chordTypes = {
    "1": ["Maj", "Maj7", "Maj9", "Maj6", "Maj7#11"],
    "b9": ["min", "min7", "min9", "min7b5b13", "7", "minb5"],
    "2": ["min", "min7", "min9", "min7b5b13", "7"],
    "b3": ["Maj", "min7", "7"],
    "3": ["min", "min7", "min9", "min7b5b13", "7", "minb5"],
    "4": ["Maj", "Maj7", "Maj9", "Maj6", "Maj7#11"],
    "#11": ["SubV7b5", "7b5", "dim7"],
    "5": ["Maj", "7", "7b9b13"],
    "b13": ["min", "min7", "min9", "min7b5b13", "7", "minb5"],
    "6": ["min", "min7", "min9", "min7b5b13", "7", "minb5"],
    "b7": ["dim", "dimb7"],
    "7": ["dim", "dimb7"]
};
// Chord Changes with chordTypes reference
const chordChanges = [
    ["1", "6", "2", "5"],
    ["1", "b9", "2", "b3"],
    ["2", "5", "1", "6"],
    ["2", "b9", "1", "6"],
    ["3", "6", "2", "5"],
    ["6", "2", "5", "1"],
    ["4", "7", "3", "6"],
    ["4", "5", "1", "1"],
    ["1", "b3", "2", "b9"]
];
// Define noteToAbc for each key
const keyToNoteAbc = {
    "C": {
        "1": "C", "b9": "_D", "2": "D", "b3": "_E", "3": "E", "4": "F",
        "#11": "^F", "5": "G", "b13": "_A", "6": "A", "b7": "_B", "7": "B"
    },
    "F": {
        "1": "F", "b9": "_G", "2": "G", "b3": "_A", "3": "A", "4": "_B",
        "#11": "B", "5": "c", "b13": "_d", "6": "d", "b7": "_e", "7": "e"
    },
    "Bb": {
        "1": "_B", "b9": "B", "2": "c", "b3": "_d", "3": "d", "4": "_e",
        "#11": "e", "5": "f", "b13": "_g", "6": "g", "b7": "_a", "7": "a"
    },
    "Eb": {
        "1": "_E", "b9": "E", "2": "F", "b3": "_G", "3": "G", "4": "_A",
        "#11": "A", "5": "_B", "b13": "B", "6": "c", "b7": "_d", "7": "d"
    },
    "Ab": {
        "1": "_A", "b9": "A", "2": "_B", "b3": "B", "3": "c", "4": "_d",
        "#11": "d", "5": "_e", "b13": "e", "6": "f", "b7": "_g", "7": "g"
    },
    "Db": {
        "1": "_D", "b9": "D", "2": "_E", "b3": "E", "3": "F", "4": "_G",
        "#11": "G", "5": "_A", "b13": "A", "6": "_B", "b7": "B", "7": "c"
    },
    "Gb": {
        "1": "_G", "b9": "G", "2": "_A", "b3": "A", "3": "_B", "4": "B",
        "#11": "c", "5": "_d", "b13": "d", "6": "_e", "b7": "e", "7": "f"
    },
    "G": {
        "1": "G", "b9": "_A", "2": "A", "b3": "_B", "3": "B", "4": "c",
        "#11": "^c", "5": "d", "b13": "_e", "6": "e", "b7": "f", "7": "^f"
    },
    "D": {
        "1": "D", "b9": "_E", "2": "E", "b3": "F", "3": "^F", "4": "G",
        "#11": "^G", "5": "A", "b13": "_B", "6": "B", "b7": "c", "7": "^c"
    },
    "A": {
        "1": "A", "b9": "_B", "2": "B", "b3": "c", "3": "^c", "4": "d",
        "#11": "^d", "5": "e", "b13": "f", "6": "^f", "b7": "g", "7": "^g"
    },
    "E": {
        "1": "E", "b9": "F", "2": "^F", "b3": "G", "3": "^G", "4": "A",
        "#11": "^A", "5": "B", "b13": "c", "6": "^c", "b7": "d", "7": "^d"
    },
    "B": {
        "1": "B", "b9": "c", "2": "^c", "b3": "d", "3": "^d", "4": "e",
        "#11": "^e", "5": "^f", "b13": "g", "6": "^g", "7": "a", "7": "^a"
    }
};
const chordToNotes = {
    "Maj": ["1", "3", "5"],
    "Maj7": ["1", "3", "5", "7"],
    "Maj9": ["1", "3", "5", "7", "2"],
    "Maj6": ["1", "3", "5", "6"],
    "Maj7#11": ["1", "3", "5", "7", "#11"],
    "min": ["1", "b3", "5"],
    "min7": ["1", "b3", "5", "b7"],
    "min9": ["1", "b3", "5", "b7", "2"],
    "min7b5b13": ["1", "b3", "#11", "b13", "b7"],
    "7": ["1", "3", "5", "b7"],
    "minb5": ["1", "b3", "#11"],
    "SubV7b5": ["1", "3", "#11", "b7"],
    "7b5": ["1", "3", "#11", "b7"],
    "dim7": ["1", "b3", "#11", "6"],
    "dim": ["1", "b3", "#11"],
    "dimb7": ["1", "b3", "#11", "6"]
};
// Random key generator
function getRandomKey() {
    const keys = Object.keys(scales);
    return keys[Math.floor(Math.random() * keys.length)];
}
// Random Chord Change generator
function getRandomChordChange() {
    return chordChanges[Math.floor(Math.random() * chordChanges.length)];
}
// Generate Jazz Password
function generateJazzPassword(selectedKey, selectedChordChange) {
    let password = '';
    let notepassword = '';
    const chords = [];
    const chordNotes = [];
    for (let i = 0; i < selectedChordChange.length; i++) {
        const degreeSymbol = selectedChordChange[i]; // degreeSymbol拿到例如 1 b9 2 b3
        const noteIndex = chordDegreeMap[degreeSymbol]; //noteIndex 會拿到 0 1 2 3
        const note = scales[selectedKey][noteIndex]; //note會拿到 "C", "Db", "D", "Eb"
        const chordType = chordTypes[degreeSymbol]; //chordtype 會拿到一串 chord的[]
        const randomChordType = chordType[Math.floor(Math.random() * chordType.length)]; //會拿到一個隨機的 chord
        const chord = note + randomChordType; //在這裡 chord 就會是由 note 與 randomchordtype 組合
        const chordIntervals = chordToNotes[randomChordType]; //當randomChordType為Maj時，會拿到 ["1", "3", "5"] 這一串
        const chordAbcNotes = chordIntervals.map(interval => keyToNoteAbc[note][interval]);
        chordNotes.push(`${chordAbcNotes.join("")}`);
        notepassword += `${chordAbcNotes.join("")}`;
        chords.push(chord); //把 chord 推到陣列chords內
        password += chord; //順便把password 變成用 chord加總，而不是拉chords的資料
    }
    return { password, notepassword, chords, chordNotes };
}
document.addEventListener('DOMContentLoaded', function() {
    // Click trigger for generating Jazz Password
    document.getElementById('generateButton').addEventListener('click', function() {
        let selectedKey = document.getElementById('key').value;
        let chordChangeSelectElement = document.getElementById('chordChangeSelect');
        let selectedChordChangeIndex = chordChangeSelectElement.value;
        let selectedChordChangeText = chordChangeSelectElement.options[chordChangeSelectElement.selectedIndex].text;
        // If random is selected
        if (selectedKey === "random") selectedKey = getRandomKey();
        let selectedChordChange;
        if (selectedChordChangeIndex === "random") {
            selectedChordChange = getRandomChordChange();
            selectedChordChangeText = selectedChordChange.join('-');
        } else {
            selectedChordChange = chordChanges[selectedChordChangeIndex];
        }
        // Generate the Jazz Password
        const { password, notepassword, chords, chordNotes } = generateJazzPassword(selectedKey, selectedChordChange);
        // Display the results
        document.getElementById('jazzNotePassword').innerText = notepassword;
        document.getElementById('jazzPassword').innerText = password;
        document.getElementById('keyOutput').innerText = selectedKey;
        document.getElementById('chordChangeOutput').innerText = selectedChordChangeText;
        document.getElementById('firstChord').innerText = chords[0];
        document.getElementById('secondChord').innerText = chords[1];
        document.getElementById('thirdChord').innerText = chords[2];
        document.getElementById('fourthChord').innerText = chords[3];
        document.getElementById('firstChordNotes').innerText = chordNotes[0];
        document.getElementById('secondChordNotes').innerText = chordNotes[1];
        document.getElementById('thirdChordNotes').innerText = chordNotes[2];
        document.getElementById('fourthChordNotes').innerText = chordNotes[3];
    });
    // Copy Chord password to clipboard
    document.getElementById('copyButton').addEventListener('click', function() {
        const password = document.getElementById('jazzPassword').innerText;
        copyToClipboard(password);
        alert("Chord password copied to clipboard!");
    });
    // Copy Note password
    document.getElementById('copyNoteButton').addEventListener('click', function() {
        const notepassword = document.getElementById('jazzNotePassword').textContent;
        copyToClipboard(notepassword);
        alert('Note password copied to clipboard!');
    });
    // General copy
    function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
});
