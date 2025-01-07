#!/usr/bin/env node
import { Command } from "commander";
import inquirer from "inquirer";
import fs from "fs-extra";
import { parseDocument } from "yaml";
import chalk from "chalk";

const program = new Command();

function createStructure(structure, basePath) {
  if (Array.isArray(structure)) {
    structure.forEach((item) => {
      if (typeof item === "string") {
        const filePath = `${basePath}/${item}`;
        fs.ensureFileSync(filePath);
      } else if (typeof item === "object") {
        for (const folderName in item) {
          const folderPath = `${basePath}/${folderName}`;
          fs.ensureDirSync(folderPath);

          createStructure(item[folderName], folderPath);
        }
      }
    });
  } else if (typeof structure === "object") {
    for (const key in structure) {
      const rootPath = `${basePath}/${key}`;
      fs.ensureDirSync(rootPath);
      createStructure(structure[key], rootPath);
    }
  }
}

program
  .name(chalk.bold.cyan("dirforge"))
  .description(
    chalk.yellow(
      "A CLI tool to create file directory structures from a YAML file.\n" +
        "Add a struct.yml file in the root directory and run " +
        chalk.cyan("'dirforge init'") +
        " to create the entire file structure."
    )
  )
  .version(chalk.green("1.0.0"));

// Init command
program
  .command("init")
  .description(chalk.magenta("Initialize a new file structure"))
  .action(() => {
    const yamlPath = "./struct.yml";

    if (!fs.existsSync(yamlPath)) {
      console.error(
        chalk.red.bold(
          "Error: struct.yml file not found in the current directory."
        )
      );
      process.exit(1);
    }

    console.log(chalk.blue.bold("\nInitializing file structure...\n"));

    inquirer
      .prompt([
        {
          type: "input",
          name: "outputFolder",
          message: chalk.yellow(
            "Where should the output folder be? (default: current directory)"
          ),
          default: "./",
        },
      ])
      .then((answers) => {
        const { outputFolder } = answers;

        fs.ensureDirSync(outputFolder);

        const file = fs.readFileSync(yamlPath, "utf8");
        const doc = parseDocument(file);
        const structure = doc.toJSON();

        createStructure(structure, outputFolder);
      })
      .then(() => {
        console.log(
          chalk.green.bold("\n✔ File structure created successfully!\n")
        );
      })
      .catch((error) => {
        console.error(chalk.red("Error:"), error);
      });
  });

// Parse CLI arguments
program.parse(process.argv);
