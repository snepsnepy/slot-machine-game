// Functie IIFE care extrage informatiile din fisierul 'reels.json'
//  si returneaza informatiile din fiecare reel, intr-un obiect. 
// (ex: json0 contine informatiile reel-ului cu id-ul 0)

(function() {
    $.ajax({
        'async': false,
        'global': false,
        'url': "reels.json",
        'dataType': "json",
        'success': function(data) {
            json0 = { id: data.reels[0].reel[Object.keys(data.reels[0].reel)[0]],
                        value: data.reels[0].reel.icons.split(",") }
            json1 = { id: data.reels[1].reel[Object.keys(data.reels[0].reel)[0]],
                        value: data.reels[1].reel.icons.split(",") }
            json2 = { id: data.reels[2].reel[Object.keys(data.reels[0].reel)[0]],
                        value: data.reels[2].reel.icons.split(",") }
            json3 = { id: data.reels[3].reel[Object.keys(data.reels[0].reel)[0]],
                        value: data.reels[3].reel.icons.split(",") }
            json4 = { id: data.reels[4].reel[Object.keys(data.reels[0].reel)[0]],
                        value: data.reels[4].reel.icons.split(",") }
        }
    });
return {
    json0,
    json1,
    json2,
    json3,
    json4
}
})();

// getRandomNumber - returneaza un numar random dintr-un array primit ca parametru
function getRandomNumber(array) {
    const random = Math.floor(Math.random() * array.length)
    return array[random]
}

function getElement(id) {
    return document.getElementById(id);
}

// reelValue 
// Params: 
// 1. first, second, third - Reprezinta elementele fiecarei coloane
// 2. array - Reprezinta array-ul primit ca parametru din care se extrag numerele random folosind functia "getRandomNumber"
// 3. id  - Reprezinta id-ul fiecarui reel.

// How it works:
// 1. Se foloseste functia "getElement" iar rezultatul este stocat in variabilele item1, item2, item3
// 2. Se foloseste functia "getRandomNumber" pentru extragerea unui element random din array, iar rezultatul
// este salvat in variabilele num1, num2, num3
// 3. Se modifica HTML-ul elementelor stocate in variabilele item1,  item2, item3 prin inserarea unei imagini random
// al carei nume corespunde cu numarul ales random, salvat  in num1, num2, num3
// 4. Se returneaza un array de obiecte, unde  "id" este id-ul reel-ului, "value" este valoarea aleasa random, 
// iar "htmlId" este id-ul elementelor returnate de functia "getElement" 
function reelValue(first, second, third, array, id) {
    const item1 = getElement(first);
    const item2 = getElement(second);
    const item3 = getElement(third);

    const num1 = getRandomNumber(array)
    const num2 = getRandomNumber(array)
    const num3 = getRandomNumber(array)

    item1.innerHTML = `<img src="resurse/${num1}.png" alt="">`
    item2.innerHTML = `<img src="resurse/${num2}.png" alt="">`
    item3.innerHTML = `<img src="resurse/${num3}.png" alt="">`

    return [
        {"id": id, "value": num1, "htmlId": item1.id},
        {"id": id, "value": num2, "htmlId": item2.id},
        {"id": id, "value": num3, "htmlId": item3.id}
    ]
}

// fillRandom - apeleaza functia "reelValue" pentru  fiecare reel, iar informatiile date ca 
// parametru sunt extrase din obiectele returnate de IIFE
// Este folosita pentru afisarea random a imaginilor de fiecare data cand se incepe un joc nou
function fillRandom() {
    reelValue('item1', 'item2', 'item3', json0.value, json0.id)
    reelValue('item4', 'item5', 'item6', json1.value, json1.id)
    reelValue('item7', 'item8', 'item9', json2.value, json2.id)
    reelValue('item10', 'item11', 'item12', json3.value, json3.id)
    reelValue('item13', 'item14', 'item15', json4.value, json4.id)
}

fillRandom()


function countFreq(arr, n)
{
    let normalArray = []
    let visited = Array.from({length: n}, (_, i) => false);

    // Traverse through array elements and
    // count frequencies
    for (let i = 0; i < n; i++) {
        // Skip this element if already processed
        if (visited[i] == true)
            continue;

        // Count frequency
        let count = 1;
        for (let j = i + 1; j < n; j++) {
            if (arr[i].value === arr[j].value) {
                visited[j] = true;
                count++;
            }
        }
        if(count >= 3) {
            normalArray.push(arr[i])
        }
    }
    return normalArray
}

// spin - apeleaza functia "reelValue" iar rezultatele sunt salvate in variabilele "reel1 .. reel5", 
// ce reprezinta valorile fiecarui reel

// Se initializeaza array-ul data, unde vor fi merge-uite obiectele salvate in variabilele de mai sus
// In variabila "noDuplicates" vor fi salvate elementele filtrarii ce va elimina valorile duplicate 
// din array-ul "data", in functie de id si de value;
// Se va apela functia "countFreq" care va primi ca parametru array-ul fara duplicate si lungimea acestuia,
// iar dupa aceea se va verifica daca lungimea acestui array va fi mai mare decat 0.
// Se vor compara pe rand valorile gasite in array-ul "arr" cu valorile din array-ul "data", care contine 
// si elementele duplicate, iar daca aceasta conditie este true, atunci va fi activata animatia pentru valorile castigatoare.
function spin() {
    let reel1 = reelValue('item1', 'item2', 'item3', json0.value, json0.id)
    let reel2 = reelValue('item4', 'item5', 'item6', json1.value, json1.id)
    let reel3 = reelValue('item7', 'item8', 'item9', json2.value, json2.id)
    let reel4 = reelValue('item10', 'item11', 'item12', json3.value, json3.id)
    let reel5 = reelValue('item13', 'item14', 'item15', json4.value, json4.id)

    let data = []
    data.push(...reel1, ...reel2, ...reel3, ...reel4, ...reel5)      

    const noDuplicates = data.filter((v, i, a) => a.findIndex(t => (t.id === v.id && t.value === v.value))===i)

    let arrLength = noDuplicates.length;
    let arr = countFreq(noDuplicates, arrLength);
    console.log("AR: ", arr)

    if(arr.length > 0) {
        gsap.to(".slot-number", { opacity: "50%" })
        defaultArrayYPosition()
        data.forEach(function (e) {
            arr.forEach(function (a) {
                if(a.value == e.value) {
                    gsap.to("#" + e.htmlId, { y: 7, repeat: 5, opacity: "100%", yoyo: true, onComplete: defaultItemsOpacity })   
                }
            })
        })
    } else {
        defaultItemsOpacity()
        defaultArrayYPosition()
    }
}

function Tween() {
    TweenMax.fromTo(['.reel1', '.reel2', '.reel3', '.reel4', '.reel5'], 0.3, {
        y: -270,
        repeat: 5
    } , {
        y: 380,
        repeat: 5,
        onComplete: spin  
    })
}

function defaultArrayYPosition() {
    gsap.to(['.reel1', '.reel2', '.reel3', '.reel4', '.reel5'], 0.01, { y: 0})
}

function defaultItemsOpacity() {
    gsap.to(".slot-number", { opacity: "100%" })
}