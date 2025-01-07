## Dirforge

Dirforge is a simple, lightweight, and easy-to-use Javascript package used for creating file structures. It is designed to be used in Node.js applications. It offers simple and intuitive methods for creating directories and files.

## Installation

To install Dirforge, you can use npm. Run the following command:

```bash
npm install dirforge
```

## Usage

To use dirforge, you need to run the following code:

```bash

dirforge init

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

From now onwards , JSON struct is also supported for struct.json files , similar to yml it now can work on either of 
struct.json or struct.yaml file at root . Here's an example of struct.json file:

```json
{
  "project": [
    {
      "folder1": [
        "file1.txt",
        "file2.txt"
      ]
    },
    {
      "folder2": [
        "file3.txt",
        {
          "folder3": [
            "file5.txt"
          ]
        }
      ]
    },
    {
      "folder4": [
        "file3.txt",
        {
          "folder5": [
            "hello.cpp"
          ]
        }
      ]
    },
    "file4.txt"
  ]
}
```




It by default creates the files at root directory of the project. If you want to create the files at a specific directory, you can specify the path in the innit command.

Currently only one command is supported. More commands will be added in the future.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Contributing

To contribute to dirforge open a pull request. Make sure to write all the neccssary comments for the code you write. And also make sure to test the code locally before opening a pull request.
