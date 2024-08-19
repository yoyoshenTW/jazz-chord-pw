// 12 Key
const scales = {
    C: ["C", "D", "E", "F", "G", "A", "B", "Db", "Eb"],
    F: ["F", "G", "A", "Bb", "C", "D", "E", "Gb", "Ab"],
    Bb: ["Bb", "C", "D", "Eb", "F", "G", "A", "B", "Db"],
    Eb: ["Eb", "F", "G", "Ab", "Bb", "C", "D", "E", "Gb"],
    Ab: ["Ab", "Bb", "C", "Db", "Eb", "F", "G", "A", "B"],
    Db: ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C", "D", "E"],
    Gb: ["Gb", "Ab", "Bb", "B", "Db", "Eb", "F", "G", "A"],
    G: ["G", "A", "B", "C", "D", "E", "F#", "G#", "A#"],
    D: ["D", "E", "F#", "G", "A", "B", "C#", "D#", "A#"],
    A: ["A", "B", "C#", "D", "E", "F#", "G#", "A#", "C"],
    E: ["E", "F#", "G#", "A", "B", "C#", "D#", "F", "G"],
    B: ["B", "C#", "D#", "E", "F#", "G#", "A#", "C", "D"]
};

// chord
const chordTypes = {
    1: ["Maj", "Maj7", "Maj9", "Maj6", "Maj7#11"],
    2: ["min", "min7", "min9", "min7b5b13", "7", "minb5"],
    3: ["min", "min7", "min9", "min7b5b13", "7"],
    4: ["Maj", "Maj7", "Maj9", "Maj6", "Maj7#11"],
    5: ["Maj", "7", "7b9b13"],
    6: ["min", "min7", "min9", "min7b5b13", "7", "minb5"],
    7: ["dim", "dimb7"],
    8: ["SubV7b5", "7b5", "dim7"],
    9: ["SubV7b5", "7b5", "dim7"]
};

// Chord Change
const chordChanges = [
    [1, 6, 2, 5],
    [1, 8, 2, 9],
    [2, 5, 1, 6],
    [2, 8, 1, 6],
    [3, 6, 2, 5],
    [6, 2, 5, 1],
    [4, 7, 3, 6],
    [4, 5, 1, 1]
];

// random keys
function getRandomKey() {
    const keys = Object.keys(scales);
    return keys[Math.floor(Math.random() * keys.length)];
}

// random Chord Change
function getRandomChordChange() {
    return chordChanges[Math.floor(Math.random() * chordChanges.length)];
}

// generate Jazz Password
function generateJazzPassword(selectedKey, selectedChordChange) {
    let password = '';
    const chords = [];

    for (let i = 0; i < selectedChordChange.length; i++) {
        const chordType = chordTypes[selectedChordChange[i]];
        const randomChordType = chordType[Math.floor(Math.random() * chordType.length)];
        const note = scales[selectedKey][selectedChordChange[i] - 1];
        const chord = note + randomChordType;
        chords.push(chord);
        password += chord;
    }

    return { password, chords };
}

// click trigger
document.getElementById('generateButton').addEventListener('click', function() {
    let selectedKey = document.getElementById('key').value;
    let chordChangeSelectElement = document.getElementById('chordChangeSelect');
    let selectedChordChangeIndex = chordChangeSelectElement.value;
    let selectedChordChangeText = chordChangeSelectElement.options[chordChangeSelectElement.selectedIndex].text;

    // ramdom
    if (selectedKey === "random") selectedKey = getRandomKey();
    let selectedChordChange;
    if (selectedChordChangeIndex === "random") {
        selectedChordChange = getRandomChordChange();
        selectedChordChangeText = selectedChordChange.join('-'); // 如果是随机生成的，则根据随机值生成文本
    } else {
        selectedChordChange = chordChanges[selectedChordChangeIndex];
    }

    // jc pw
    const { password, chords } = generateJazzPassword(selectedKey, selectedChordChange);

    // return
    document.getElementById('jazzPassword').innerText = password;
    document.getElementById('keyOutput').innerText = selectedKey;
    document.getElementById('chordChangeOutput').innerText = selectedChordChangeText; // 使用选项的文本内容
    document.getElementById('firstChord').innerText = chords[0];
    document.getElementById('secondChord').innerText = chords[1];
    document.getElementById('thirdChord').innerText = chords[2];
    document.getElementById('fourthChord').innerText = chords[3];
});


// copy
document.getElementById('copyButton').addEventListener('click', function() {
    const password = document.getElementById('jazzPassword').innerText;
    navigator.clipboard.writeText(password).then(() => {
        alert("Password copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy password: ", err);
    });
});
