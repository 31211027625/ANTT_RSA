function generateSignature() {
    const p = parseInt(document.getElementById("pInput").value);
    const q = parseInt(document.getElementById("qInput").value);
    const plaintext = document.getElementById("messageInput").value;

    const message = plaintext.toUpperCase();

    if (isNaN(p) || isNaN(q) || p <= 1 || q <= 1) {
        alert("Please enter valid prime numbers for p and q.");
        return;
    }

    const n = p * q;
    const phi = (p - 1) * (q - 1);
    const e = 7; // Chọn giá trị của e
    const d = modInverse(e, phi);

    const asciiValues = message.split("").map((char) => char.charCodeAt(0));
    displayAsciiTable(message, asciiValues);

    const encryptedValues = asciiValues.map((value) => modExp(value, d, n));
    displayEncryptedTable(message, encryptedValues);

    const messageAscii = asciiValues.join("");
    const signature = modExp(messageAscii, d, n);
    document.getElementById("result").innerText = `Chữ ký số: ${signature}`;
}

function displayAsciiTable(message, asciiValues) {
    const messageRow = document.getElementById("messageRow");
    const asciiRow = document.getElementById("asciiRow");

    messageRow.innerHTML = "";
    asciiRow.innerHTML = "";

    for (let i = 0; i < message.length; i++) {
        const charCell = document.createElement("td");
        const asciiCell = document.createElement("td");

        charCell.innerText = message[i];
        asciiCell.innerText = asciiValues[i];

        messageRow.appendChild(charCell);
        asciiRow.appendChild(asciiCell);
    }
}

function displayEncryptedTable(message, encryptedValues) {
    const encryptedRow = document.getElementById("encryptedRow");

    encryptedRow.innerHTML = "";

    for (let i = 0; i < message.length; i++) {
        const encryptedCell = document.createElement("td");

        encryptedCell.innerText = encryptedValues[i];

        encryptedRow.appendChild(encryptedCell);
    }
}

function modExp(base, exp, mod) {
    let result = 1;
    base = base % mod;
    while (exp > 0) {
        if (exp % 2 === 1) {
            result = (result * base) % mod;
        }
        exp = Math.floor(exp / 2);
        base = (base * base) % mod;
    }
    return result;
}

function modInverse(a, m) {
    let m0 = m;
    let y = 0,
        x = 1;

    if (m == 1) return 0;
    while (a > 1) {
        let q = Math.floor(a / m);
        let t = m;

        m = a % m;
        a = t;
        t = y;

        y = x - q * y;
        x = t;
    }
    if (x < 0) x += m0;
    console.log(x);
    return x;
}