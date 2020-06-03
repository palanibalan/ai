/* -------------- Initialize variables -------------- */
var src = document.getElementById("x");
var zhoraiTextColour = "#000000";
var infoLabel;
var recordButton;
var zhoraiSpeechBox;
var loadingGif;
var currBtnIsMic = true;

// Sentences for mindmap creation
var AfricaSentences = 'Africa is the world \' s second-largest continent on earth.'+
'Africa is the world’s second-most populous continent. '+
'Africa is the source of worlds longest Nile river. '+ 
'Africa has the worlds largest sahara desert. '+
'Africa  is the world \' s hottest continent. '+
'Africa is covered with deserts and drylands. '+
'Africa has 54 countries. '+
'Africa is the world largest Animal kingdom. ';

var AsiaSentences = 'Asia is largest Continent on Earth. '+
'Asia is Earth’s most populous Continent. '+
'Asia is bounded on the east by the Pacific Ocean, on the south by the Indian Ocean, and on the north by the Arctic Ocean.'+
'Asia has extremely diverse climates and geographic features. '+
'Asia is made up of 48 countries, as well as 6 non-UN states, and 6 dependent territories. '+
'Asia has Earth’s highest point Mount Everest. '+
'The longest river in Asia is the Yangtze in China. ';

var EuropeSentences = 'European continent is located in the northern hemisphere.'+
'Europe has 50 countries.'+
'The Volga River in Russia is Europe\' s longest river. '+
'Europe consist of 10% of the world \' s population. '+
'Europe’s five most spoken native languages are Russian, German, French English, Turkish and Italian. '+
'Europe has the world’s Richest economy.';

var NorthAmericaSentences = 'North America consist of 23 countries. '+
'North America’s main language is English, Spanish and French. '+
'North America is the third largest continent in the world. '+
'North America has 965 species of Mammal. '+
'North America has hosted the Olympics 12 times.'+
'North America has the largest fresh water superior lake in the world. '+
'Mount Mckinley is the highest mountain in North America. '+
'North America is named after an Italian Explorer.';

var SouthAmericaSentences = 'South America consist of 12 countries. '+
'Amazon Rainforest is located in South America. '+
'South America has the World largest Angel falls. '+
'South America’s main religion is Christianity. '+
'Amazon river is the Longest river in South America. ';


var AustraliaSentences = 'Australia is a located in the southern hemisphere of Earth.'+
'Australia is the sixth largest country in the world. '+
'Australia is country divide into six states. '+
'The highest mountain of Australia is Mount Kosciuszko. '+
'Australia is the world’s largest exporter of coal. '+
'Australia is both the country as wells as continent. '+
'Australia is the home of 21 venomous snakes in the world. '+
'Australia is rich in World largest Great Barrier Reef’s system. '+
'Australia is also known as island continent.';

var AntarcticaSentences = 'Antarctica is the southernmost continent on Earth. '+
'The South Pole is found in Antarctica. '+
'Antarctica is surrounded by the Southern Ocean. '+
'Antarctica include penguins and seals. '+
'Antarctica consist 90% of the ice on Earth.'+
'Antarctica is also known as Ice desest. '+
'Antarctica has 12 countries.';
/* -------------- Initialize functions -------------- */

function ReplacingImagehi(){
    document.getElementById("x").src="img/phirohigif.gif";
}

function ReplacingImagehandmouth(){
    document.getElementById("x").src="img/phirohandmouthgif.gif";
}

function ReplacingImagemouth(){
    document.getElementById("x").src="img/phiromouthgif.gif";
}

function ReplacingImage(){
    document.getElementById("x").src="img/phiro.png";
}


function showPurpleText(text) {
    zhoraiSpeechBox.innerHTML = '<p style="color:' + zhoraiTextColour + '">' + text + '</p>';
}

/**
 * Replaces "Zhorai" with "Zor-eye":
 * @param {*} text
 */
function makePhonetic(text) {
    text = text.replace(/Zhorai/gi, 'Zor-eye');
    text = text.replace(/Zorai/gi, 'Zor-eye');
    text = text.replace(/Zohrai/gi, 'Zor-eye');
    text = text.replace(/Zoreye/gi, 'Zor-eye');
    return text;
}

/**
 * Returns list of english voices:
 */
function getEnglishVoices() {
    englishVoices = [];
    speechSynthesis.getVoices().forEach(function (voice) {
        if (voice.lang.includes("en")) {
            englishVoices.push(voice);
        }
    });
    return englishVoices;
}

/**
 * Switches the button to the specified button (either 'micBtn' or 'speakBtn')
 * @param {*} toButton
 */
function switchButtonTo(toButton) {
    if (toButton == 'micBtn') {
        recordButton.hidden = false;
        loadingGif.hidden = true;
        textFileBtn.hidden = true;
        currBtnIsMic = true;
    } else if (toButton == 'speakBtn') {
        recordButton.hidden = true;
        loadingGif.hidden = true;
        textFileBtn.hidden = true;
        currBtnIsMic = false;
    } else if (toButton == 'loading') {
        loadingGif.hidden = false;
        recordButton.hidden = true;
        textFileBtn.hidden = true;
        currBtnIsMic = false;
    } else if (toButton == 'textFileBtn') {
        textFileBtn.hidden = false;
        loadingGif.hidden = true;
        recordButton.hidden = true;
        currBtnIsMic = false;
    } else if (toButton == 'micAndTextFileBtn') {
        textFileBtn.hidden = false;
        recordButton.hidden = false;
        loadingGif.hidden = true;
        currBtnIsMic = true;
    } else if (!toButton) {
        console.log('No button specified. Not switching button.');
    } else {
        console.error('Unknown button: ' + toButton + '. Did not switch button.');
    }
}

function afterRecording(recordedText) {
    var saidKnownEco = false;
    var ecoSentences = '';
    var zhoraiSpeech = '';
    var phrases = [];

    // test to see if what they said has an ecosystem in it... e.g., "I didn't quite catch that"
    var knownEcosystems = ['Africa', 'Asia', 'Europe', 'North America', 'South America','Australia','Antarctica'];
    var knownRegex = new RegExp(knownEcosystems.join("|"), "i");
    saidKnownEco = knownRegex.test(recordedText);

    // check if there was a known ecosystem stated
    if (saidKnownEco) {
        // get the particular ecosystem stated:
        var eco = '';
        if (recordedText.toLowerCase().includes('asia')) {
            eco = 'Asia';
            ecoSentences = AsiaSentences;
        } else if (recordedText.toLowerCase().includes('africa')) {
            eco = 'Africa';
            ecoSentences = AfricaSentences;
        } else if (recordedText.toLowerCase().includes('europe')) {
            eco = 'Europe';
            ecoSentences = EuropeSentences;
        } else if (recordedText.toLowerCase().includes('north america')) {
            eco = 'North America';
            ecoSentences = NorthAmericaSentences;
        } else if (recordedText.toLowerCase().includes('south america')) {
            eco = 'South America';
            ecoSentences = SouthAmericaSentences;
        } else if (recordedText.toLowerCase().includes('australia')) {
            eco = 'Australia';
            ecoSentences = AustraliaSentences;
        } else if (recordedText.toLowerCase().includes('antarctica')) {
            eco = 'Antarctica';
            ecoSentences = AntarcticaSentences;   
        } else {
            console.error("A known ecosystem was stated, but was not found in the " +
                "text... I'm very confused.");
        }

        // say, "I've heard about that ecosystem! Here's what I know about it:"
        phrases = ["I've heard about " + eco + " before! Here's what I know about them.",
            "Oh yes, " + eco + " are very interesting. Here's what I know.",
            "Here's what I know about " + eco + ". They're fascinating!"
        ];
		ReplacingImagehandmouth();
    } else {
        // check if there was an *unknown* ecosystem stated... e.g., "I don't know about that ecosystem yet"
        var saidUnknownEco = false;
        var unknownEcosystems = ['forest', 'taiga', 'wetland', 'freshwater', 'coral reef', 'savanna', 'mountain', 'plain'];
        var unknownRegex = new RegExp(unknownEcosystems.join("|"), "i");
        saidUnknownEco = unknownRegex.test(recordedText);

        if (saidUnknownEco) {
            phrases = ["Hmmm, I haven't heard about that ecosystem before, but I know about " + chooseRandomPhrase(knownEcosystems) + "s.",
                "I don't know about that ecosystem yet, but I've heard about " + chooseRandomPhrase(knownEcosystems) + "s."
            ];
			ReplacingImagemouth();
        } else {
            phrases = ["Sorry, what was that?", "Oh, pardon?", "I didn't quite understand that. Pardon?"];
			ReplacingImagehandmouth();
        }
    }

    zhoraiSpeech = chooseRandomPhrase(phrases);
    showPurpleText(zhoraiSpeech);

    if (saidKnownEco) {
        speakText(zhoraiSpeech, null, null);

        // delete the current mindmap to prepare for the next
        deleteMindmap();

        // hide the sentences about particular ecosystems to prep for the next
        hideAllSentences();

        // send the sentences for the particular ecosystem for the server to parse:
        parseText(ecoSentences, 'Mindmap', 'parsing' + '_mod1');
        // when done parsing, the mind map will be created in mod1ReceiveData

    } else {
        speakText(zhoraiSpeech, null,
            function () {
                switchButtonTo('micBtn');
            });
    }
}

function hideAllSentences() {
    document.getElementById("AsiaSentences").hidden = true;
    document.getElementById("AfricaSentences").hidden = true;
    document.getElementById("EuropeSentences").hidden = true;
    document.getElementById("NorthAmericaSentences").hidden = true;
    document.getElementById("SouthAmericaSentences").hidden = true;
    document.getElementById("AustraliaSentences").hidden = true;
    document.getElementById("AntarcticaSentences").hidden = true;
}

function mod1ReceiveData(filedata) {
    // We're done parsing the mindmap info!
    // create the mindmap!
    console.log('Creating mindmap! filedata:');
    filedata = filedata.replace(/'/g, '"');
    filedata = JSON.parse(filedata);
    console.log(filedata);
    switchButtonTo('micBtn');
    createMindmap(filedata);

    // show the sentences about that particular ecosystem 
    // (NOTE THAT THESE SENTENCES ARE HARDCODED INTO THE HTML! (eventually: read from file))
    if (filedata.nodes[0].id.toLowerCase() == "asia") {
        document.getElementById("AsiaSentences").hidden = false;
    } else if (filedata.nodes[0].id.toLowerCase() == "africa") {
        document.getElementById("AfricaSentences").hidden = false;
    } else if (filedata.nodes[0].id.toLowerCase() == "north america") {
        document.getElementById("NorthAmericaSentences").hidden = false;
    } else if (filedata.nodes[0].id.toLowerCase() == "south america") {
        document.getElementById("SouthAmericaSentences").hidden = false;
    } else if (filedata.nodes[0].id.toLowerCase() == "australia") {
        document.getElementById("AustraliaSentences").hidden = false;
    } else if (filedata.nodes[0].id.toLowerCase() == "europe"){
        document.getElementById("EuropeSentences").hidden = false;
    } else if (filedata.nodes[0].id.toLowerCase() == "antarctica"){
        document.getElementById("AntarcticaSentences").hidden = false;
    } else {
        console.error("Unknown ecosystem for showing sentences.");
    }

}

/* -------------- Once the page has loaded -------------- */
document.addEventListener('DOMContentLoaded', function () {
    // Initialize variables:
    currStage = 0;
    infoLabel = document.getElementById('z_info_label');
    recordButton = document.getElementById('record_button');
    zhoraiSpeechBox = document.getElementById('final_span');
    loadingGif = document.getElementById('loadingGif');
    textFileBtn = document.getElementById('textFileBtn');

    // Restart speech synthesizer:
    // (see https://stackoverflow.com/a/58775876/8162699)
    window.speechSynthesis.cancel();

    // Add click handlers
    setUpRecordingHandlers(recordButton, function () {
        recordButtonClick({
            callback: afterRecording,
            onClickStop: switchButtonTo,
            onClickStopParam: 'loading'
        });
    });
});