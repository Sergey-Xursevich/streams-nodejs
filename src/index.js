const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

// Функция для фильтрации не-текстовых символов
function filterNonTextSymbols(word) {
    return word.replace(/[^a-zA-Zа-яА-Я]/g, '');
}

// Функция для индексации текста в вектор
function indexText(text) {
    const wordCount = {};
    const words = text.split(/\s+/);

    words.forEach((word) => {
        const filteredWord = filterNonTextSymbols(word.toLowerCase());
        if (filteredWord) {
            wordCount[filteredWord] = (wordCount[filteredWord] || 0) + 1;
        }
    });

    const sortedWords = Object.keys(wordCount).sort();

    return sortedWords.map((word) => wordCount[word]);
}

// Функция для чтения файла и создания потока
function createReadStream(filePath) {
    const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

    return readline.createInterface({
        input: readStream,
        output: new stream.PassThrough(),
    });
}

// Функция для записи в файл
function writeToFile(vector, outputPath) {
    const writeStream = fs.createWriteStream(outputPath, { encoding: 'utf8' });
    writeStream.write(JSON.stringify(vector));
    writeStream.end();
}

// Главная функция
function processTextFile() {
    // Пример использования
    const inputFilePath = process.argv[2];
    const outputFilePath = process.argv[3];

    if (!inputFilePath || !outputFilePath) {
        console.error('Usage: node index.js <inputFilePath> <outputFilePath>');
        process.exit(1);
    }

    const readStream = createReadStream(inputFilePath);
    let inputText = '';

    readStream.on('line', (line) => {
        inputText += line + ' ';
    });

    readStream.on('close', () => {
        const vector = indexText(inputText);
        writeToFile(vector, outputFilePath);
    });
}

processTextFile();
