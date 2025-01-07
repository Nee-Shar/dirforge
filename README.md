## Structron

Structron is a simple, lightweight, and easy-to-use Javascript package used for creating file structures. It is designed to be used in Node.js applications. It offers simple and intuitive methods for creating directories and files.

## Installation

To install Structron, you can use npm. Run the following command:

```bash
npm install structron
```

## Usage

To use Structron, you need to run the following code:

```bash

structron init

```

Now it expects a struct.yml file in the root directory of your project. The struct.yml file should contain the structure of the directories and files you want to create. Here is an example of a struct.yml file:

```yml
project:
  - folder1:
      - file1.txt
      - file2.txt
  - folder2:
      - file3.txt
      - folder3:
          - file5.txt
  - folder4:
      - file3.txt
      - folder5:
          - hello.cpp
  - file4.txt
```

It by default creates the files at root directory of the project. If you want to create the files at a specific directory, you can specify the path in the innit command.

Currently only one command is supported. More commands will be added in the future.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Contributing

To contribute to Structron open a pull request. Make sure to write all the neccssary comments for the code you write. And also make sure to test the code locally before opening a pull request.
