# streams-nodejs

Use the streams module for a simple text indexing program. **She must:**

- Read a text file passed as arguments to the script
- Separate input data into individual words separated by a delimiter (space, newline)
- Filter non-text characters (e.g. ',')
- Index text into a vector - an array of numbers. The position in the array represents the order of all input words, sorted alphabetically. The value is the number of occurrences of a particular word in the text.
- Output the resulting vector to a file. Examples:
  - a c b b -> potential intermediate representation { a: 1, b: 2, c: 1 } -> [1, 2, 1]
  - ab cb bss b -> [1, 1, 1, 1]
  - ab, cb, bss, cb, b, cb -> [1, 1, 1, 3]
  - alex, alex, juan, dima -> [2, 1, 1]

It is advisable to use threads for all program steps.